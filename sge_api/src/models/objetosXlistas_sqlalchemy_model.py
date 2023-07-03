from sqlalchemy import Column, ForeignKey, Integer
from src.database.sge import db

class objetosXlistas_sqlalchemy_model(db.Model):
    __tablename__ = 'objetos_listas'
    id_objeto = Column(Integer, ForeignKey('objetos.id'), primary_key=True)
    id_lista = Column(Integer, ForeignKey('listas.id'), primary_key=True)
    posicao_objeto = Column(Integer, nullable=False)

    def to_dict(self):
      dicionario = {}
      for coluna in self.__table__.columns:
          dicionario[coluna.name] = getattr(self, coluna.name)
      return dicionario