"use client";

import { useEffect, useState } from "react";

type Dashboard = {
  totalProdutos: number;
  totalCategorias: number;
  totalFornecedores: number;
  totalMovimentacoes: number;
  estoqueBaixo: number;
  valorEstoque: number;
  ultimasMovimentacoes: { id: number; tipo: string; quantidade: number; produto: { nome: string }; createdAt: string }[];
};

export default function Home() {
  const [data, setData] = useState<Dashboard | null>(null);

  useEffect(() => {
    fetch("/api/dashboard").then((r) => r.json()).then(setData);
  }, []);

  if (!data) return <p className="text-slate-400">Carregando...</p>;

  const cards = [
    { label: "Produtos", value: data.totalProdutos, color: "bg-blue-600" },
    { label: "Categorias", value: data.totalCategorias, color: "bg-green-600" },
    { label: "Fornecedores", value: data.totalFornecedores, color: "bg-purple-600" },
    { label: "Movimentações", value: data.totalMovimentacoes, color: "bg-orange-600" },
    { label: "Estoque Baixo", value: data.estoqueBaixo, color: "bg-red-600" },
    { label: "Valor em Estoque", value: `R$ ${data.valorEstoque.toFixed(2)}`, color: "bg-teal-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className={`${card.color} rounded-xl p-5`}>
            <p className="text-sm opacity-80">{card.label}</p>
            <p className="text-3xl font-bold mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-3">Últimas Movimentações</h2>
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-700 text-slate-300 text-left">
            <tr>
              <th className="p-3">Produto</th>
              <th className="p-3">Tipo</th>
              <th className="p-3">Qtd</th>
              <th className="p-3">Data</th>
            </tr>
          </thead>
          <tbody>
            {data.ultimasMovimentacoes.map((m) => (
              <tr key={m.id} className="border-t border-slate-700">
                <td className="p-3">{m.produto.nome}</td>
                <td className={`p-3 font-medium ${m.tipo === "ENTRADA" ? "text-green-400" : "text-red-400"}`}>{m.tipo}</td>
                <td className="p-3">{m.quantidade}</td>
                <td className="p-3 text-slate-400">{new Date(m.createdAt).toLocaleString("pt-BR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
