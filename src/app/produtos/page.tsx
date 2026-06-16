"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Produto = {
  id: number;
  nome: string;
  precoVenda: number;
  quantidade: number;
  quantidadeMin: number;
  categoria: { nome: string } | null;
};

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    fetch("/api/produtos").then((r) => r.json()).then(setProdutos);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <Link href="/produtos/novo" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Novo Produto
        </Link>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-700 text-slate-300 text-left">
            <tr>
              <th className="p-3">Nome</th>
              <th className="p-3">Categoria</th>
              <th className="p-3">Preço</th>
              <th className="p-3">Estoque</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id} className="border-t border-slate-700">
                <td className="p-3 font-medium">{p.nome}</td>
                <td className="p-3 text-slate-400">{p.categoria?.nome ?? "—"}</td>
                <td className="p-3">R$ {p.precoVenda.toFixed(2)}</td>
                <td className={`p-3 font-medium ${p.quantidade <= p.quantidadeMin ? "text-red-400" : "text-green-400"}`}>
                  {p.quantidade}
                  {p.quantidade <= p.quantidadeMin && " ⚠"}
                </td>
                <td className="p-3">
                  <Link href={`/produtos/${p.id}/editar`} className="text-blue-400 hover:text-blue-300 text-xs">
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
