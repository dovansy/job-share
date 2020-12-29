const sequelize = require("@config/env");

var { Major } = require("@models");

const MajorService = {};

MajorService.findOrCreate = async (name, transaction) => {
  let options = {
    where: {
      major: name,
    },
  };
  if (transaction) options.transaction = transaction;
  let [data] = await Major.findOrCreate(options);

  return data.id;
};

module.exports = MajorService;
