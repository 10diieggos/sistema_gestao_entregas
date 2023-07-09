module.exports = (sequelize, DataTypes) => {
  const Servico = sequelize.define('Servico', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    prazoGuardaInterna: {
      type: DataTypes.INTEGER,
      field: 'prazo_guarda_interna'
    },
    admiteResiduo: {
      type: DataTypes.BOOLEAN,
      field: 'admite_residuo'
    },
    tentativasExternasPrevistas: {
      type: DataTypes.INTEGER,
      field: 'tentativas_externas_previstas'
    },
    sigla: {
      type: DataTypes.CHAR(2),
      allowNull: false
    },
    descricao: DataTypes.STRING(100),
    categoria: DataTypes.STRING(100),
    familia: DataTypes.STRING(100),
    geraPreAlerta: {
      type: DataTypes.BOOLEAN,
      field: 'gera_pre_alerta'
    },
    horaRealEntrega: {
      type: DataTypes.BOOLEAN,
      field: 'hora_real_entrega'
    },
    dadosDoRecebedorNaBaixa: {
      type: DataTypes.STRING(100),
      field: 'dados_do_recebedor_na_baixa'
    },
    entregaExterna: {
      type: DataTypes.BOOLEAN,
      field: 'entrega_externa'
    },
    entregaComImagem: {
      type: DataTypes.BOOLEAN,
      field: 'entrega_com_imagem'
    },
    criadoEm: {
      type: DataTypes.DATE,
      field: 'criado',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    atualizadoEm: {
      type: DataTypes.DATE,
      field: 'atualizado',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'servicos',
    timestamps:false
  });

  return Servico;
};
