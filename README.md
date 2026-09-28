# Essência de Mulher — Studio de Beleza

Site de apresentação e agendamento do studio, feito com React, TypeScript e Vite.

## Rodar localmente

Requer Node.js 20.19+ ou 22.12+ (compatível com Vite 8).

```bash
npm install
npm run dev
```

O Vite inicia o site em `http://localhost:3000`.

## Publicar na Vercel

1. Importe o repositório na Vercel.
2. Mantenha o framework em **Vite** (ou selecione **Other** se a detecção automática não ocorrer).
3. Use `npm run build` como comando de build e `dist` como diretório de saída. A Vercel detecta esses valores automaticamente para Vite.
4. Clique em **Deploy**.

O arquivo `vercel.json` encaminha as URLs das páginas para a aplicação, então rotas como `/servicos`, `/reserva`, `/agendamentos` e `/sobre` também funcionam quando abertas ou atualizadas diretamente.

Não são necessárias variáveis de ambiente para publicar este site.

## Comandos

- `npm run dev` — servidor local de desenvolvimento
- `npm run build` — gera o site estático em `dist`
- `npm run preview` — prévia local do build
- `npm run lint` — verifica os tipos TypeScript
