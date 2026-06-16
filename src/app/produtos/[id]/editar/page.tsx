"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

type Categoria = { id: number; nome: string };
type Fornecedor = { id: number; nome: string };
type Produto = { id: number; nome: string; descricao?: string; codigoBarras?: string; precoCusto: number; precoVenda: number; quantidade: number; quantidadeMin: number; categoriaId?: number | null; fornecedorId?: number | null };

export default function EditarProdutoPage() {
  const router = useRouter();
  const params = useParams();
  const [produto, setProduto] = useState<Produto | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  useEffect(() => {
    fetch(`/api/produtos/${params.id}`).then((r) => r.json()).then(setProduto);
    fetch("/api/categorias").then((r) => r.json()).then(setCategorias);
    fetch("/api/fornecedores").then((r) => r.json()).then(setFornecedores);
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form);
    const res = await fetch(`/api/produtos/${params.id}`, {
      method: "PUT",
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

  if (!produto) return <p className="text-slate-400">Carregando...</p>;

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Editar Produto</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="nome" defaultValue={produto.nome} required className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input name="descricao" defaultValue={produto.descricao ?? ""} className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input name="codigoBarras" defaultValue={produto.codigoBarras ?? ""} className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <div className="grid grid-cols-2 gap-4">
          <input name="precoCusto" type="number" step="0.01" defaultValue={produto.precoCusto} required className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input name="precoVenda" type="number" step="0.01" defaultValue={produto.precoVenda} required className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input name="quantidade" type="number" defaultValue={produto.quantidade} required className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input name="quantidadeMin" type="number" defaultValue={produto.quantidadeMin} className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <select name="categoriaId" defaultValue={produto.categoriaId ?? ""} className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Sem categoria</option>
          {categorias.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
        </select>
        <select name="fornecedorId" defaultValue={produto.fornecedorId ?? ""} className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
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
