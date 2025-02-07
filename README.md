This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


ADICIONAR PRODUTO:

INSERT INTO produtos (nome, preco, tecido, imagens, mais_cores, descricao) VALUES ('Calcinha tanga com cós alto', 14.50, 'Poliester', 'https://instagram.fpoa2-1.fna.fbcdn.net/v/t51.29350-15/307689522_511444730815846_5109899221338697767_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fpoa2-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=8r1SKbaVBNoQ7kNvgH1NXe7&_nc_gid=d94b9996fc3646279fff1657a808567e&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MjkzNTkwMzc0OTY3Njg2MTM3MQ%3D%3D.3-ccb7-5&oh=00_AYDubyVmlwvZhgBAzBIwo3SakH5KyNQkVRgEcxtioCaoJQ&oe=67A6FEBB&_nc_sid=22de04,https://instagram.fpoa2-1.fna.fbcdn.net/v/t51.29350-15/308937337_191498016681855_2060667009262727899_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fpoa2-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=uz-FqwRtYBYQ7kNvgEq2Jm2&_nc_gid=d94b9996fc3646279fff1657a808567e&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MjkzNTkwMzc0OTY1MTYwNDc2Mg%3D%3D.3-ccb7-5&oh=00_AYB7hrTuBtel9ndiida39brByv5stnXFLfVnqgSEq-TPsw&oe=67A6D2FF&_nc_sid=22de04,https://instagram.fpoa2-1.fna.fbcdn.net/v/t51.29350-15/308821349_1984485818407470_2126551751933534575_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMjE5eDkxNC5zZHIuZjI5MzUwLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fpoa2-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=hPIjci4nBScQ7kNvgEuj-RA&_nc_gid=d94b9996fc3646279fff1657a808567e&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MjkzNTkwMzc0OTc2OTA4OTU1Ng%3D%3D.3-ccb7-5&oh=00_AYBsT2WCTDJC7p_Jvze5JZLUjPkuAdtMEBfBGlek4VrV7A&oe=67A702D0&_nc_sid=22de04,https://instagram.fpoa2-1.fna.fbcdn.net/v/t51.29350-15/308654527_642917400814266_4965297263534848358_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMjE5eDkxNC5zZHIuZjI5MzUwLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fpoa2-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=jkC1q26usbIQ7kNvgFWGDu3&_nc_gid=d94b9996fc3646279fff1657a808567e&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MjkzNTkwMzc0OTcxMDMxODM0Nw%3D%3D.3-ccb7-5&oh=00_AYAuffTZC3gV9JCS0BPKgFXzB3bjDjoN_qnSwVQJX7-JHg&oe=67A6CF4D&_nc_sid=22de04', 1, 'Segunda é dia de novidade! E você vai querer ver essa Calcinha tanga com cós alto. Ela está disponível em 3 cores: branco, preto e chocolate! E também oferecemos as calcinhas em tanga e fio nos tamanhos: M, G e GG. ');

ADICIONAR COR:

INSERT INTO cores (nome, hex) VALUES ('Branco', '#FFFFFF'), ('Preto', '#000000'), ('Chocolate', '#b09470');

ADICIONAR ESTOQUE:

INSERT INTO estoque_produto (produto_id, cor_id, tamanho_id, quantidade) VALUES (2, 4, 3, 25);

INSERT INTO estoque_produto (produto_id, cor_id, tamanho_id, quantidade) VALUES (2, 4, 3, 25), (2, 4, 4, 2), (2, 4, 5, 10), (2, 5, 3, 25), (2, 5, 4, 2), (2, 5, 5, 10), (2, 6, 3, 25), (2, 6, 4, 2), (2, 6, 5, 10);

DELTAR DE PRODUTOS:
DELETE FROM estoque_produto WHERE produto_id = 1; DELETE FROM comentarios WHERE produto_id = 1; DELETE FROM produtos WHERE id = 1;

SELECT p.nome
FROM produtos p
JOIN produto_estacao pe ON p.id = pe.produto_id
JOIN estacoes e ON pe.estacao_id = e.id
WHERE e.nome = 'Verão';


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
