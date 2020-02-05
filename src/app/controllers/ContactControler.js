import Contract from '../models/Contract';

class ContractController {
  async store(req, res) {
    const { cpf } = req.body;

    const checkCPF = await Contract.findOne({ where: { cpf } });

    if (checkCPF) {
      return res.status(400).json({ error: 'CPF duplicado' });
    }

    const contract = await Contract.create(req.body);

    return res.json(contract);
  }
}

export default new ContractController();
