from flask import request
from flask_restx import Resource, fields
from sqlalchemy import text, exists, and_
from src.server.instance import server
from src.database.sge import db
from src.models.flask_restx_models import eventos_flask_restx_model
from src.models.Eventos_sqlalchemy_model import Eventos_sqlalchemy_model
from src.models.Objetos_sqlalchemy_model import Objetos_sqlalchemy_model
import json
from datetime import datetime, timedelta

app, api = server.app, server.api

import re

class DadosDeEventos:
    def __init__(self, inputText):
        self.inputText = inputText
        self.texto_no_fluxo = self.inputText
        self.desnecessarias_removidas = ''
        self.vazias_removidas = ''
        self.especificas_removidas = ''
        self.espaco_removidos = ''
        self.substrings = []
        self.codigos = []
        self.blocos_de_eventos = []
        self.objetos_ids = []
        # self.objetos_nao_cadastrados= []

    
    def desnecessarias(self):
        linhas = self.texto_no_fluxo.split('\n')
        linhas = [linha for linha in linhas if re.match(r'^\s\s', linha)]
        self.desnecessarias_removidas ='\n'.join(linhas)
        self.texto_no_fluxo = self.desnecessarias_removidas
        

    def vazias(self):
        linhas = self.texto_no_fluxo.split('\n')
        linhas = [linha for linha in linhas if linha.strip() != '']
        self.vazias_removidas ='\n'.join(linhas)
        self.texto_no_fluxo = self.vazias_removidas

    def especificas(self):
        linhas = self.texto_no_fluxo.split('\n')
        linhas = [linha for linha in linhas if not any(substring in linha for substring in self.substrings)]
        self.especificas_removidas ='\n'.join(linhas)
        self.texto_no_fluxo = self.especificas_removidas

    def espacos(self):
        linhas = self.texto_no_fluxo.split('\n')
        linhas = [linha.strip() for linha in linhas]
        self.espaco_removidos ='\n'.join(linhas)
        self.texto_no_fluxo = self.espaco_removidos
    
    def run(self):
        self.desnecessarias()
        self.vazias()
        self.especificas()
        self.espacos()
        self.find_codigos()
        self.remove_as_linhas_com_codigo_e_data_de_rastreamento_separa_blocos()
        self.ajustar_as_linhas_com_mensagem_com_os_dados_do_evento()
        self.adicionar_segundos_em_datas_repetidas()
        self.converter_formatos_data_hora()
        self.concatenar_codigos_com_blocos_de_eventos()
        self.get_objetos_ids()
        self.removendo_blocos_nao_cadastrados()
    
    def casos_especificos_para_eliminar(self, substrings):
        self.substrings = substrings

    def find_codigos(self):
      pattern = re.compile(r'[A-Z]{2}\d{9}[A-Z]{2}')
      codigos = pattern.findall(self.inputText)
      self.codigos = codigos

    def remove_as_linhas_com_codigo_e_data_de_rastreamento_separa_blocos(self):
        blocos_de_eventos = re.split(r'[A-Z]{2}\d{9}[A-Z]{2}', self.texto_no_fluxo)
        blocos_de_eventos = [bloco.split('\n', 1)[-1] for bloco in blocos_de_eventos]
        if blocos_de_eventos and blocos_de_eventos[0] == '':
            blocos_de_eventos.pop(0)
        self.blocos_de_eventos = blocos_de_eventos
    
    def ajustar_as_linhas_com_mensagem_com_os_dados_do_evento(self):
      new_blocos_de_eventos = []
      for bloco in self.blocos_de_eventos:
          lines = bloco.split('\n')
          new_lines = []
          for line in lines:
              if re.match(r'\d{2}/\d{2}/\d{4} \d{2}:\d{2}:\d{2}', line):
                  new_lines.append(line)
              else:
                  if new_lines:
                      new_lines[-1] += '\t' + line
                  else:
                      new_lines.append(line)
          new_bloco = '\n'.join(new_lines)
          new_blocos_de_eventos.append(new_bloco)
      self.blocos_de_eventos = new_blocos_de_eventos
    
    
    def adicionar_segundos_em_datas_repetidas(self):
        result = []
        for string in self.blocos_de_eventos:
            new_string = ''
            dates = re.findall(r'\d{2}/\d{2}/\d{4} \d{2}:\d{2}:\d{2}', string)
            date_counts = {}
            altered_dates = []
            for date in dates[::-1]:
                date_counts[date] = date_counts.get(date, 0) + 1
                if date_counts[date] > 1:
                    dt = datetime.strptime(date, '%d/%m/%Y %H:%M:%S')
                    dt += timedelta(seconds=date_counts[date]-1)
                    new_date = dt.strftime('%d/%m/%Y %H:%M:%S')
                    altered_dates.append((date, new_date))
            altered_dates.sort(key=lambda x: x[1], reverse=True)
            for old_date, new_date in altered_dates:
                string = string.replace(old_date, new_date, 1)
            result.append(string)
        self.blocos_de_eventos = result

    def converter_formatos_data_hora(self):
        result = []
        for string in  self.blocos_de_eventos:
            new_string = ''
            words = re.findall(r'\S+|\s+', string)
            for word in words:
                try:
                    date = datetime.strptime(word, '%d/%m/%Y')
                    new_string += date.strftime('%Y-%m-%d')
                except ValueError:
                    new_string += word
            result.append(new_string)
        self.blocos_de_eventos = result

    def concatenar_codigos_com_blocos_de_eventos(self):
      result = []
      for codigo, bloco in zip(self.codigos, self.blocos_de_eventos):
          lines = bloco.split('\n')
          new_lines = [str(codigo) + '\t' + line for line in lines]
          new_bloco = '\n'.join(new_lines)
          result.append(new_bloco)
      self.blocos_de_eventos = result

    def get_objetos_ids(self):
        self.idXcodigo = db.session.query(Objetos_sqlalchemy_model.id, Objetos_sqlalchemy_model.codigo).filter(Objetos_sqlalchemy_model.codigo.in_(self.codigos)).all()
        self.objetos_nao_cadastrados = [codigo for codigo in self.codigos if codigo not in [codigo for (id, codigo) in self.idXcodigo]]


    def removendo_blocos_nao_cadastrados(self):
        for objeto in self.objetos_nao_cadastrados:
            self.blocos_de_eventos = [bloco for bloco in self.blocos_de_eventos if objeto not in bloco]
    
    def get_id_objeto(self, codigo):
        for tupla in self.idXcodigo:
            if tupla[1] == codigo:
                return tupla[0]
        return None
    
    def get_codigo(self, id_objeto):
        for tupla in self.idXcodigo:
            if tupla[0] == id_objeto:
                return tupla[1]
        return None
            

