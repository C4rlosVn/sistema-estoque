"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Produto = { id: number; nome: string };

export default function NovaMovimentacaoPage() {
  const router = useRouter();
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    fetch("/api/produtos").then((r) => r.json()).then(setProdutos);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      tipo: form.get("tipo"),
      quantidade: Number(form.get("quantidade")),
      observacao: (form.get("observacao") as string) || undefined,
      produtoId: Number(form.get("produtoId")),
    };
    const res = await fetch("/api/movimentacoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) router.push("/movimentacoes");
    else {
      const err = await res.json();
      alert(err.error || "Erro ao registrar");
    }
  }

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-6">Nova Movimentação</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select name="tipo" required className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Selecione o tipo</option>
          <option value="ENTRADA">Entrada</option>
          <option value="SAIDA">Saída</option>
        </select>
        <select name="produtoId" required className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Selecione o produto</option>
          {produtos.map((p) => <option key={p.id} value={p.id}>{p.nome}</option>)}
        </select>
        <input name="quantidade" type="number" placeholder="Quantidade" required className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input name="observacao" placeholder="Observação (opcional)" className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
          Registrar
        </button>
      </form>
    </div>
  );
}
