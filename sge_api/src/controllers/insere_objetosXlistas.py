from flask import request
from flask_restx import Resource
from sqlalchemy import text, exists, and_
from src.server.instance import server
from src.database.sge import db
from src.models.flask_restx_models import objetos_listas_flask_restx_model
from src.models.objetosXlistas_sqlalchemy_model import objetosXlistas_sqlalchemy_model
from src.models.Listas_sqlalchemy_model import Listas_sqlalchemy_model
from src.models.Objetos_sqlalchemy_model import Objetos_sqlalchemy_model
import json
from datetime import datetime

app, api = server.app, server.api

def datetime_handler(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f'Object of type {obj.__class__.__name__} is not JSON serializable')

@api.route('/insere_objetosXlistas')
class Insere_objetosXlistas(Resource):
    @api.expect(objetos_listas_flask_restx_model)
    def post(self):
        input_data = request.get_json()['data']
        rows = input_data.split('\n')
        rows = [row for row in rows if row]
        data = []
        registros_inseridos = []
        registros_duplicados = []

        #obtendo ids e verificando cadastros:
        listas = [row.split('\t')[1] for row in rows if row]
        objetos = [row.split('\t')[0] for row in rows if row]
       
        listas_cadastradas = db.session.query(Listas_sqlalchemy_model).filter(Listas_sqlalchemy_model.numero.in_(listas)).all()
        listas_cadastradas = [lista_cadastrada.to_dict() for lista_cadastrada in listas_cadastradas]
        get_id_lista = {d['numero']: d['id'] for d in listas_cadastradas}
        get_numero_lista = {d['id']: d['numero'] for d in listas_cadastradas}

        objetos_cadastrados = db.session.query(Objetos_sqlalchemy_model).filter(Objetos_sqlalchemy_model.codigo.in_(objetos)).all()
        objetos_cadastrados = [objeto_cadastrado.to_dict() for objeto_cadastrado in objetos_cadastrados]
        get_id_objeto = {d['codigo']: d['id'] for d in objetos_cadastrados}
        get_codigo_objeto = {d['id']: d['codigo'] for d in objetos_cadastrados}

        listas_nao_cadastradas = [numero for numero in listas if numero not in get_id_lista]
        objetos_nao_cadastrados = [numero for numero in objetos if numero not in get_id_objeto]

        rows = [row for row in rows if row.split('\t')[1] not in listas_nao_cadastradas]
        rows = [row for row in rows if row.split('\t')[0] not in objetos_nao_cadastrados]

        for row in rows:
          values = row.split('\t')
          codigo = values[0]
          numero = values[1]
          posicao_objeto = values[2]
          id_objeto = get_id_objeto[codigo]
          id_lista = get_id_lista[numero]
          duplicado = db.session.query(exists().where(and_(objetosXlistas_sqlalchemy_model.id_objeto == id_objeto, objetosXlistas_sqlalchemy_model.id_lista == id_lista))).scalar()
          if duplicado:
            registros_duplicados.append(f'{codigo}\t{numero}\t{posicao_objeto}\n')
            continue
          data.append({
              'id_objeto': id_objeto,
              'id_lista': id_lista,
              'posicao_objeto': posicao_objeto
          })
          registros_inseridos.append([id_objeto, id_lista])
        db.session.bulk_insert_mappings(objetosXlistas_sqlalchemy_model, data)
        db.session.commit()

        registros_inseridos = db.session.query(objetosXlistas_sqlalchemy_model).filter(and_(objetosXlistas_sqlalchemy_model.id_objeto.in_([r[0] for r in registros_inseridos]), objetosXlistas_sqlalchemy_model.id_lista.in_([r[1] for r in registros_inseridos]))).all()
        registros_inseridos = [registro.to_dict() for registro in registros_inseridos]

        for registro in registros_inseridos:
          registro['codigo'] = get_codigo_objeto[registro['id_objeto']]
          registro['numero'] = get_numero_lista[registro['id_lista']]
        
        print(registros_inseridos)
        
        return json.dumps({
          'registros_inseridos': registros_inseridos,
          'listas_nao_cadastradas': listas_nao_cadastradas,
          'objetos_nao_cadastrados': objetos_nao_cadastrados, 
          'registros_duplicados': registros_duplicados}, default=datetime_handler)