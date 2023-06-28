from sqlalchemy import Column, Integer, String, Boolean, DateTime
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
    criado = Column(DateTime)
    atualizado = Column(DateTime)

    def to_dict(self):
        return {
            'id': self.id,
            'prazo_guarda_interna': self.prazo_guarda_interna,
            'admite_residuo': self.admite_residuo,
            'tentativas_externas_previstas': self.tentativas_externas_previstas,
            'sigla': self.sigla,
            'descricao': self.descricao,
            'categoria': self.categoria,
            'familia': self.familia,
            'gera_pre_alerta': self.gera_pre_alerta,
            'hora_real_entrega': self.hora_real_entrega,
            'dados_do_recebedor_na_baixa': self.dados_do_recebedor_na_baixa,
            'entrega_externa': self.entrega_externa,
            'entrega_com_imagem': self.entrega_com_imagem,
            'criado': self.criado,
            'atualizado': self.atualizado
        }