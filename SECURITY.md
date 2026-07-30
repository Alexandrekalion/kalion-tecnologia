# Politica de seguranca

## Dados que nao devem ser versionados

- Arquivos `.env` reais.
- Senhas, tokens e credenciais administrativas.
- Dados reais de clientes, leads, documentos, enderecos, telefones ou orcamentos.
- Uploads enviados pelo painel administrativo.
- Backups e bancos locais de producao.

## Configuracao

Use `.env.example` como modelo e defina `ADMIN_USER` e `ADMIN_PASSWORD` no ambiente de deploy.

## Pendencias conhecidas

- A branch remove dados sensiveis do conteudo atual, mas nao limpa historico Git antigo.
- Revisar se o repositorio deve continuar publico antes de qualquer merge.
- Rotacionar a senha administrativa antiga caso tenha sido usada em qualquer ambiente real.
