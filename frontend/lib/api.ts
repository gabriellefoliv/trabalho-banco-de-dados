import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000", // ajuste conforme seu backend
})

import { AxiosResponse } from "axios"

export const buscarFornecedores = (): Promise<AxiosResponse<any>> => api.get("/fornecedores")
export const criarFornecedor = (data: any) => api.post("/fornecedores", data)
export const fornecedoresPremium = () => api.get("/fornecedores/premium")
export const diversidadeCategorias = () => api.get("/fornecedores/diversidadeCategorias")
export const prorrogarContrato = (id: any, data: any) => api.patch(`/fornecedores/contrato/${id}`, data)
