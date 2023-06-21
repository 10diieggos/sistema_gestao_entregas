from flask_restx import fields, Model

atendimento_model = Model('Atendimento', {
    'id_objeto': fields.Integer(required=True),
    'codigo': fields.String(required=True),
    'ordem': fields.Integer,
    'lista': fields.String,
    'pos': fields.Integer,
    'dest': fields.String(required=True),
    'end': fields.String,
    'num': fields.Integer,
    'hora': fields.DateTime(required=True),
    'local': fields.String,
    'situacao': fields.String
})
