import { useState } from 'react';
import styled from 'styled-components';

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}

const Circle = styled.div<{ $size: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primaryDim}, ${({ theme }) => theme.colors.surfaceContainerHigh});
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.onSurface};
  font-size: ${({ $size }) => Math.round($size * 0.38)}px;
  font-weight: 600;
  flex-shrink: 0;
  user-select: none;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export interface AvatarProps {
  name: string;
  src?: string | null;
  size?: number;
}

export function Avatar({ name, src, size = 36 }: AvatarProps) {
  const [broken, setBroken] = useState(false);
  const showImage = src && !broken;

  return (
    <Circle $size={size} aria-hidden title={name}>
      {showImage ? (
        <img src={src} alt="" onError={() => setBroken(true)} />
      ) : (
        initials(name)
      )}
    </Circle>
  );
}
