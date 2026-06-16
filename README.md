# Sistema de Estoque

Sistema completo de gestão de estoque com controle de produtos, categorias, fornecedores e movimentações.

### Funcionalidades

- Cadastro de produtos com preço de custo/venda
- Categorias e fornecedores
- Controle de entrada e saída de estoque
- Dashboard com indicadores
- Alerta de estoque baixo
- Validação de saldo (impede saída sem estoque)

### Tecnologias

Next.js 15, Prisma 6, SQLite, Tailwind CSS 4, TS, Zod.

### Como usar

```bash
npm install
npx prisma migrate dev
npm run db:seed
npm run dev
```
