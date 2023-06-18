# local deste arquivo: backend/app.py
import os
from dotenv import load_dotenv
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

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

# Exemplo simples de rota
class Objeto(db.Model):
    __tablename__ = 'Objetos'

    id = db.Column(db.Integer, primary_key=True)
    codigo = db.Column(db.String(13), unique=True, nullable=False)
    ordem = db.Column(db.Integer)
    destinatario = db.Column(db.String(100), nullable=False)
    endereco = db.Column(db.String(100))
    num_endereco = db.Column(db.Integer)
    distribuicao = db.Column(db.Enum('E', 'I'), default='I')
    duplicado = db.Column(db.Boolean, default=False)
    id_servico = db.Column(db.Integer, db.ForeignKey('Servicos.id'))
    disponivel = db.Column(db.Boolean)
    pendencia_baixa = db.Column(db.Boolean)
    tentativas_restantes = db.Column(db.Integer)

    def __repr__(self):
        return f'<Objeto {self.codigo}>'

@app.route('/')
def home():
    return 'Olá, mundo! Esta é a página inicial do meu aplicativo Flask.'

@app.route('/objetos')
def objetos():
    objetos = Objeto.query.all()
    return render_template('objetos.html', objetos=objetos)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)