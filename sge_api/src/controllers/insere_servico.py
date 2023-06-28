from flask import request
from flask_restx import Resource
from flask_restx import fields
from sqlalchemy import text, exists
from src.server.instance import server
from src.database.sge import db
from src.models.flask_restx_models import servicos_flask_restx_model
from src.models.Servicos_sqlalchemy_model import Servicos_sqlalchemy_model
import json
from datetime import datetime

app, api = server.app, server.api

def datetime_handler(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f'Object of type {obj.__class__.__name__} is not JSON serializable')

@api.route('/insere_servico')
class InsereServico(Resource):
    @api.expect(servicos_flask_restx_model)
    def post(self):
        input_data = request.get_json()['data']
        rows = input_data.split('\n')
        print(input_data)
        data = []
        registros_inseridos = []
        for row in rows:
            if row:
                values = row.split('\t')
                sigla = values[3]
                if db.session.query(exists().where(Servicos_sqlalchemy_model.sigla == sigla)).scalar():
                    continue
                registros_inseridos.append(sigla)
                data.append({
                    'prazo_guarda_interna': int(values[0]),
                    'admite_residuo': bool(int(values[1])),
                    'tentativas_externas_previstas': int(values[2]),
                    'sigla': sigla,
                    'descricao': values[4],
                    'categoria': values[5],
                    'familia': values[6],
                    'gera_pre_alerta': bool(int(values[7])),
                    'hora_real_entrega': bool(int(values[8])),
                    'dados_do_recebedor_na_baixa': values[9],
                    'entrega_externa': bool(int(values[10])),
                    'entrega_com_imagem': bool(int(values[11])),
                })
        db.session.bulk_insert_mappings(Servicos_sqlalchemy_model, data)
        db.session.commit()

        # Consulta os registros onde a sigla está presente na lista registros_inseridos
        registros = Servicos_sqlalchemy_model.query.filter(Servicos_sqlalchemy_model.sigla.in_(registros_inseridos)).all()
        # Retorna os registros para o frontend em formato JSON
        return json.dumps({'registros': [r.to_dict() for r in registros]}, default=datetime_handler)