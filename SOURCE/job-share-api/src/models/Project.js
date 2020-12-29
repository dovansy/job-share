const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Project extends Model {}
Project.init(
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
      unique: true,
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
    modelName: "project",
    freezeTableName: true,
    timestamps: false,
  }
);

Project.associate = (db) => {
  db.Project.belongsTo(db.User, {
    foreignKey: {
      name: "user_id",
    },
  });
};
module.exports = () => Project;
