import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Contact from '../app/models/Contract';
import File from '../app/models/File';
import State from '../app/models/State';

const models = [Contact, File, State];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
