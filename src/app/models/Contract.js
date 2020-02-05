import Sequelize, { Model } from 'sequelize';

class Contract extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        cpf: Sequelize.STRING,
        loan_value: Sequelize.DOUBLE,
        monthly_rent: Sequelize.DOUBLE,
        birth_date: Sequelize.DATE,
        material_status: Sequelize.STRING,
        address: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'file_id', as: 'file' });
    this.belongsTo(models.State, { foreignKey: 'state_id', as: 'state' });
  }
}

export default Contract;
