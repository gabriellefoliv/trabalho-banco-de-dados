import { Router } from "express";
import fornecedorController from "./controllers/fornecedorController.js";

const routes = Router()

routes.post('/fornecedores', fornecedorController.create)

export default routes;