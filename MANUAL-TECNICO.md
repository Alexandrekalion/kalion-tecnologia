# Manual Tecnico

## Projeto

- Nome: Kalion Tecnologia
- Stack: Next.js 16 + React 19 + TypeScript + App Router
- Estilo: site institucional futurista + painel administrativo oculto
- Base atual: arquivo JSON local

## Estrutura principal

### Site publico

- `/`
- `/sobre-nos`
- `/servicos`
- `/solucoes`
- `/projetos`
- `/projetos/[slug]`
- `/contato`

### Area administrativa

- `/sistema-kalion-x9`
- `/sistema-kalion-x9/painel`
- `/sistema-kalion-x9/painel/clientes`
- `/sistema-kalion-x9/painel/servicos`
- `/sistema-kalion-x9/painel/projetos`
- `/sistema-kalion-x9/painel/orcamentos`
- `/sistema-kalion-x9/painel/pedidos`
- `/sistema-kalion-x9/painel/garantias`
- `/sistema-kalion-x9/painel/relatorios`
- `/sistema-kalion-x9/painel/configuracoes`
- `/sistema-kalion-x9/painel/backup`

## Credenciais administrativas

As credenciais devem ser definidas por variaveis de ambiente:

- `ADMIN_USER`
- `ADMIN_PASSWORD`

Arquivo base:

- [src/lib/auth.ts](src/lib/auth.ts)

## Instalacao local

```powershell
npm install
npm run dev
```

Validacao:

```powershell
npm run lint
npm run build
```

## Banco de dados

O sistema usa um banco local em JSON:

- [data/kalion-db.json](data/kalion-db.json)

Colecoes atuais:

- `settings`
- `users`
- `clients`
- `services`
- `projects`
- `budgets`
- `orders`
- `warranties`
- `leads`

## Configuracoes editaveis pelo painel

Pagina:

- [src/app/sistema-kalion-x9/painel/configuracoes/page.tsx](src/app/sistema-kalion-x9/painel/configuracoes/page.tsx)

Salva por:

- [src/app/api/admin/settings/route.ts](src/app/api/admin/settings/route.ts)

Reflete no site publico por:

- [src/lib/public-settings.ts](src/lib/public-settings.ts)

## Gestao de projetos

Pagina admin:

- [src/app/sistema-kalion-x9/painel/projetos/page.tsx](src/app/sistema-kalion-x9/painel/projetos/page.tsx)

Campos:

- nome
- categoria
- imagem de capa
- tecnologias
- resumo
- descricao completa
- link externo
- video
- destaque

Upload:

- [src/app/api/admin/upload/route.ts](src/app/api/admin/upload/route.ts)

Arquivos enviados:

- `public/uploads/projects`

## CRUD administrativo

Rotas genericas:

- [src/app/api/admin/[resource]/route.ts](src/app/api/admin/[resource]/route.ts)
- [src/app/api/admin/[resource]/[id]/route.ts](src/app/api/admin/[resource]/[id]/route.ts)

## PDFs

Componente principal:

- [src/components/admin/document-manager.tsx](src/components/admin/document-manager.tsx)

Tipos:

- orcamento
- pedido
- garantia

## Formulario de contato

- [src/components/contact-form.tsx](src/components/contact-form.tsx)
- [src/app/api/contact/route.ts](src/app/api/contact/route.ts)

SMTP esperado:

```env
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
```

## Protecao da area admin

- [src/lib/auth.ts](src/lib/auth.ts)
- [src/proxy.ts](src/proxy.ts)
- [src/app/api/admin/login/route.ts](src/app/api/admin/login/route.ts)
- [src/app/api/admin/logout/route.ts](src/app/api/admin/logout/route.ts)

## Backup

Backup atual:

- copiar [data/kalion-db.json](data/kalion-db.json)

## SEO

- [src/app/robots.ts](src/app/robots.ts)
- [src/app/sitemap.ts](src/app/sitemap.ts)

## Publicacao

- Dominio previsto: `kaliontecnologia.com.br`
- Requer ambiente com Node.js

Itens obrigatorios:

- dominio configurado
- SSL ativo
- variaveis de ambiente do admin
- variaveis SMTP

## Correcao aplicada em producao para uploads

Problema observado:

- o arquivo era salvo no servidor
- o caminho era salvo no banco
- a URL publica da imagem retornava erro

Causas identificadas:

1. permissao incorreta na pasta `public`
2. configuracao incorreta do Nginx para servir `/uploads`
3. cache local apos alteracoes

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

Validacao:

```bash
sudo nginx -t
sudo systemctl reload nginx
curl -I -H "Host: kaliontecnologia.com.br" http://127.0.0.1/uploads/projects/ARQUIVO.png
curl -I http://127.0.0.1:3000
curl -I http://127.0.0.1
```

Observacao importante:

- em producao, `/uploads` deve ser servido diretamente pelo `Nginx`
- isso reduz erro de rota e deixa os arquivos enviados pelo painel mais estaveis

Arquivo exemplo:

- [deploy/nginx/kaliontecnologia.conf](deploy/nginx/kaliontecnologia.conf)

## Pastas importantes

- [src/app](src/app)
- [src/components](src/components)
- [src/lib](src/lib)
- [public](public)
- [data](data)

## Melhorias futuras recomendadas

1. Migrar de JSON para banco relacional.
2. Criar backup real pelo painel.
3. Implementar multiplos usuarios.
4. Adicionar logs administrativos.
5. Permitir embed de video.
6. Criar painel de midia.
7. Consolidar deploy definitivo com HTTPS e uploads servidos pelo Nginx.
