const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class District extends Model {}
District.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    is_active: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: "1",
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    code: {
      type: Sequelize.STRING(5),
      allowNull: false,
    },
    province_code: {
      type: Sequelize.STRING(5),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "district",
    freezeTableName: true,
    timestamps: false,
  }
);

District.associate = (db) => {
  db.District.hasOne(db.UserProfile, {
    foreignKey: {
      name: "district_id",
    },
  });
  db.District.hasOne(db.Company, {
    foreignKey: {
      name: "district_id",
    },
  });
};
module.exports = () => District;
