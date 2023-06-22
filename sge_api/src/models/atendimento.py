from flask_restx import fields, Model

atendimento_model = Model('Atendimentos', {
    'id_objeto': fields.Integer(description='Id do objeto na tabela mysql objetos'),
    'codigo': fields.String(description='Codigo do rastreamento'),
    'ordem': fields.Integer(description='Ordem'),
    'lista': fields.String(description='Numero da LDI ou LOEC'),
    'posicao_objeto': fields.Integer(description='Posição do objeto na LDI ou Loec'),
    'destinatario': fields.String(description='Destinatario'),
    'endereco': fields.String(description='Endereco'),
    'num_endereco': fields.Integer(description='Numero do endereco'),
    'data_hora': fields.DateTime(description='Data Hora do ultimo evento do rastreamento'),
    'local': fields.String(description='Unidade que lançou o último evento'),
    'situacao': fields.String(description='Situação do rastreamento no último evento'),
})
