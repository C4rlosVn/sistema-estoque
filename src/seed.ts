import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const cats = await Promise.all([
    prisma.categoria.create({ data: { nome: "Eletrônicos" } }),
    prisma.categoria.create({ data: { nome: "Limpeza" } }),
    prisma.categoria.create({ data: { nome: "Escritório" } }),
    prisma.categoria.create({ data: { nome: "Alimentício" } }),
  ]);

  const forn = await Promise.all([
    prisma.fornecedor.create({ data: { nome: "Distribuidora ABC", contato: "João", telefone: "(11) 99999-0001" } }),
    prisma.fornecedor.create({ data: { nome: "Fornecedora XYZ", contato: "Maria", email: "maria@xyz.com" } }),
  ]);

  await Promise.all([
    prisma.produto.create({ data: { nome: "Mouse Óptico", precoCusto: 25, precoVenda: 49.9, quantidade: 50, quantidadeMin: 10, categoriaId: cats[0].id, fornecedorId: forn[0].id } }),
    prisma.produto.create({ data: { nome: "Teclado Mecânico", precoCusto: 80, precoVenda: 149.9, quantidade: 30, quantidadeMin: 5, categoriaId: cats[0].id, fornecedorId: forn[0].id } }),
    prisma.produto.create({ data: { nome: "Detergente", precoCusto: 2, precoVenda: 4.5, quantidade: 200, quantidadeMin: 50, categoriaId: cats[1].id, fornecedorId: forn[1].id } }),
    prisma.produto.create({ data: { nome: "Papel A4 (500fl)", precoCusto: 15, precoVenda: 29.9, quantidade: 100, quantidadeMin: 20, categoriaId: cats[2].id } }),
    prisma.produto.create({ data: { nome: "Café em Pó 500g", precoCusto: 12, precoVenda: 22.9, quantidade: 3, quantidadeMin: 15, categoriaId: cats[3].id } }),
  ]);

  console.log("Seed concluído com sucesso!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
