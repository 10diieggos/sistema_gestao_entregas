import os
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy

from src.server.instance import server

load_dotenv()

db_host = os.getenv('DB_HOST')
db_port = os.getenv('DB_PORT')
db_name = os.getenv('MYSQL_DATABASE')
db_user = os.getenv('MYSQL_USER')
db_password = os.getenv('MYSQL_PASSWORD')

app = server.app
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}'
db = SQLAlchemy(app)