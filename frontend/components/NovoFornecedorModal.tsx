"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { criarFornecedor } from "@/lib/api"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"

export default function NovoFornecedorModal({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({ razaoSocial: "", cnpj: "", email: "", dataFim: "" })
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const finalForm = {
        ...form,
        dataFim: selectedDate ? format(selectedDate, "yyyy-MM-dd") : null,
      }
      await criarFornecedor(finalForm)
      onSuccess()
    } catch (e) {
      alert("Erro ao criar fornecedor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-sky-900">Cadastre um Fornecedor</h2>
      <Input
        placeholder="Razão Social"
        value={form.razaoSocial}
        onChange={(e) => setForm({ ...form, razaoSocial: e.target.value })}
      />
      <Input
        placeholder="CNPJ"
        value={form.cnpj}
        onChange={(e) => setForm({ ...form, cnpj: e.target.value })}
      />
      <Input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
          >
            {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Selecionar fim do contrato"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date)
              setCalendarOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
      <Button onClick={handleSubmit} disabled={loading} className="w-full">
        {loading ? "Criando..." : "Criar Fornecedor"}
      </Button>
    </div>
  )
}