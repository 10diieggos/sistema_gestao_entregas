module.exports = (sequelize, DataTypes) => {
  const Recebedor = sequelize.define('Recebedor', {
   id:{
       type :DataTypes.INTEGER,
       primaryKey:true,
       autoIncrement:true
   },
   cpf:{
       type :DataTypes.CHAR(11),
       allowNull:false
   },
   nome:{
       type :DataTypes.STRING(100),
       allowNull:false
   }
  }, {
     timestamps:true,
     createdAt:'criado',
     updatedAt:'atualizado',
  });
  return Recebedor;
};
