import { useEffect, useState } from 'react';
import { breakdownMs, type CountdownParts } from '@/utils/date';

/**
 * Countdown em tempo real até a data alvo (ISO). Atualiza a cada segundo.
 * Retorna partes HH/MM/SS e flag de expiração.
 */
export function useCountdown(targetIso: string | null): CountdownParts {
  const compute = (): CountdownParts => {
    if (!targetIso) return breakdownMs(0);
    return breakdownMs(new Date(targetIso).getTime() - Date.now());
  };

  const [parts, setParts] = useState<CountdownParts>(compute);

  useEffect(() => {
    setParts(compute());
    if (!targetIso) return;
    const id = window.setInterval(() => setParts(compute()), 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetIso]);

  return parts;
}
