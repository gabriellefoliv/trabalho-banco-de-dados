"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { prorrogarContrato } from "@/lib/api"

export default function ProrrogarContratoModal({ fornecedor, onSuccess }: { fornecedor: any; onSuccess: () => void }) {
  const [quantidade, setQuantidade] = useState(1)
  const [unidade, setUnidade] = useState("MONTH")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await prorrogarContrato(fornecedor.codFornecedor, { quantidade, unidade })
      onSuccess()
    } catch (e) {
      alert("Erro ao prorrogar contrato")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Prorrogar contrato: {fornecedor.razaoSocial}</h2>
      <Input
        type="number"
        placeholder="Quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(Number(e.target.value))}
      />
      <Select value={unidade} onValueChange={setUnidade}>
        <SelectTrigger>
          <SelectValue placeholder="Unidade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="DAY">Dias</SelectItem>
          <SelectItem value="MONTH">Meses</SelectItem>
          <SelectItem value="YEAR">Anos</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleSubmit} disabled={loading} className="w-full">
        {loading ? "Prorrogando..." : "Prorrogar Contrato"}
      </Button>
    </div>
  )
}