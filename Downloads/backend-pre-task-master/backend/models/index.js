const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("jober_pre_task", "root", "12341234", {
  host: "127.0.0.1",
  dialect: "mysql",
});

const db = {};

fs.readdirSync(__dirname)
  .filter((fileName) => {
    const [modelName, extension] = fileName.split(".");
    return modelName !== "index" && extension === "js";
  })
  .forEach(function (file) {
    const model = sequelize["import"](path.join(__dirname, file));
    console.log("[model]", model);
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  console.log(modelName, db);
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
sequelize
  .sync()
  .then(console.log("success"))
  .catch((err) => console.log("failed", err));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
