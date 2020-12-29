const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Job extends Model {}
Job.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    company_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "company",
        key: "id",
      },
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    type: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    deadline: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    position_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "position",
        key: "id",
      },
    },
    min_salary: {
      type: Sequelize.BIGINT,
      allowNull: true,
    },
    max_salary: {
      type: Sequelize.BIGINT,
      allowNull: true,
    },
    is_active: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: "1",
    },
    require_exp: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    gender: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    skill: {
      type: Sequelize.STRING(2000),
      allowNull: true,
    },
    benefit: {
      type: Sequelize.STRING(2000),
      allowNull: false,
    },
    created_date: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    modelName: "job",
    freezeTableName: true,
    timestamps: false,
  }
);

Job.associate = (db) => {
  db.Job.hasMany(db.JobUser, {
    foreignKey: {
      name: "job_id",
    },
  });
  db.Job.belongsTo(db.Company, {
    foreignKey: {
      name: "company_id",
    },
  });
  db.Job.belongsTo(db.Position, {
    foreignKey: {
      name: "position_id",
    },
  });
};
module.exports = () => Job;
