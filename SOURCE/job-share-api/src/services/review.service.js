const Sequelize = require("sequelize");
const sequelize = require("@config/env");
const { account_state } = require("@src/utils/constant");
var { Review, Company } = require("@models");

const ReviewService = {};

ReviewService.getList = async () => {
  return await Review.findAll({
    where: {
      is_active: 1,
    },
  });
};

ReviewService.create = async ({ user_id, company_id, rating }) => {
  await Review.create({
    company_id: company_id,
    user_id: user_id,
    rating: rating,
  });

  const { rows, count } = await Review.findAndCountAll({
    where: {
      company_id: company_id,
    },
  });

  const rateSum = await rows.reduce((a, { rating }) => a + rating, 0);
  const rateAverage = await (rateSum / count);

  await Company.update(
    { rating: rateAverage },
    {
      where: {
        id: company_id,
      },
    }
  );
  return rateAverage;
};

module.exports = ReviewService;
