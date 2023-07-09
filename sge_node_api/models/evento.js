module.exports = (sequelize, DataTypes) => {
  const Evento = sequelize.define('Evento', {
   id_objeto:{
       type :DataTypes.INTEGER,
       allowNull:false
   },
   data_hora:{
       type :DataTypes.DATE,
       allowNull:false
   },
   local:{
       type :DataTypes.STRING(100),
       defaultValue:null
   },
   situacao:{
       type :DataTypes.STRING(100),
       defaultValue:null
   },
   mensagem:{
       type :DataTypes.STRING(200),
       defaultValue:null
   }
  }, {
     timestamps:false,
  });
  return Evento;
};
