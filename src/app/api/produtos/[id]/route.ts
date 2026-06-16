import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  nome: z.string().min(1).optional(),
  descricao: z.string().optional(),
  codigoBarras: z.string().optional(),
  precoCusto: z.coerce.number().min(0).optional(),
  precoVenda: z.coerce.number().min(0).optional(),
  quantidade: z.coerce.number().int().min(0).optional(),
  quantidadeMin: z.coerce.number().int().min(0).optional(),
  categoriaId: z.coerce.number().int().positive().optional().nullable(),
  fornecedorId: z.coerce.number().int().positive().optional().nullable(),
});

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const produto = await prisma.produto.findUnique({ where: { id: Number(id) }, include: { categoria: true, fornecedor: true } });
  if (!produto) return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
  return NextResponse.json(produto);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const produto = await prisma.produto.update({ where: { id: Number(id) }, data: parsed.data });
  return NextResponse.json(produto);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.produto.delete({ where: { id: Number(id) } });
  return new NextResponse(null, { status: 204 });
}
