import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  nome: z.string().min(1),
  contato: z.string().optional(),
  telefone: z.string().optional(),
  email: z.string().email().optional(),
});

export async function GET() {
  const fornecedores = await prisma.fornecedor.findMany({ include: { _count: { select: { produtos: true } } }, orderBy: { nome: "asc" } });
  return NextResponse.json(fornecedores);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const fornecedor = await prisma.fornecedor.create({ data: parsed.data });
  return NextResponse.json(fornecedor, { status: 201 });
}
