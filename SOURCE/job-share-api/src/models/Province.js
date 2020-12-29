const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Province extends Model {}
Province.init(
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
      type: Sequelize.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "province",
    freezeTableName: true,
    timestamps: false,
  }
);

Province.associate = (db) => {
  db.Province.hasOne(db.UserProfile, {
    foreignKey: {
      name: "province_id",
    },
  });
  db.Province.hasOne(db.Company, {
    foreignKey: {
      name: "province_id",
    },
  });
};
module.exports = () => Province;
