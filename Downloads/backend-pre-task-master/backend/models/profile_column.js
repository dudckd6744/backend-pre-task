module.exports = (sequelize, DataTypes) => {
  const ProfileColumn = sequelize.define(
    "profile_column",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      label: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      dataKey: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      parentDataKey: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      tableName: "profile_column",
      paranoid: true,
      createdAt: "created_at",
      underscored: true,
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  ProfileColumn.associate = (models) => {};

  return ProfileColumn;
};
