import { Fragment, type ReactNode } from 'react';

/**
 * Renderizador markdown mínimo (subconjunto Obsidian) → React nodes.
 * Suporta: ## / ### títulos, listas "- ", citação "> " (callout crítico),
 * **negrito**, `código`, e backlinks [[...]].
 */

function renderInline(text: string, keyBase: string): ReactNode[] {
  // Quebra por tokens: **bold**, `code`, [[link]]
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[\[[^\]]+\]\])/g);
  return tokens.filter(Boolean).map((tok, i) => {
    const key = `${keyBase}-${i}`;
    if (tok.startsWith('**') && tok.endsWith('**')) {
      return <strong key={key}>{tok.slice(2, -2)}</strong>;
    }
    if (tok.startsWith('`') && tok.endsWith('`')) {
      return <code key={key}>{tok.slice(1, -1)}</code>;
    }
    if (tok.startsWith('[[') && tok.endsWith(']]')) {
      return (
        <a className="backlink" key={key} href="#" onClick={(e) => e.preventDefault()}>
          {tok.slice(2, -2)}
        </a>
      );
    }
    return <Fragment key={key}>{tok}</Fragment>;
  });
}

export function renderMarkdown(content: string): ReactNode[] {
  const lines = content.split('\n');
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  let quote: string[] = [];

  const flushList = (key: string) => {
    if (list.length === 0) return;
    const items = list;
    list = [];
    blocks.push(
      <ul key={key}>
        {items.map((it, i) => (
          <li key={`${key}-${i}`}>{renderInline(it, `${key}-${i}`)}</li>
        ))}
      </ul>,
    );
  };

  const flushQuote = (key: string) => {
    if (quote.length === 0) return;
    const items = quote;
    quote = [];
    blocks.push(
      <blockquote className="callout" key={key}>
        {items.map((q, i) => (
          <p key={`${key}-${i}`}>{renderInline(q, `${key}-${i}`)}</p>
        ))}
      </blockquote>,
    );
  };

  lines.forEach((raw, idx) => {
    const key = `b-${idx}`;
    const line = raw.trimEnd();

    if (line.startsWith('- ')) {
      flushQuote(key);
      list.push(line.slice(2));
      return;
    }
    flushList(key);

    if (line.startsWith('> ')) {
      quote.push(line.slice(2));
      return;
    }
    flushQuote(key);

    if (line.startsWith('### ')) {
      blocks.push(<h4 key={key}>{renderInline(line.slice(4), key)}</h4>);
    } else if (line.startsWith('## ')) {
      blocks.push(<h3 key={key}>{renderInline(line.slice(3), key)}</h3>);
    } else if (line.startsWith('# ')) {
      blocks.push(<h2 key={key}>{renderInline(line.slice(2), key)}</h2>);
    } else if (line.trim() === '') {
      // espaço entre blocos — ignorado (margens cuidam disso)
    } else {
      blocks.push(<p key={key}>{renderInline(line, key)}</p>);
    }
  });

  flushList('b-end-list');
  flushQuote('b-end-quote');
  return blocks;
}
