from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from src.database.sge import db

class Servicos_sqlalchemy_model(db.Model):
    __tablename__ = 'servicos'
    id = Column(Integer, primary_key=True)
    prazo_guarda_interna = Column(Integer)
    admite_residuo = Column(Boolean)
    tentativas_externas_previstas = Column(Integer)
    sigla = Column(String)
    descricao = Column(String)
    categoria = Column(String)
    familia = Column(String)
    gera_pre_alerta = Column(Boolean)
    hora_real_entrega = Column(Boolean)
    dados_do_recebedor_na_baixa = Column(String)
    entrega_externa = Column(Boolean)
    entrega_com_imagem = Column(Boolean)
    criado = Column(DateTime, default=func.now())
    atualizado = Column(DateTime, default=func.now(), onupdate=func.now())

    def to_dict(self):
        dicionario = {}
        for coluna in self.__table__.columns:
            dicionario[coluna.name] = getattr(self, coluna.name)
        return dicionario