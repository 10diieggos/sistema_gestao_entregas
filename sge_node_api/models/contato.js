module.exports = (sequelize, DataTypes) => {
  const Contato = sequelize.define('Contato', {
   id:{
       type :DataTypes.INTEGER,
       primaryKey:true,
       autoIncrement:true
   },
   telefone:{
       type :DataTypes.CHAR(11),
       allowNull:false
   }
  }, {
     timestamps:false,
  });
  return Contato;
};
