import type { Monster } from '../domain/monster';

export class Battle {
  private actualAlliedMonster: Monster;
  constructor(private alliedteam: Monster[], private opponent: Monster) {
    this.actualAlliedMonster = alliedteam[0];
  }

  getBattleState() {
    return {
      alliedMonster: { position: this.actualAlliedMonster.position },
      opponentMonster: { position: this.opponent.position },
    };
  }
}
