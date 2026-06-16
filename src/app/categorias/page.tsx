"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Categoria = { id: number; nome: string; _count: { produtos: number } };

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    fetch("/api/categorias").then((r) => r.json()).then(setCategorias);
  }, []);

  async function excluir(id: number) {
    if (!confirm("Excluir esta categoria?")) return;
    await fetch(`/api/categorias/${id}`, { method: "DELETE" });
    setCategorias((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categorias</h1>
        <Link href="/categorias/nova" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Nova Categoria
        </Link>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-700 text-slate-300 text-left">
            <tr>
              <th className="p-3">Nome</th>
              <th className="p-3">Produtos</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((c) => (
              <tr key={c.id} className="border-t border-slate-700">
                <td className="p-3 font-medium">{c.nome}</td>
                <td className="p-3 text-slate-400">{c._count.produtos}</td>
                <td className="p-3">
                  <button onClick={() => excluir(c.id)} className="text-red-400 hover:text-red-300 text-xs">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
