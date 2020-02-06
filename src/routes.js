import { Router } from 'express';

import ContractControler from './app/controllers/ContractControler';

const routes = new Router();

routes.post('/contracts', ContractControler.store);

routes.put('/contracts/:id', ContractControler.update);

export default routes;
