"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Fornecedor = { id: number; nome: string; contato?: string; telefone?: string; email?: string; _count: { produtos: number } };

export default function FornecedoresPage() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  useEffect(() => {
    fetch("/api/fornecedores").then((r) => r.json()).then(setFornecedores);
  }, []);

  async function excluir(id: number) {
    if (!confirm("Excluir este fornecedor?")) return;
    await fetch(`/api/fornecedores/${id}`, { method: "DELETE" });
    setFornecedores((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Fornecedores</h1>
        <Link href="/fornecedores/novo" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Novo Fornecedor
        </Link>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-700 text-slate-300 text-left">
            <tr>
              <th className="p-3">Nome</th>
              <th className="p-3">Contato</th>
              <th className="p-3">Telefone</th>
              <th className="p-3">Produtos</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {fornecedores.map((f) => (
              <tr key={f.id} className="border-t border-slate-700">
                <td className="p-3 font-medium">{f.nome}</td>
                <td className="p-3 text-slate-400">{f.contato ?? "—"}</td>
                <td className="p-3 text-slate-400">{f.telefone ?? "—"}</td>
                <td className="p-3 text-slate-400">{f._count.produtos}</td>
                <td className="p-3">
                  <button onClick={() => excluir(f.id)} className="text-red-400 hover:text-red-300 text-xs">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
