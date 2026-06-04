import styled from 'styled-components';

const Wrap = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.lg};
  flex-wrap: wrap;
`;

const Titles = styled.div`
  h1 {
    font-size: ${({ theme }) => theme.type.headlineLg.size};
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.1;

    @media (max-width: ${({ theme }) => theme.breakpoint.mobile}px) {
      font-size: 26px;
    }
  }
  p {
    margin-top: 6px;
    color: ${({ theme }) => theme.colors.onSurfaceVariant};
    font-size: 14px;
    max-width: 60ch;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  flex-wrap: wrap;
`;

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <Wrap>
      <Titles>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </Titles>
      {actions && <Actions>{actions}</Actions>}
    </Wrap>
  );
}
