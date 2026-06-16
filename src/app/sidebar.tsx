"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/produtos", label: "Produtos" },
  { href: "/categorias", label: "Categorias" },
  { href: "/fornecedores", label: "Fornecedores" },
  { href: "/movimentacoes", label: "Movimentações" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-slate-800 border-r border-slate-700 p-4 flex flex-col gap-1 shrink-0">
      <h2 className="text-lg font-bold mb-4 px-3">Sistema de Estoque</h2>
      {links.map((link) => {
        const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded-lg text-sm transition-colors ${
              active ? "bg-blue-600 text-white" : "hover:bg-slate-700 text-slate-300"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </aside>
  );
}
