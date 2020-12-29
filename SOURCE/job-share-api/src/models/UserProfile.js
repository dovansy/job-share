const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class UserProfile extends Model {}
UserProfile.init(
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
    phone: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
    gender: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
    address: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
    province_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    district_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    dob: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    hobby: {
      type: Sequelize.STRING(2000),
      allowNull: true,
    },
    apply_work: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
    image: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
    target_work: {
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
    modelName: "user_profile",
    freezeTableName: true,
    timestamps: false,
  }
);

UserProfile.associate = (db) => {
  db.UserProfile.belongsTo(db.User, {
    foreignKey: {
      name: "user_id",
    },
  });
  db.UserProfile.belongsTo(db.Province, {
    foreignKey: {
      name: "province_id",
    },
  });
  db.UserProfile.belongsTo(db.District, {
    foreignKey: {
      name: "district_id",
    },
  });
};
module.exports = () => UserProfile;
