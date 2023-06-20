import os
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_restx import Api, Resource, fields
from werkzeug.middleware.proxy_fix import ProxyFix
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text


# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# Obtém os valores das variáveis de ambiente
db_host = os.getenv('DB_HOST')
db_port = os.getenv('DB_PORT')
db_name = os.getenv('MYSQL_DATABASE')
db_user = os.getenv('MYSQL_USER')
db_password = os.getenv('MYSQL_PASSWORD')

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}'
db = SQLAlchemy(app)

# Cria o objeto api do Flask-RESTX e associa ao objeto app do Flask
api = Api(app)

# Define o modelo para a tabela Listas
listas_model = api.model('ListasModel', {
    'id': fields.Integer,
    'data_Hora': fields.DateTime(dt_format='iso8601'),
    'numero': fields.String,
    'modalidade': fields.String,
    'criado': fields.DateTime(dt_format='iso8601'),
    'atualizado': fields.DateTime(dt_format='iso8601'),
})

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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)