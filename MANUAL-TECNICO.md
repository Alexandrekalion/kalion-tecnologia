# Manual Técnico

## Projeto

**Nome:** Kalion Tecnologia  
**Stack:** Next.js 16 + React 19 + TypeScript + App Router  
**Estilo:** site institucional futurista + painel administrativo oculto  
**Base de dados atual:** arquivo JSON local

---

## Estrutura principal

### Site público

- `/` Home
- `/sobre-nos`
- `/servicos`
- `/solucoes`
- `/projetos`
- `/projetos/[slug]`
- `/contato`

### Área administrativa

- `/sistema-kalion-x9` login
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

---

## Credenciais de acesso

### Admin atual

- **Usuário:** `administrador`
- **Senha:** `LR1a2b3c4567@`

As credenciais ficam configuradas em:

- [src/lib/auth.ts](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\src\lib\auth.ts)
- [.env.example](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\.env.example)

Em produção, o ideal é usar variáveis de ambiente reais:

```env
ADMIN_USER=administrador
ADMIN_PASSWORD=LR1a2b3c4567@
```

---

## Instalação local

Na pasta do projeto:

```powershell
npm install
npm run dev
```

Abrir no navegador:

- Site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/sistema-kalion-x9](http://localhost:3000/sistema-kalion-x9)

Validação:

```powershell
npm run lint
npm run build
```

---

## Banco de dados

Hoje o sistema usa um banco local em JSON:

- [data/kalion-db.json](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\data\kalion-db.json)

Esse arquivo guarda:

- `settings`
- `users`
- `clients`
- `services`
- `projects`
- `budgets`
- `orders`
- `warranties`
- `leads`

### Observação importante

Esse modelo é ótimo para implantação rápida e uso inicial, mas para crescimento maior o ideal é migrar para banco relacional.

---

## Configurações editáveis pelo painel

A página:

- [src/app/sistema-kalion-x9/painel/configuracoes/page.tsx](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\src\app\sistema-kalion-x9\painel\configuracoes\page.tsx)

permite editar:

- nome da empresa
- slogan
- e-mail
- telefone
- WhatsApp
- LinkedIn
- endereço
- CNPJ

Esses dados são salvos por:

- [src/app/api/admin/settings/route.ts](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\src\app\api\admin\settings\route.ts)

e refletidos no site público por:

- [src/lib/public-settings.ts](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\src\lib\public-settings.ts)

---

## Gestão de projetos

O cadastro de projetos fica em:

- [src/app/sistema-kalion-x9/painel/projetos/page.tsx](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\src\app\sistema-kalion-x9\painel\projetos\page.tsx)

### Campos disponíveis

- nome
- categoria
- imagem de capa
- tecnologias
- resumo
- descrição completa
- link externo
- vídeo
- destaque

### Upload de mídia

Foi implementado upload real de:

- imagem
- vídeo

API:

- [src/app/api/admin/upload/route.ts](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\src\app\api\admin\upload\route.ts)

Os arquivos enviados ficam em:

- `public/uploads/projects`

---

## CRUD administrativo

O painel utiliza rotas genéricas para cadastro, edição e exclusão:

- [src/app/api/admin/[resource]/route.ts](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\src\app\api\admin\[resource]\route.ts)
- [src/app/api/admin/[resource]/[id]/route.ts](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\src\app\api\admin\[resource]\[id]\route.ts)

Recursos suportados:

- clientes
- serviços
- projetos
- orçamentos
- pedidos
- garantias
- usuários

---

## PDFs

Os PDFs são gerados no painel em:

- [src/components/admin/document-manager.tsx](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\src\components\admin\document-manager.tsx)

### Tipos suportados

- orçamento
- pedido
- garantia

### Características

- layout visual próprio por tipo
- cabeçalho colorido
- blocos de dados do cliente e do documento
- tabela de itens
- total/resumo
- rodapé com identidade Kalion

### Observação

Os PDFs são gerados no navegador via `jsPDF`.

---

## Formulário de contato

O formulário público usa:

- [src/components/contact-form.tsx](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\src\components\contact-form.tsx)
- [src/app/api/contact/route.ts](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\src\app\api\contact\route.ts)

Para envio real por e-mail, configurar:

```env
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
```

---

## Proteção da área admin

O acesso ao painel é controlado por cookie de sessão:

- [src/lib/auth.ts](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\src\lib\auth.ts)

Proteção de rota:

- [src/proxy.ts](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\src\proxy.ts)

Login/logout:

- [src/app/api/admin/login/route.ts](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\src\app\api\admin\login\route.ts)
- [src/app/api/admin/logout/route.ts](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\src\app\api\admin\logout\route.ts)

---

## Backup

O backup atual é baseado no arquivo:

- [data/kalion-db.json](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\data\kalion-db.json)

### Backup manual

Copiar esse arquivo já preserva:

- configurações
- clientes
- serviços
- projetos
- documentos
- leads

### Restauração manual

Substituir o `kalion-db.json` pelo arquivo salvo.

### Situação atual

O módulo de backup ainda é simples e pode evoluir para:

- exportar backup pelo painel
- importar backup pelo painel
- histórico de versões

---

## SEO e indexação

Arquivos:

- [src/app/robots.ts](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\src\app\robots.ts)
- [src/app/sitemap.ts](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\src\app\sitemap.ts)

---

## Publicação

### Domínio previsto

- `kaliontecnologia.com.br`

### Requisito de hospedagem

Este projeto é **Next.js com Node.js**, então a hospedagem precisa suportar aplicação Node.

Se a hospedagem for apenas HTML/PHP tradicional, não roda corretamente sem adaptação.

### Itens obrigatórios para produção

- domínio configurado
- SSL ativo
- variáveis de ambiente do admin
- variáveis SMTP

---

## Pastas importantes

- [src/app](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\src\app)
- [src/components](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\src\components)
- [src/lib](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\src\lib)
- [public](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\public)
- [data](C:\Users\alexandre_santos\Documents\kalion-tecnologia-02\data)

---

## Melhorias futuras recomendadas

1. Migrar de JSON para banco relacional.
2. Criar backup/exportação/importação real pelo painel.
3. Implementar múltiplos usuários com permissões.
4. Adicionar logs administrativos.
5. Permitir embed de vídeo YouTube/Vimeo além de upload.
6. Criar painel de mídia para gerenciar imagens e vídeos.
7. Preparar deploy definitivo para ambiente de produção.
