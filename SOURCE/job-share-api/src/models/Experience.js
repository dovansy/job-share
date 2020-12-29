const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Experience extends Model {}
Experience.init(
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
    position: {
      type: Sequelize.STRING(45),
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
    modelName: "experience",
    freezeTableName: true,
    timestamps: false,
  }
);

Experience.associate = (db) => {
  db.Experience.belongsTo(db.User, {
    foreignKey: {
      name: "user_id",
    },
  });
};
module.exports = () => Experience;
