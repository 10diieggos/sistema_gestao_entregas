module.exports = (sequelize, DataTypes) => {
  const ObjetoContato = sequelize.define('ObjetoContato', {
   id_objeto:{
       type :DataTypes.INTEGER,
       allowNull:false
   },
   id_contato:{
       type :DataTypes.INTEGER,
       allowNull:false
   }
  }, {
     timestamps:false,
  });
  return ObjetoContato;
};
