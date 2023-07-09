module.exports = (sequelize, DataTypes) => {
  const ObjetoRecebedor = sequelize.define('ObjetoRecebedor', {
   id_objeto:{
       type :DataTypes.INTEGER,
       allowNull:false
   },
   id_recebedor:{
       type :DataTypes.INTEGER,
       allowNull:false
   },
   formal:{
       type :DataTypes.BOOLEAN,
       defaultValue:null
   },
   data_hora_real_entrega:{
       type :DataTypes.DATE,
       defaultValue:null
   }
  }, {
     timestamps:false,
  });
  return ObjetoRecebedor;
};
