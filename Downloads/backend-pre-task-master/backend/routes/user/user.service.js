const { user: User, career: Career } = require("../../models");

async function createUser(payload) {
  const result = await User.create(payload).catch((err) => {
    console.log(err);
    throw new Error("failed create Member");
  });

  return result;
}

async function findAllUser(payload) {
  // const options = {
  //   offset,
  //   limit,
  //   order,
  // distinct: true,
  //   where: "where",
  // };
  const result = await User.findAndCountAll({
    distinct: true,

    include: [{ model: Career }],
    order: [
      ["name", "DESC"],
      [Career, "joinDate", "DESC"],
    ],
  });

  return result;
}

module.exports = { createUser, findAllUser };
