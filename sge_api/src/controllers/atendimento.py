from flask_restx import Resource
from sqlalchemy import text

from src.server.instance import server
from src.models.atendimento import atendimento_model
from src.database.sge import db

app, api = server.app, server.api



# Define a rota '/listas' e aplica o modelo aos dados retornados pela função
@api.route('/atendimento')
class Atendimento(Resource):
    @api.marshal_with(atendimento_model, envelope='data')
    def get(self):
        # Cria uma conexão com o banco de dados
        conn = db.engine.connect()

        # Executa uma consulta SQL na tabela Listas
        query = text('SELECT * FROM ATENDIMENTO')
        result = conn.execute(query)

        # Converte o resultado em uma lista de dicionários
        atendimentos = []
        for row in result:
            atendimento = {
                'id_objeto': row.id_objeto,
                'codigo': row.codigo,
                'ordem': row.ordem,
                'lista': row.lista,
                'posicao_objeto': row.posicao_objeto,
                'destinatario': row.destinatario,
                'endereco': row.endereco,
                'num_endereco': row.num_endereco,
                'data_hora': row.data_hora.isoformat(),
                'local': row.local,
                'situacao': row.situacao,
            }
            atendimentos.append(atendimento)

        # Fecha a conexão com o banco de dados
        conn.close()

        return atendimentos