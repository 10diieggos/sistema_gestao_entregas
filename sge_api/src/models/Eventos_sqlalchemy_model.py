from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from src.database.sge import db


class Eventos_sqlalchemy_model(db.Model):
    __tablename__ = 'eventos'
    id_objeto = Column(Integer, ForeignKey('objetos.id'), primary_key=True)
    data_hora = Column(DateTime, primary_key=True)
    local = Column(String(100))
    situacao = Column(String(100))
    mensagem = Column(String(200))
    objeto = relationship("Objetos_sqlalchemy_model", back_populates="eventos")

    def to_dict(self):
        dicionario = {}
        for coluna in self.__table__.columns:
            dicionario[coluna.name] = getattr(self, coluna.name)
        return dicionario

