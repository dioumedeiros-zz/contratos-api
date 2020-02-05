module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('contracts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      loan_value: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      monthly_rent: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      birth_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      material_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      file_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'files',
          key: 'id',
        },
      },
      state_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'states',
          key: 'id',
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('contracts');
  },
};
