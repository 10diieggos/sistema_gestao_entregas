from sqlalchemy import Column, Integer, String, Enum, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .Eventos_sqlalchemy_model import Eventos_sqlalchemy_model
from src.database.sge import db

class Objetos_sqlalchemy_model(db.Model):
    __tablename__ = 'objetos'
    id = Column(Integer, primary_key=True)
    codigo = Column(String(13), nullable=False, unique=True)
    ordem = Column(Integer)
    destinatario = Column(String(100))
    endereco = Column(String(100))
    num_endereco = Column(Integer)
    distribuicao = Column(Enum('E', 'I'), default='I')
    duplicado = Column(Boolean)
    id_servico = Column(Integer, ForeignKey('servicos.id'), nullable=False)
    disponivel = Column(Boolean)
    finalizado = Column(Boolean)
    pendencia_baixa = Column(Boolean)
    tentativas_restantes = Column(Integer)
    criado = Column(DateTime, default=func.now())
    atualizado = Column(DateTime, default=func.now(), onupdate=func.now())
    eventos = relationship("Eventos_sqlalchemy_model", back_populates="objeto")

    def to_dict(self):
        dicionario = {}
        for coluna in self.__table__.columns:
            dicionario[coluna.name] = getattr(self, coluna.name)
        return dicionario