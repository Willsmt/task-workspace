/**
 * Helpers de tempo compartilhados pelos mocks.
 * As datas dos mocks são relativas ao "agora" para que prazos e contagens
 * regressivas continuem fazendo sentido em qualquer execução (sem backend).
 */

export const HOUR = 1000 * 60 * 60;
export const DAY = HOUR * 24;

export type IsoFromOffset = (offsetMs: number) => string;

/** Cria uma função que converte um deslocamento em ms (a partir de `now`) em ISO. */
export const createIso =
  (now: Date = new Date()): IsoFromOffset =>
  (offsetMs: number) =>
    new Date(now.getTime() + offsetMs).toISOString();
