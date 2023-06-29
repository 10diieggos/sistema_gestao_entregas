from flask import request
from flask_restx import Resource
from sqlalchemy import text, exists
from src.server.instance import server
from src.database.sge import db
from src.models.flask_restx_models import listas_flask_restx_model
from src.models.Listas_sqlalchemy_model import Listas_sqlalchemy_model
import json
from datetime import datetime

app, api = server.app, server.api

def datetime_handler(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f'Object of type {obj.__class__.__name__} is not JSON serializable')

@api.route('/insere_lista')
class InsereLista(Resource):
    @api.expect(listas_flask_restx_model)
    def post(self):
        input_data = request.get_json()['data']
        rows = input_data.split('\n')
        data = []
        registros_inseridos = []
        registros_duplicados = []
        for row in rows:
            if row:
                values = row.split('\t')
                numero = values[1]
                if db.session.query(exists().where(Listas_sqlalchemy_model.numero == numero)).scalar():
                    registros_duplicados.append(numero)
                    continue
                registros_inseridos.append(numero)
                data.append({
                    'data_hora_lancamento': values[0],
                    'numero': values[1],
                    'modalidade': values[2]
                })
        db.session.bulk_insert_mappings(Listas_sqlalchemy_model, data)
        db.session.commit()

        # Consulta os registros no banco de dados onde a numero está presente na lista registros_inseridos
        registros_inseridos = db.session.query(Listas_sqlalchemy_model).filter(Listas_sqlalchemy_model.numero.in_(registros_inseridos)).all()
        registros_duplicados = db.session.query(Listas_sqlalchemy_model).filter(Listas_sqlalchemy_model.numero.in_(registros_duplicados)).all()
        registros_inseridos = [registro.to_dict() for registro in registros_inseridos]
        registros_duplicados = [registro.to_dict() for registro in registros_duplicados]
        
        return json.dumps({'registros_inseridos': registros_inseridos, 'registros_duplicados': registros_duplicados}, default=datetime_handler)