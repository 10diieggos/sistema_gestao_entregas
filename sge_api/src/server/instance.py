from flask import Flask
from flask_restx import Api

class Server():
    def __init__(self,):
        self.app = Flask(__name__)
        self.api = Api(
            self.app,
            version='1.0',
            title='API SGE',
            description='Sistema de Gestao de Entregas - API',
        )
        

    def run(self,host, port, debug):
        self.app.run(host, port, debug)


server = Server()
