import os
from dotenv import load_dotenv
from flask import Flask
from flask_restx import Api
from flask_cors import CORS

load_dotenv()

class Server():
    def __init__(self,):
        self.app = Flask(__name__)
        CORS(self.app)
        self.api = Api(
            self.app,
            version='1.0',
            title='API SGE',
            description='Sistema de Gestao de Entregas - API',
        )
        

    def run(self,host, port, debug):
        self.app.run(host, port, debug)


server = Server()
