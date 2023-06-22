from flask_restx import fields, Model

devolucao_model = Model('Devolucoes', {
    'id_objeto': fields.Integer(required=True, description='Id do objeto na tabela mysql objetos'),
    'codigo': fields.String(required=True, description='Codigo do rastreamento', min_length=13, max_length=13),
    'ordem': fields.Integer(description='Ordem'),
    'destinatario': fields.String(required=True, description='Destinatario', max_length=100),
    'endereco': fields.String(description='Endereco', max_length=100),
    'num_endereco': fields.Integer(description='Numero do endereco'),
    'data': fields.DateTime(description='Data Hora do ultimo evento do rastreamento'),
    'local': fields.String(description='Unidade que lançou o último evento', max_length=100),
    'situacao': fields.String(description='Situação do rastreamento', max_length=100),
    'prazo_devolucao': fields.DateTime(description='Data para a devolução do objeto aguardando retirada')
})
