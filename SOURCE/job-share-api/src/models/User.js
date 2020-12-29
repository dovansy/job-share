const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class User extends Model {}
User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
    token: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: "0",
    },
    is_active: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: "1",
    },
    role_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "role",
        key: "id",
      },
    },
    company_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "company",
        key: "id",
      },
    },
    position_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "position",
        key: "id",
      },
    },
    created_date: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    cv_status: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "user",
    freezeTableName: true,
    timestamps: false,
  }
);

User.associate = (db) => {
  db.User.hasOne(db.UserProfile, {
    foreignKey: {
      name: "user_id",
    },
  });
  db.User.belongsTo(db.Role, {
    foreignKey: {
      name: "role_id",
    },
  });
  db.User.belongsTo(db.Company, {
    foreignKey: {
      name: "company_id",
    },
  });
  db.User.belongsTo(db.Position, {
    foreignKey: {
      name: "position_id",
    },
  });
  db.User.hasMany(db.JobUser, {
    foreignKey: {
      name: "user_id",
    },
  });
  db.User.hasMany(db.Review, {
    foreignKey: {
      name: "user_id",
    },
  });
  db.User.hasMany(db.Education, {
    foreignKey: {
      name: "user_id",
    },
  });
  db.User.hasMany(db.Experience, {
    foreignKey: {
      name: "user_id",
    },
  });
  db.User.hasMany(db.Skill, {
    foreignKey: {
      name: "user_id",
    },
  });
  db.User.hasMany(db.Project, {
    foreignKey: {
      name: "user_id",
    },
  });
  db.User.hasMany(db.Volunteer, {
    foreignKey: {
      name: "user_id",
    },
  });
};
module.exports = () => User;
