from flask_restx import Resource
from sqlalchemy import text

from src.server.instance import server
from src.models.devolucao import devolucao_model
from src.database.sge import db

app, api = server.app, server.api



# Define a rota '/listas' e aplica o modelo aos dados retornados pela função
@api.route('/devolucao')
class Devolucao(Resource):
    @api.marshal_with(devolucao_model, envelope='data')
    def get(self):
        # Cria uma conexão com o banco de dados
        conn = db.engine.connect()

        # Executa uma consulta SQL na tabela Listas
        query = text('SELECT * FROM DEVOLUCAO')
        result = conn.execute(query)

        # Converte o resultado em uma lista de dicionários
        devolucoes = []
        for row in result:
            devolucao = {
                'id_objeto': row.id_objeto,
                'codigo': row.codigo,
                'ordem': row.ordem,
                'destinatario': row.destinatario,
                'endereco': row.endereco,
                'num_endereco': row.num_endereco,
                'data': row.data.isoformat(),
                'local': row.local,
                'situacao': row.situacao,
                'prazo_devolucao': row.prazo_devolucao.isoformat(),
            }
            devolucoes.append(devolucao)

        # Fecha a conexão com o banco de dados
        conn.close()

        return devolucoes