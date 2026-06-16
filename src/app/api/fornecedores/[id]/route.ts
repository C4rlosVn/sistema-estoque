import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  nome: z.string().min(1).optional(),
  contato: z.string().optional(),
  telefone: z.string().optional(),
  email: z.string().email().optional(),
});

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const fornecedor = await prisma.fornecedor.update({ where: { id: Number(id) }, data: parsed.data });
  return NextResponse.json(fornecedor);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.fornecedor.delete({ where: { id: Number(id) } });
  return new NextResponse(null, { status: 204 });
}
