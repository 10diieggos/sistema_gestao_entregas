from sqlalchemy import Column, Integer, DateTime, String, Enum
from sqlalchemy.sql import func
from src.database.sge import db


class Listas_sqlalchemy_model(db.Model):
    __tablename__ = 'listas'
    id = Column(Integer, primary_key=True)
    data_hora_lancamento = Column(DateTime)
    numero = Column(String(12), unique=True)
    modalidade = Column(Enum('LOEC', 'LDI'))
    criado = Column(DateTime, default=func.now())
    atualizado = Column(DateTime, default=func.now(), onupdate=func.now())

    def to_dict(self):
      dicionario = {}
      for coluna in self.__table__.columns:
          dicionario[coluna.name] = getattr(self, coluna.name)
      return dicionario