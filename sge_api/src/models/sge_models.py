from flask_restx import fields
from src.server.instance import server

servicos_model = server.api.model('ServicosModel', {
    'id': fields.Integer,
    'prazo_guarda_interna': fields.Integer,
    'admite_residuo': fields.Boolean,
    'tentativas_externas_previstas': fields.Integer,
    'sigla': fields.String,
    'descricao': fields.String,
    'categoria': fields.String,
    'familia': fields.String,
    'gera_pre_alerta': fields.Boolean,
    'hora_real_entrega': fields.Boolean,
    'dados_do_recebedor_na_baixa': fields.String,
    'entrega_externa': fields.Boolean,
    'entrega_com_imagem': fields.Boolean,
    'criado': fields.DateTime(dt_format='iso8601'),
    'atualizado': fields.DateTime(dt_format='iso8601'),
})

objetos_model = server.api.model('ObjetosModel', {
    'id': fields.Integer,
    'codigo': fields.String,
    'ordem': fields.Integer,
    'destinatario': fields.String,
    'endereco': fields.String,
    'num_endereco': fields.Integer,
    'distribuicao': fields.String,
    'duplicado': fields.Boolean,
    'id_servico': fields.Integer,
    'disponivel': fields.Boolean,
    'finalizado': fields.Boolean,
    'pendencia_baixa': fields.Boolean,
    'tentativas_restantes': fields.Integer,
    'data_hora_real_entrega': fields.DateTime(dt_format='iso8601'),
    'criado': fields.DateTime(dt_format='iso8601'),
    'atualizado': fields.DateTime(dt_format='iso8601'),
})

listas_model = server.api.model('ListasModel', {
    'id': fields.Integer,
    'data_Hora': fields.DateTime(dt_format='iso8601'),
    'numero': fields.String,
    'modalidade': fields.String,
    'criado': fields.DateTime(dt_format='iso8601'),
    'atualizado': fields.DateTime(dt_format='iso8601'),
})

objetos_listas_model = server.api.model('ObjetosListasModel', {
    'id_objeto': fields.Integer,
    'id_lista': fields.Integer,
    'posicao_objeto': fields.Integer
})

recebedores_model = server.api.model('RecebedoresModel', {
    'id': fields.Integer,
    'cpf': fields.String,
    'nome': fields.String,
    'criado': fields.DateTime(dt_format='iso8601'),
    'atualizado': fields.DateTime(dt_format='iso8601')
})

objetos_recebedores_model = server.api.model('ObjetosRecebedoresModel', {
    'id_objeto': fields.Integer,
    'id_recebedor': fields.Integer,
    'formal': fields.Boolean
})

contatos_model = server.api.model('ContatosModel', {
    'id': fields.Integer,
    'telefone': fields.String
})

objetos_contatos_model = server.api.model('ObjetosContatosModel', {
    'id_objeto': fields.Integer,
    'id_contato': fields.Integer
})

eventos_model = server.api.model('EventosModel', {
    'id_objeto' :fields.Integer,
    'data_hora' :fields.DateTime(dt_format='iso8601'),
    'local' :fields.String,
    'situacao' :fields.String,
    'mensagem' :fields.String
})

simples_model = server.api.model('SimplesModel', {
    'id_objeto': fields.Integer,
    'codigo': fields.String,
    'ordem': fields.Integer,
    'lista': fields.Integer,
    'posicao_objeto': fields.Integer,
    'destinatario': fields.String,
    'endereco': fields.String,
    'num_endereco': fields.Integer,
    'disponivel': fields.Boolean,
    'data_hora': fields.DateTime(dt_format='iso8601'),
    'local': fields.String,
    'situacao': fields.String,
    'atualizado': fields.DateTime(dt_format='iso8601')
})