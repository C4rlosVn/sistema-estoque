"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Categoria = { id: number; nome: string };
type Fornecedor = { id: number; nome: string };

export default function NovoProdutoPage() {
  const router = useRouter();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  useEffect(() => {
    fetch("/api/categorias").then((r) => r.json()).then(setCategorias);
    fetch("/api/fornecedores").then((r) => r.json()).then(setFornecedores);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form);
    const res = await fetch("/api/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: data.nome,
        descricao: data.descricao || undefined,
        codigoBarras: data.codigoBarras || undefined,
        precoCusto: Number(data.precoCusto),
        precoVenda: Number(data.precoVenda),
        quantidade: Number(data.quantidade),
        quantidadeMin: Number(data.quantidadeMin) || 0,
        categoriaId: data.categoriaId ? Number(data.categoriaId) : null,
        fornecedorId: data.fornecedorId ? Number(data.fornecedorId) : null,
      }),
    });
    if (res.ok) router.push("/produtos");
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Novo Produto</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="nome" placeholder="Nome do produto" required className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input name="descricao" placeholder="Descrição (opcional)" className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input name="codigoBarras" placeholder="Código de barras (opcional)" className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <div className="grid grid-cols-2 gap-4">
          <input name="precoCusto" type="number" step="0.01" placeholder="Preço de custo" required className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input name="precoVenda" type="number" step="0.01" placeholder="Preço de venda" required className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input name="quantidade" type="number" placeholder="Quantidade" required className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input name="quantidadeMin" type="number" placeholder="Qtd. mínima" defaultValue="0" className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <select name="categoriaId" className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Sem categoria</option>
          {categorias.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
        </select>
        <select name="fornecedorId" className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Sem fornecedor</option>
          {fornecedores.map((f) => <option key={f.id} value={f.id}>{f.nome}</option>)}
        </select>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors mt-2">
          Salvar
        </button>
      </form>
    </div>
  );
}
