const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Company extends Model {}
Company.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
    phone: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    major: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
    number_of_staff: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    address: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    image: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
    province_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "province",
        key: "id",
      },
    },
    district_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "district",
        key: "id",
      },
    },
    url: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
    date_of_establishment: {
      type: Sequelize.DATE,
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
    modelName: "company",
    freezeTableName: true,
    timestamps: false,
  }
);

Company.associate = (db) => {
  db.Company.hasMany(db.User, {
    foreignKey: {
      name: "company_id",
    },
  });
  db.Company.hasMany(db.Job, {
    foreignKey: {
      name: "company_id",
    },
  });
  db.Company.hasMany(db.Review, {
    foreignKey: {
      name: "company_id",
    },
  });
  db.Company.belongsTo(db.Province, {
    foreignKey: {
      name: "province_id",
    },
  });
  db.Company.belongsTo(db.District, {
    foreignKey: {
      name: "district_id",
    },
  });
};
module.exports = () => Company;
