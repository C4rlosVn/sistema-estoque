import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({ nome: z.string().min(1) });

export async function GET() {
  const categorias = await prisma.categoria.findMany({ include: { _count: { select: { produtos: true } } }, orderBy: { nome: "asc" } });
  return NextResponse.json(categorias);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const categoria = await prisma.categoria.create({ data: parsed.data });
  return NextResponse.json(categoria, { status: 201 });
}
