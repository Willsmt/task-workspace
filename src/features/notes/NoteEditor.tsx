import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import type { Note } from '@/types/domain';
import { IconButton } from '@/components/ui/IconButton';
import { Button } from '@/components/ui/Button';
import { IconBold, IconItalic, IconUnderline, IconList, IconLink, IconNotes } from '@/components/icons';
import { renderMarkdown } from './renderMarkdown';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { updateNoteContent, updateNoteTitle } from './notesSlice';
import { formatDateTime } from '@/utils/date';
import { customScrollbar } from '@/styles/mixins';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px ${({ theme }) => theme.space.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;
`;

const Divider = styled.span`
  width: 1px;
  height: 18px;
  margin: 0 6px;
  background: ${({ theme }) => theme.colors.border};
`;

const HBtn = styled(IconButton).attrs({ $size: 32 })`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 12px;
  font-weight: 600;
`;

const Right = styled.div`
  margin-left: auto;
  display: flex;
  gap: 6px;
`;

const Scroller = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: ${({ theme }) => theme.space.lg};
  ${customScrollbar};
`;

const TitleInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 6px;

  &:focus {
    outline: none;
  }
`;

const EditedAt = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 11px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.onSurfaceFaint};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const Doc = styled.article`
  font-size: 15px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.onSurface};

  h2 {
    font-size: 22px;
    margin: 24px 0 12px;
  }
  h3 {
    font-size: 18px;
    margin: 22px 0 10px;
  }
  h4 {
    font-size: 15px;
    margin: 18px 0 8px;
    color: ${({ theme }) => theme.colors.onSurfaceVariant};
  }
  p {
    margin: 0 0 14px;
    color: ${({ theme }) => theme.colors.onSurfaceVariant};
  }
  ul {
    margin: 0 0 14px;
    padding-left: 22px;
  }
  li {
    margin-bottom: 6px;
    color: ${({ theme }) => theme.colors.onSurfaceVariant};
  }
  strong {
    color: ${({ theme }) => theme.colors.onSurface};
    font-weight: 600;
  }
  code {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 13px;
    padding: 2px 6px;
    border-radius: ${({ theme }) => theme.radius.base};
    background: ${({ theme }) => theme.colors.surfaceContainerLow};
    color: ${({ theme }) => theme.colors.primary};
  }
  .backlink {
    color: ${({ theme }) => theme.colors.inProgress};
    border-bottom: 1px dashed currentColor;
    font-weight: 500;
  }
  .callout {
    margin: 18px 0;
    padding: 14px 16px;
    border: 1px solid ${({ theme }) => theme.tint.urgentBorder};
    border-left: 3px solid ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.radius.md};
    background: ${({ theme }) => theme.tint.urgentBg};

    p {
      margin: 0;
      color: ${({ theme }) => theme.colors.onSurface};
    }
  }
`;

const Editor = styled.textarea`
  width: 100%;
  min-height: 420px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.inputFill};
  color: ${({ theme }) => theme.colors.onSurface};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 14px;
  line-height: 1.7;
  padding: 16px;
  resize: vertical;
  ${customScrollbar};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 12px;
  color: ${({ theme }) => theme.colors.onSurfaceFaint};
  text-align: center;
  padding: ${({ theme }) => theme.space.xl};

  svg {
    width: 40px;
    height: 40px;
    opacity: 0.4;
  }
`;

export interface NoteEditorProps {
  note: Note | null;
}

export function NoteEditor({ note }: NoteEditorProps) {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditing(false);
  }, [note?.id]);

  if (!note) {
    return (
      <Wrap>
        <EmptyState>
          <IconNotes />
          <p>Selecione uma tarefa com nota vinculada para visualizar o documento.</p>
        </EmptyState>
      </Wrap>
    );
  }

  const wrapSelection = (before: string, after = before) => {
    const ta = textRef.current;
    if (!ta) return;
    const { selectionStart: s, selectionEnd: e, value } = ta;
    const selected = value.slice(s, e) || 'texto';
    const next = value.slice(0, s) + before + selected + after + value.slice(e);
    dispatch(updateNoteContent({ id: note.id, content: next }));
    requestAnimationFrame(() => {
      ta.focus();
      ta.selectionStart = s + before.length;
      ta.selectionEnd = s + before.length + selected.length;
    });
  };

  const prefixLine = (prefix: string) => {
    const ta = textRef.current;
    if (!ta) return;
    const { selectionStart: s, value } = ta;
    const lineStart = value.lastIndexOf('\n', s - 1) + 1;
    const next = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    dispatch(updateNoteContent({ id: note.id, content: next }));
  };

  return (
    <Wrap>
      <Toolbar role="toolbar" aria-label="Formatação da nota">
        <HBtn type="button" aria-label="Título 2" disabled={!editing} onClick={() => prefixLine('## ')}>
          H2
        </HBtn>
        <HBtn type="button" aria-label="Título 3" disabled={!editing} onClick={() => prefixLine('### ')}>
          H3
        </HBtn>
        <Divider />
        <IconButton type="button" $size={32} aria-label="Negrito" disabled={!editing} onClick={() => wrapSelection('**')}>
          <IconBold width={16} height={16} />
        </IconButton>
        <IconButton type="button" $size={32} aria-label="Itálico" disabled={!editing} onClick={() => wrapSelection('*')}>
          <IconItalic width={16} height={16} />
        </IconButton>
        <IconButton type="button" $size={32} aria-label="Sublinhado" disabled={!editing} onClick={() => wrapSelection('`')}>
          <IconUnderline width={16} height={16} />
        </IconButton>
        <Divider />
        <IconButton type="button" $size={32} aria-label="Lista" disabled={!editing} onClick={() => prefixLine('- ')}>
          <IconList width={16} height={16} />
        </IconButton>
        <IconButton type="button" $size={32} aria-label="Backlink" disabled={!editing} onClick={() => wrapSelection('[[', ']]')}>
          <IconLink width={16} height={16} />
        </IconButton>

        <Right>
          <Button
            type="button"
            $variant={editing ? 'primary' : 'secondary'}
            $size="sm"
            onClick={() => setEditing((v) => !v)}
          >
            {editing ? 'Pré-visualizar' : 'Editar'}
          </Button>
        </Right>
      </Toolbar>

      <Scroller>
        <TitleInput
          value={note.title}
          aria-label="Título da nota"
          onChange={(e) => dispatch(updateNoteTitle({ id: note.id, title: e.target.value }))}
        />
        <EditedAt>Última edição em {formatDateTime(note.updatedAt)}</EditedAt>

        {editing ? (
          <Editor
            ref={textRef}
            value={note.content}
            aria-label="Conteúdo da nota"
            onChange={(e) => dispatch(updateNoteContent({ id: note.id, content: e.target.value }))}
          />
        ) : (
          <Doc>{renderMarkdown(note.content)}</Doc>
        )}
      </Scroller>
    </Wrap>
  );
}
