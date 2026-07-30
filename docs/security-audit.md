# Auditoria de seguranca preliminar

Data: 2026-07-30

| Item | Severidade | Acao nesta branch |
|---|---:|---|
| Senha admin hardcoded em codigo e README | Alta | Removida; credenciais exigidas por ambiente |
| Dados reais/pessoais em `data/kalion-db.json` | Alta | Substituidos por dataset demonstrativo |
| Uploads e backups sem cobertura explicita | Media | `.gitignore` reforcado |

## Pendencias

- Limpar historico Git antigo se os dados/credenciais ja estiverem publicados.
- Confirmar se o repositorio deve permanecer publico.
- Rotacionar a credencial administrativa antiga.
- Definir estrategia de banco/armazenamento para producao.
