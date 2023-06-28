from flask import request
from flask_restx import Resource
from flask_restx import fields
from sqlalchemy import text, exists
from src.server.instance import server
from src.database.sge import db
from src.models.flask_restx_models import objetos_flask_restx_model
from src.models.Servicos_sqlalchemy_model import Servicos_sqlalchemy_model
from src.models.Objetos_sqlalchemy_model import Objetos_sqlalchemy_model
import json
from datetime import datetime

app, api = server.app, server.api

def datetime_handler(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f'Object of type {obj.__class__.__name__} is not JSON serializable')

@api.route('/insere_objeto')
class InsereObjeto(Resource):
    @api.expect(objetos_flask_restx_model)
    def post(self):
        input_data = request.get_json()['data']
        rows = input_data.split('\n')
        data = []
        registros_inseridos = []
        for row in rows:
            if row:
                values = row.split('\t')
                codigo = values[0]
                if db.session.query(exists().where(Objetos_sqlalchemy_model.codigo == codigo)).scalar():
                    continue
                registros_inseridos.append(codigo)
                distribuicao = values[5].strip()
                sigla = codigo[:2]
                id_servico = db.session.query(Servicos_sqlalchemy_model.id).filter(Servicos_sqlalchemy_model.sigla == sigla).scalar()
                if distribuicao == 'I':
                    tentativas_restantes = 0
                else:
                    tentativas_restantes = db.session.query(Servicos_sqlalchemy_model.tentativas_externas_previstas).filter(Servicos_sqlalchemy_model.sigla == sigla).scalar()
                data.append({
                    'codigo': codigo,
                    'ordem': int(values[1]),
                    'destinatario': values[2],
                    'endereco': values[3],
                    'num_endereco': int(values[4]),
                    'distribuicao': distribuicao,
                    'id_servico': id_servico,
                    'disponivel': 1,
                    'tentativas_restantes': tentativas_restantes
                })
        db.session.bulk_insert_mappings(Objetos_sqlalchemy_model, data)
        db.session.commit()

        # Consulta os registros no banco de dados onde a codigo está presente na lista registros_inseridos
        registros = db.session.query(Objetos_sqlalchemy_model).filter(Objetos_sqlalchemy_model.codigo.in_(registros_inseridos)).all()
        registros = [registro.to_dict() for registro in registros]
        
        return json.dumps({'registros': registros}, default=datetime_handler)