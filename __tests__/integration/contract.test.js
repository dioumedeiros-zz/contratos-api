import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';

describe('Contract Register', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
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

  it('should be able has first state after to register', async () => {
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

    const { state } = response.body;
    expect(state).toBe(1);
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

  it('should be not able to register with missing require fields', async () => {
    const response = await request(app)
      .post('/contracts')
      .send({
        name: null,
        email: 'diou@gmail.com',
        cpf: '192.168.001.10',
        loan_value: null,
        monthly_rent: 5000,
        birth_date: new Date(),
        material_status: 'Solteiro',
        address: 'Rua Gambala Ribeiro',
      });

    expect(response.status).toBe(400);
  });
});

describe('Contract update', () => {
  it('should be able to update', async () => {
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

    const response_update = await request(app)
      .put(`/contracts/${response.body.id}`)
      .send({
        monthly_rent: 6500,
        material_status: 'Casado',
      });

    expect(response_update.body.monthly_rent).toBe(6500);
  });
});
