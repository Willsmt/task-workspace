/** Utilitários de data/prazo em pt-BR. */

const DAY_MS = 1000 * 60 * 60 * 24;

export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Diferença em dias inteiros entre hoje e a data (positivo = futuro). */
export function daysUntil(iso: string | null, now: Date = new Date()): number | null {
  if (!iso) return null;
  const target = startOfDay(new Date(iso)).getTime();
  const today = startOfDay(now).getTime();
  return Math.round((target - today) / DAY_MS);
}

export function isToday(iso: string | null, now: Date = new Date()): boolean {
  return daysUntil(iso, now) === 0;
}

/** Rótulo curto e humano do prazo: "Hoje", "Amanhã", "em 3 dias", "há 2 dias". */
export function formatDeadline(iso: string | null, now: Date = new Date()): string {
  if (!iso) return 'Sem prazo';
  const diff = daysUntil(iso, now);
  if (diff === null) return 'Sem prazo';
  if (diff === 0) return 'Hoje';
  if (diff === 1) return 'Amanhã';
  if (diff === -1) return 'Ontem';
  if (diff > 1) return `em ${diff} dias`;
  return `há ${Math.abs(diff)} dias`;
}

/** Data por extenso curta: "31 out 2025". */
export function formatShortDate(iso: string | null): string {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso));
}

/** Data + hora: "31 out, 14:30". */
export function formatDateTime(iso: string | null): string {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

/** Formata uma duração em minutos de forma legível: "42m", "6h", "3d". */
export function formatDurationMinutes(minutes: number): string {
  if (minutes <= 0) return '—';
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.round(minutes / 60);
  if (hours < 48) return `${hours}h`;
  return `${Math.round(hours / 24)}d`;
}

/** Quebra um intervalo de ms em partes HH/MM/SS com zero à esquerda. */
export interface CountdownParts {
  total: number;
  hours: string;
  minutes: string;
  seconds: string;
  expired: boolean;
}

export function breakdownMs(ms: number): CountdownParts {
  const expired = ms <= 0;
  const clamped = Math.max(0, ms);
  const totalSeconds = Math.floor(clamped / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    total: clamped,
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
    expired,
  };
}
