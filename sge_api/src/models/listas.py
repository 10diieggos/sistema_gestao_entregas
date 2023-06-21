from flask_restx import fields

from src.server.instance import server

listas_model = server.api.model('ListasModel', {
    'id': fields.Integer,
    'data_Hora': fields.DateTime(dt_format='iso8601'),
    'numero': fields.String,
    'modalidade': fields.String,
    'criado': fields.DateTime(dt_format='iso8601'),
    'atualizado': fields.DateTime(dt_format='iso8601'),
})