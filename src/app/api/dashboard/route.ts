import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [
    totalProdutos,
    totalCategorias,
    totalFornecedores,
    totalMovimentacoes,
    estoqueBaixo,
    valorEstoque,
    ultimasMovimentacoes,
  ] = await Promise.all([
    prisma.produto.count(),
    prisma.categoria.count(),
    prisma.fornecedor.count(),
    prisma.movimentacao.count(),
    prisma.produto.count({ where: { quantidade: { lte: prisma.produto.fields.quantidadeMin } } }),
    prisma.produto.aggregate({ _sum: { precoCusto: true } }),
    prisma.movimentacao.findMany({ take: 5, orderBy: { createdAt: "desc" }, include: { produto: { select: { nome: true } } } }),
  ]);

  return NextResponse.json({
    totalProdutos,
    totalCategorias,
    totalFornecedores,
    totalMovimentacoes,
    estoqueBaixo,
    valorEstoque: valorEstoque._sum.precoCusto ?? 0,
    ultimasMovimentacoes,
  });
}
