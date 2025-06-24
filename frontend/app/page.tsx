'use client'

import { useEffect, useState } from "react";
import FornecedorLista from "@/components/FornecedorLista";
import NovoFornecedorModal from "@/components/NovoFornecedorModal";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { buscarFornecedores, diversidadeCategorias, fornecedoresPremium } from "@/lib/api";
import ProrrogarContratoModal from "@/components/ProrrogarContratoModal";

export default function Home() {
  const [fornecedores, setFornecedores] = useState([])
  const [selectedFornecedor, setSelectedFornecedor] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [filtroDescricao, setFiltroDescricao] = useState("")

  const carregarFornecedores = async () => {
    const res = await buscarFornecedores()
    setFornecedores(res.data)
    setFiltroDescricao("")
  }

  useEffect(() => {
    carregarFornecedores()
  }, [refresh])

  const handlePremium = async () => {
    const res = await fornecedoresPremium()
    setFornecedores(res.data)
    setFiltroDescricao("Exibindo apenas fornecedores premium com custo médio superior a R$ 50 e alocação em 2 ou mais produtos.")
  }

  const handleDiversidade = async () => {
    const res = await diversidadeCategorias()
    setFornecedores(res.data)
    setFiltroDescricao("Exibindo fornecedores ativos com diversidade em categorias de matéria-prima (3 ou mais).")
  }

  return (
    <div className="p-6 max-w-2xl mx-auto flex flex-col justify-center bg-white rounded-lg shadow-md">
      <div className="flex flex-col justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Fornecedores</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={carregarFornecedores}>
            Todos
          </Button>
          <Button variant="outline" onClick={handlePremium}>
            Fornecedores Premium
          </Button>
          <Button variant="outline" onClick={handleDiversidade}>
            Diversidade em Categoria
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <DialogTitle>
                <Button>+ Novo Fornecedor</Button>
              </DialogTitle>
            </DialogTrigger>
            <DialogContent>
              <NovoFornecedorModal onSuccess={() => setRefresh(!refresh)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {filtroDescricao && (
        <div className="text-sm text-sky-700 bg-sky-50 border border-sky-200 rounded-md p-3 mb-4">
          {filtroDescricao}
        </div>
      )}

      <FornecedorLista
        fornecedores={fornecedores}
        onProrrogar={(fornecedor) => setSelectedFornecedor(fornecedor)}
      />

      {selectedFornecedor && (
        <Dialog open={!!selectedFornecedor} onOpenChange={() => setSelectedFornecedor(null)}>
          <DialogTitle>Prorrogar Contrato</DialogTitle>
          <DialogContent>
            <ProrrogarContratoModal
              fornecedor={selectedFornecedor}
              onSuccess={() => {
                setRefresh(!refresh)
                setSelectedFornecedor(null)
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
