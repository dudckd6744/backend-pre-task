const { user: User, career: Career } = require("../../models");

async function createUser(payload) {
  const result = await User.create(payload).catch((err) => {
    console.log(err);
    throw new Error("failed create Member");
  });

  return result;
}

async function findAllUser(payload) {
  let { current, pageSize, sort } = payload;

  const childrenSort = sort[0].split("_");

  if (childrenSort.includes("career")) {
    sort = [Career, childrenSort[1], sort[1]];
  }

  const options = {
    offset: (current - 1) * pageSize,
    limit: Number(pageSize),
    order: [sort, [Career, "joinDate", "ASC"]],
    distinct: true,
  };

  const result = await User.findAndCountAll({
    ...options,
    include: [{ model: Career }],
  });

  result.rows.forEach((row, i) => {
    if (row.careers.length > 0) {
      console.log(row.get().careers);
      row.get().career_name = row.careers[0].name;
      row.get().career_resignationDate = row.careers[0].resignationDate;
    }
  });

  return result;
}

module.exports = { createUser, findAllUser };
