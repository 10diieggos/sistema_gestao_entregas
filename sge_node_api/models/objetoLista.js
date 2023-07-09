module.exports = (sequelize, DataTypes) => {
  const ObjetoLista = sequelize.define('ObjetoLista', {
   id_objeto:{
       type :DataTypes.INTEGER,
       allowNull:false
   },
   id_lista:{
       type :DataTypes.INTEGER,
       allowNull:false
   },
   posicao_objeto:{
       type :DataTypes.INTEGER,
       allowNull:false
   }
  }, {
     timestamps:false,
  });
  return ObjetoLista;
};
