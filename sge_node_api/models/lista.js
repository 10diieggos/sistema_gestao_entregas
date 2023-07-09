module.exports = (sequelize, DataTypes) => {
  const Lista = sequelize.define('Lista', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    data_hora_lancamento:{
        type :DataTypes.DATE,
        defaultValue:null
    },
    numero:{
        type :DataTypes.CHAR(12),
        defaultValue:null
    },
     modalidade:{
         type :DataTypes.ENUM('LOEC', 'LDI'),
         defaultValue:null
     }
  }, {
     timestamps:true,
     createdAt:'criado',
     updatedAt:'atualizado',
  });
  return Lista;
};
