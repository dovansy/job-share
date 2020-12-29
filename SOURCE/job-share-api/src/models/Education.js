const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Education extends Model {}
Education.init(
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
    major: {
      type: Sequelize.STRING(1000),
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
    modelName: "education",
    freezeTableName: true,
    timestamps: false,
  }
);

Education.associate = (db) => {
  db.Education.belongsTo(db.User, {
    foreignKey: {
      name: "user_id",
    },
  });
};
module.exports = () => Education;
