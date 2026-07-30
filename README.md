# Kalion Tecnologia

Site institucional e painel administrativo da Kalion Tecnologia, desenvolvido com `Next.js 16`, `React 19`, `TypeScript` e `App Router`.

> Status: em revisao para organizacao profissional e saneamento de dados sensiveis.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- jsPDF
- JSON local como base inicial de dados

## Ambientes

- Site publico: `/`
- Admin oculto: `/sistema-kalion-x9`

## Configuracao

Use `.env.example` como base e defina credenciais reais somente no ambiente seguro:

```bash
ADMIN_USER=...
ADMIN_PASSWORD=...
```

## Execucao local

```bash
npm install
npm run dev
```

Validacao:

```bash
npm run lint
npm run build
```

## Seguranca

Nao versionar `.env`, senhas, tokens, dados reais de clientes, leads, orcamentos, uploads ou backups. Veja [SECURITY.md](SECURITY.md) e [docs/security-audit.md](docs/security-audit.md).

## Uploads e imagens em producao

As imagens enviadas pelo painel sao gravadas em:

- `public/uploads/projects`

Em producao, o ideal e servir `/uploads/` diretamente pelo Nginx.

Permissoes recomendadas no servidor:

```bash
sudo chmod 755 /var/www/kaliontecnologia/public
sudo chmod -R 755 /var/www/kaliontecnologia/public/uploads
sudo chown -R www-data:www-data /var/www/kaliontecnologia/public/uploads
```

Configuracao recomendada do Nginx:

```nginx
location ^~ /uploads/ {
    root /var/www/kaliontecnologia/public;
    access_log off;
    expires 30d;
    add_header Cache-Control "public";
    try_files $uri =404;
}
```

Arquivo exemplo completo:

- [deploy/nginx/kaliontecnologia.conf](deploy/nginx/kaliontecnologia.conf)

## Deploy

Este projeto exige ambiente com `Node.js` em producao.

Fluxo resumido:

```bash
npm install
npm run build
pm2 start npm --name kalion -- start
```

## Documentacao tecnica

- [MANUAL-TECNICO.md](MANUAL-TECNICO.md)

## Licenca

Projeto proprietario. Todos os direitos reservados.
