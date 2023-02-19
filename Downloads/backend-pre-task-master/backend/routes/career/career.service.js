const { career: Career } = require("../../models");

async function createCareer(payload) {
  const result = await Career.create(payload).catch((err) => {
    console.log(err);
    throw new Error("failed create Career");
  });

  return result;
}

async function updateCareer(id, payload) {
  const result = await Career.update({ ...payload }, { where: { id } });

  if (result[0] === 0) {
    throw new Error("failed update User");
  }
}

module.exports = {
  createCareer,
  updateCareer,
};
