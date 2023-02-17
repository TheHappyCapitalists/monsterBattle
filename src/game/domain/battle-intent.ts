export type BattleMovement = {
  type: 'movement';
  direction: number;
  intensity: number;
};
export type BattleAttack = { type: 'attack' };

export type BattleIntent = BattleMovement | BattleAttack;
