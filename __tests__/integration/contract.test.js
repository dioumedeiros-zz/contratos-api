import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';

describe('Contract', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register ', async () => {
    const response = await request(app)
      .post('/contracts')
      .send({
        name: 'Dionata Medeiros',
        email: 'diou@gmail.com',
        cpf: '192.168.001.10',
        loan_value: 830,
        monthly_rent: 5000,
        birth_date: new Date(),
        material_status: 'Solteiro',
        address: 'Rua Gambala Ribeiro',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated cpf', async () => {
    await request(app)
      .post('/contracts')
      .send({
        name: 'Dionata Medeiros',
        email: 'diou@gmail.com',
        cpf: '192.168.001.10',
        loan_value: 830,
        monthly_rent: 5000,
        birth_date: new Date(),
        material_status: 'Solteiro',
        address: 'Rua Gambala Ribeiro',
      });

    const response = await request(app)
      .post('/contracts')
      .send({
        name: 'Dionata Medeiros',
        email: 'diou@gmail.com',
        cpf: '192.168.001.10',
        loan_value: 830,
        monthly_rent: 5000,
        birth_date: new Date(),
        material_status: 'Solteiro',
        address: 'Rua Gambala Ribeiro',
      });

    expect(response.status).toBe(400);
  });
});
