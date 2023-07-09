module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // Define the model attributes
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  }, {
    // Define the model options
    timestamps: true
  });

  return User;
};
