# Task Note

**Workspace de Precisão para times de alta performance.**

> 🚧 **Status:** projeto em desenvolvimento (*work in progress*).
> 🤖 **Como foi construído:** projeto de estudo em **desenvolvimento assistido por IA**, combinando **Google Stitch** (geração de design), **Figma MCP** (ponte design ↔ código) e **Claude** (implementação). O foco do estudo é dominar o fluxo de criação de software com ferramentas de IA e entender, a fundo, o código gerado.

Plataforma SaaS de produtividade com a estética _Obsidian Crimson_: tema dark com glassmorphism,
acento neon crimson e tipografia técnica (Geist + JetBrains Mono). Reproduz fielmente o design do
Figma e segue rigorosamente o Design System do projeto.

## Stack

- **React 18** + **TypeScript** (modo estrito, zero `any`)
- **Vite** 5
- **Redux Toolkit** + **React Redux** (slices tipados, selectors memoizados)
- **React Router DOM** v6 (rotas aninhadas com layout persistente)
- **Styled Components** (ThemeProvider + GlobalStyles, tema tipado)
- Persistência em **localStorage** (com seed inicial)

## Funcionalidades

- **Dashboard** — métricas, contagem regressiva em tempo real do prazo crítico, tabela de tarefas
  ativas com filtros/ordenação e painel de criação rápida.
- **Tarefas & Notas** — lista hierárquica (com subtarefas), editor de notas estilo Obsidian
  (toolbar, markdown leve, callouts, backlinks `[[...]]`) e painel de metadados editável.
- **Projetos & Timeline** — filtros por prioridade, saúde dos projetos (progresso radial),
  cards de projeto e gráfico Gantt derivado das datas.
- **Analytics** — taxa de sucesso, tempo médio, gráfico de tendência, mapa de prioridades,
  heatmap de execução e proporção de status. Todos os números são **derivados** do estado real.

Toda a interface é responsiva (drawer no mobile) e segue boas práticas de acessibilidade
(navegação por teclado, `aria-*`, foco visível, `aria-live` no countdown).

## Scripts

```bash
npm install      # instala dependências
npm run dev      # ambiente de desenvolvimento (http://localhost:5173)
npm run build    # build de produção (tsc + vite)
npm run preview  # serve o build
npm run typecheck
npm run lint
```

## Arquitetura

```
src/
├── app/          # App + inicialização do store
├── routes/       # definição de rotas (React Router)
├── pages/        # uma página por rota
├── components/   # layout, UI reutilizável e ícones
├── features/     # tasks, notes, projects, analytics, ui (slices + componentes)
├── hooks/        # hooks tipados (dispatch/selector) e useCountdown
├── services/     # persistência (localStorage)
├── store/        # configureStore, middleware, seed
├── styles/       # theme, GlobalStyles, mixins
├── types/        # modelo de domínio
└── utils/        # datas, ids, cálculos derivados
```

## Fontes oficiais do design

- `PRD.md` — regras de negócio
- `DESIGN_SYSTEM.md` — tokens (cores, tipografia, spacing, elevação)
- Figma — layout, espaçamento e estados visuais
