
"use client"

import { Button } from "@/components/ui/button"
import { format, parseISO } from "date-fns"

function formatarData(data?: string) {
  if (!data) return "Indefinido"
  try {
    return format(parseISO(data), "dd/MM/yyyy")
  } catch {
    return data
  }
}

export default function FornecedorLista({
  fornecedores,
  onProrrogar,
}: {
  fornecedores: any[]
  onProrrogar: (f: any) => void
}) {
  return (
    <div className="flex flex-col gap-4">
      {fornecedores.map((f, index) => (
        <div
          key={f.codFornecedor ?? index}
          className="bg-white border border-sky-100 shadow-sm rounded-2xl p-4 hover:shadow-md transition-shadow"
        >
          <h2 className="text-lg font-semibold text-sky-700">{f.razaoSocial}</h2>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-800">CNPJ:</span> {f.cnpj}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-800">Email:</span> {f.email}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-800">Início do contrato:</span>{" "}
            {formatarData(f.dataIni)}
          </p>
          <p className="text-sm text-gray-600 mb-3">
            <span className="font-medium text-gray-800">Fim do contrato:</span>{" "}
            {f.dataFim ? formatarData(f.dataFim) : "Ativo"}
          </p>

          <Button
            variant="outline"
            className="w-full border-sky-500 text-sky-600 hover:bg-sky-50"
            onClick={() => onProrrogar(f)}
          >
            Prorrogar Contrato
          </Button>
        </div>
      ))}
    </div>
  )
}
