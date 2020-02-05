import { Router } from 'express';

import ContactControler from './app/controllers/ContactControler';

const routes = new Router();

routes.post('/contracts', ContactControler.store);

export default routes;
