const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Volunteer extends Model {}
Volunteer.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    start_time: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    end_time: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    is_active: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: "1",
    },
  },
  {
    sequelize,
    modelName: "volunteer",
    freezeTableName: true,
    timestamps: false,
  }
);

Volunteer.associate = (db) => {
  db.Volunteer.belongsTo(db.User, {
    foreignKey: {
      name: "user_id",
    },
  });
};
module.exports = () => Volunteer;
