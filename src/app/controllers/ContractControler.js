import * as Yup from 'yup';
import Contract from '../models/Contract';

class ContractController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      cpf: Yup.string().required(),
      loan_value: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validação inválida, verifique campos obrigatórios' });
    }

    const { cpf } = req.body;

    const checkCPF = await Contract.findOne({ where: { cpf } });

    if (checkCPF) {
      return res.status(400).json({ error: 'CPF duplicado' });
    }

    const STATE = { CRIACAO: 1, UPLOAD: 2, FINALIZADO: 3 };

    const contract = await Contract.create({
      ...req.body,
      state: STATE.CRIACAO,
    });

    return res.json(contract);
  }

  async update(req, res) {
    let contract = await Contract.findByPk(req.params.id);

    contract = await contract.update(req.body);

    return res.json(contract);
  }
}

export default new ContractController();
