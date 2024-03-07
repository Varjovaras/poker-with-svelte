export const suits = ['hearts', 'diamonds', 'spades', 'clubs'] as const;
export const ranks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
export type SuitType = (typeof suits)[number];
export type RankType = (typeof ranks)[number];
export type CardType = { suit: SuitType; rank: RankType };
