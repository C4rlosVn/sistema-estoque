"use client";

import { useRouter } from "next/navigation";

export default function NovaCategoriaPage() {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/categorias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: form.get("nome") }),
    });
    if (res.ok) router.push("/categorias");
  }

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-6">Nova Categoria</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="nome" placeholder="Nome da categoria" required className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
          Salvar
        </button>
      </form>
    </div>
  );
}
