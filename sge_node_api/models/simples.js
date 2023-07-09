module.exports = (sequelize, DataTypes) => {
  const Simples = sequelize.define('Simples', {
    id_objeto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    codigo: {
      type: DataTypes.CHAR(13),
      defaultValue: null
    },
    ordem: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    lista: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    posicao_objeto: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    destinatario: {
      type: DataTypes.STRING(100),
      defaultValue: null
    },
    endereco: {
      type: DataTypes.STRING(100),
      defaultValue: null
    },
    num_endereco: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    disponivel:{
        type :DataTypes.BOOLEAN,
        defaultValue:null
    },
    data_hora:{
        type :DataTypes.DATE,
        defaultValue:null
    },
    local:{
        type :DataTypes.STRING(100),
        defaultValue:null
    },
    situacao:{
        type :DataTypes.CHAR(8),
        defaultValue:null
    }
  }, {
     timestamps:true,
     createdAt:'data_hora',
     updatedAt:'atualizado',
  });
  return Simples;
};