def datetime_handler(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f'Object of type {obj.__class__.__name__} is not JSON serializable')

@api.route('/insere_evento')
class InsereEvento(Resource):
    @api.expect(fields.String())
    def post(self):
        
        inputText = request.data.decode('utf-8')
        eventos = DadosDeEventos(inputText)
        eventos.casos_especificos_para_eliminar([
            'Português', 
            'English', 
            'Fale com os Correios'
        ])
        eventos.run()
        blocos_de_eventos = eventos.blocos_de_eventos
        objetos_nao_cadastrados = eventos.objetos_nao_cadastrados
        data = []
        registros_inseridos = []
        registros_duplicados = []
        for bloco in blocos_de_eventos:
            for row in bloco.split('\n'):
                if row:   
                    values = row.split('\t')
                    codigo = values[0]
                    id_objeto = eventos.get_id_objeto(codigo)
                    data_hora = values[1].strip()
                    local = values[2].strip()
                    situacao = values[3].strip()
                    try:
                        mensagem = values[5].strip()
                    except IndexError:
                        mensagem = None
                    if mensagem == '':
                        mensagem = None
                    duplicado = db.session.query(exists().where(and_(Eventos_sqlalchemy_model.id_objeto == id_objeto, Eventos_sqlalchemy_model.data_hora == data_hora))).scalar()
                    if duplicado:
                        registros_duplicados.append(f'{codigo}\t{data_hora}\t{situacao}\n')
                        continue
                    data.append({
                        'id_objeto': id_objeto,
                        'data_hora': data_hora,
                        'local': local,
                        'situacao': situacao,
                        'mensagem': mensagem,
                    })
                    registros_inseridos.append([id_objeto, data_hora])
        db.session.bulk_insert_mappings(Eventos_sqlalchemy_model, data)
        db.session.commit()

        # a chave primaria na tabela é o conjunto das colunas id_objeto e data_hora
        registros_inseridos = db.session.query(Eventos_sqlalchemy_model).filter(and_(Eventos_sqlalchemy_model.id_objeto.in_([r[0] for r in registros_inseridos]), Eventos_sqlalchemy_model.data_hora.in_([r[1] for r in registros_inseridos]))).all()
        registros_inseridos = [registro.to_dict() for registro in registros_inseridos]
        
        for registro in registros_inseridos:
            id_objeto = registro['id_objeto']
            codigo = eventos.get_codigo(id_objeto)
            registro['codigo'] = codigo
        
        return json.dumps({
            'registros_inseridos': registros_inseridos, 
            'registros_duplicados': registros_duplicados, 
            'objetos_nao_cadastrados': objetos_nao_cadastrados
            }, default=datetime_handler)