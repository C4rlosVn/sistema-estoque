import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  tipo: z.enum(["ENTRADA", "SAIDA"]),
  quantidade: z.coerce.number().int().positive(),
  observacao: z.string().optional(),
  produtoId: z.coerce.number().int().positive(),
});

export async function GET() {
  const movimentacoes = await prisma.movimentacao.findMany({
    include: { produto: { select: { nome: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json(movimentacoes);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const produto = await prisma.produto.findUnique({ where: { id: parsed.data.produtoId } });
  if (!produto) return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });

  const qtd = parsed.data.quantidade;
  if (parsed.data.tipo === "SAIDA" && produto.quantidade < qtd) {
    return NextResponse.json({ error: "Estoque insuficiente" }, { status: 400 });
  }

  const [movimentacao] = await prisma.$transaction([
    prisma.movimentacao.create({ data: parsed.data }),
    prisma.produto.update({
      where: { id: parsed.data.produtoId },
      data: { quantidade: parsed.data.tipo === "ENTRADA" ? { increment: qtd } : { decrement: qtd } },
    }),
  ]);

  return NextResponse.json(movimentacao, { status: 201 });
}
