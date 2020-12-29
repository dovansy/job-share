const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Review extends Model {}
Review.init(
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
    },
    company_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "company",
        key: "id",
      },
    },
    rating: {
      type: Sequelize.INTEGER,
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
    modelName: "review",
    freezeTableName: true,
    timestamps: false,
  }
);

Review.associate = (db) => {
  db.Review.belongsTo(db.User, {
    foreignKey: {
      name: "user_id",
    },
  });
  db.Review.belongsTo(db.Company, {
    foreignKey: {
      name: "company_id",
    },
  });
};
module.exports = () => Review;
