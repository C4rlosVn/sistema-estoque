"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Mov = { id: number; tipo: string; quantidade: number; observacao?: string; produto: { nome: string }; createdAt: string };

export default function MovimentacoesPage() {
  const [mov, setMov] = useState<Mov[]>([]);

  useEffect(() => {
    fetch("/api/movimentacoes").then((r) => r.json()).then(setMov);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Movimentações</h1>
        <Link href="/movimentacoes/nova" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Nova Movimentação
        </Link>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-700 text-slate-300 text-left">
            <tr>
              <th className="p-3">Produto</th>
              <th className="p-3">Tipo</th>
              <th className="p-3">Quantidade</th>
              <th className="p-3">Observação</th>
              <th className="p-3">Data</th>
            </tr>
          </thead>
          <tbody>
            {mov.map((m) => (
              <tr key={m.id} className="border-t border-slate-700">
                <td className="p-3 font-medium">{m.produto.nome}</td>
                <td className={`p-3 font-medium ${m.tipo === "ENTRADA" ? "text-green-400" : "text-red-400"}`}>{m.tipo}</td>
                <td className="p-3">{m.quantidade}</td>
                <td className="p-3 text-slate-400">{m.observacao ?? "—"}</td>
                <td className="p-3 text-slate-400">{new Date(m.createdAt).toLocaleString("pt-BR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
