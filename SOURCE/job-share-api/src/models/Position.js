const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Position extends Model {}
Position.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    position: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "position",
    freezeTableName: true,
    timestamps: false,
  }
);

Position.associate = (db) => {
  db.Position.hasMany(db.User, {
    foreignKey: {
      name: "position_id",
    },
  });
  db.Position.hasMany(db.Job, {
    foreignKey: {
      name: "position_id",
    },
  });
};
module.exports = () => Position;
