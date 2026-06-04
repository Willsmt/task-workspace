import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { IconButton } from './IconButton';
import { IconPlus } from '@/components/icons';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 8vh 16px;
  background: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: blur(4px);
  animation: fade 160ms ease;

  @keyframes fade {
    from {
      opacity: 0;
    }
  }
`;

const Dialog = styled.div`
  width: 100%;
  max-width: 480px;
  background: ${({ theme }) => theme.colors.glassHigh};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.xl};
  box-shadow: ${({ theme }) => theme.shadow.popover}, ${({ theme }) => theme.shadow.glowSoft};
  backdrop-filter: blur(20px);
  animation: rise 200ms ease;

  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h2 {
    font-size: 18px;
  }
`;

const Body = styled.div`
  padding: ${({ theme }) => theme.space.md};
`;

const Close = styled(IconButton)`
  svg {
    transform: rotate(45deg);
  }
`;

export interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ open, title, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <Overlay
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <Dialog role="dialog" aria-modal="true" aria-label={title}>
        <Header>
          <h2>{title}</h2>
          <Close type="button" aria-label="Fechar" onClick={onClose}>
            <IconPlus />
          </Close>
        </Header>
        <Body>{children}</Body>
      </Dialog>
    </Overlay>,
    document.body,
  );
}
