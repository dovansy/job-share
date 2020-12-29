const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class JobUser extends Model { }
JobUser.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    job_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "job",
        key: "id",
      },
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: "0",
    },
    is_send: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: "0",
    },
  },
  {
    sequelize,
    modelName: "job_user",
    freezeTableName: true,
    timestamps: false,
  }
);

JobUser.associate = (db) => {
  db.JobUser.belongsTo(db.Job, {
    foreignKey: {
      name: "job_id",
    },
  });
  db.JobUser.belongsTo(db.User, {
    foreignKey: {
      name: "user_id",
    },
  });
};
module.exports = () => JobUser;
