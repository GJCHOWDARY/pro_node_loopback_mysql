'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todos = sequelize.define('Todos', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Todos.associate = function(models) {
    // associations can be defined here
    Todos.hasMany(models.TodoItem, {
      foreignKey: 'todoId',
      as: 'todoItems',
    });
  };
  return Todos;
};
