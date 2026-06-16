import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  nome: z.string().min(1),
  descricao: z.string().optional(),
  codigoBarras: z.string().optional(),
  precoCusto: z.coerce.number().min(0),
  precoVenda: z.coerce.number().min(0),
  quantidade: z.coerce.number().int().min(0),
  quantidadeMin: z.coerce.number().int().min(0).default(0),
  categoriaId: z.coerce.number().int().positive().optional().nullable(),
  fornecedorId: z.coerce.number().int().positive().optional().nullable(),
});

export async function GET() {
  const produtos = await prisma.produto.findMany({
    include: { categoria: true, fornecedor: true },
    orderBy: { nome: "asc" },
  });
  return NextResponse.json(produtos);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const produto = await prisma.produto.create({ data: parsed.data });
  return NextResponse.json(produto, { status: 201 });
}
