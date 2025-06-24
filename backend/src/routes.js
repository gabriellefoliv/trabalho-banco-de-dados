import { Router } from "express";
import fornecedorController from "./controllers/fornecedorController.js";

const routes = Router()

routes.post('/fornecedores', fornecedorController.criarFornecedor)
routes.get('/fornecedores', fornecedorController.buscarFornecedores)
routes.get('/fornecedores/diversidadeCategorias', fornecedorController.diversidadeEmCategorias)
routes.get('/fornecedores/premium', fornecedorController.fornecedoresPremium)
routes.patch('/fornecedores/contrato/:codFornecedor', fornecedorController.prolongarContratoFornecedor)

export default routes;