module.exports = (sequelize, DataTypes) => {
  const Career = sequelize.define(
    "career",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      duty: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      joinDate: {
        type: DataTypes.DATE(),"",
        allowNull: false,
      },
      resignationDate: {
        type: DataTypes.DATE(),
        allowNull: true,
      },
    },
    {
      tableName: "career",
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  Career.associate = (models) => {
    Career.belongsTo(models.user, {
      foreignKey: "userId",
    });
  };

  return Career;
};
