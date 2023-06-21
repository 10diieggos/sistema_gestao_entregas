from flask_restx import Resource
from sqlalchemy import text

from src.server.instance import server
from src.models.listas import listas_model
from src.database.sge import db

app, api = server.app, server.api



# Define a rota '/listas' e aplica o modelo aos dados retornados pela função
@api.route('/listas')
class ListasResource(Resource):
    @api.marshal_with(listas_model, envelope='data')
    def get(self):
        # Cria uma conexão com o banco de dados
        conn = db.engine.connect()

        # Executa uma consulta SQL na tabela Listas
        query = text('SELECT * FROM listas')
        result = conn.execute(query)

        # Converte o resultado em uma lista de dicionários
        listas = []
        for row in result:
            lista = {
                'id': row.id,
                'data_Hora': row.data_Hora.isoformat(),
                'numero': row.numero,
                'modalidade': row.modalidade,
                'criado': row.criado.isoformat(),
                'atualizado': row.atualizado.isoformat(),
            }
            listas.append(lista)

        # Fecha a conexão com o banco de dados
        conn.close()

        return listas