module.exports = (sequelize, DataTypes) => {
  const Objeto = sequelize.define('Objeto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    codigo: {
      type: DataTypes.CHAR(13),
      allowNull: false
    },
    ordem: {
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
    distribuicao:{
        type :DataTypes.ENUM('E', 'I'),
        defaultValue:'I'
    },
    duplicado:{
        type :DataTypes.BOOLEAN,
        defaultValue:null
    },
    id_servico:{
        type :DataTypes.INTEGER,
        allowNull:false
    },
    disponivel:{
        type :DataTypes.BOOLEAN,
        defaultValue:null
    },
    finalizado:{
        type :DataTypes.BOOLEAN,
        defaultValue:null
    },
    pendencia_baixa:{
        type :DataTypes.BOOLEAN,
        defaultValue:null
    },
    tentativas_restantes:{
        type :DataTypes.INTEGER,
        defaultValue:null
    }
  }, {
    timestamps:true,
    createdAt:'criado',
    updatedAt:'atualizado',
  });
  return Objeto;
};
