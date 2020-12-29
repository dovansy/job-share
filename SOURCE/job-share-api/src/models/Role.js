const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Role extends Model {}
Role.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "role",
    freezeTableName: true,
    timestamps: false,
  }
);

Role.associate = (db) => {
  db.Role.hasMany(db.User, {
    foreignKey: {
      name: "role_id",
    },
  });
};
module.exports = () => Role;
