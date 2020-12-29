const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Skill extends Model {}
Skill.init(
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
        model: "skill",
        key: "id",
      },
    },
    name: {
      type: Sequelize.TEXT,
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
    modelName: "skill",
    freezeTableName: true,
    timestamps: false,
  }
);

Skill.associate = (db) => {
  db.Skill.belongsTo(db.User, {
    foreignKey: {
      name: "user_id",
    },
  });
};
module.exports = () => Skill;
