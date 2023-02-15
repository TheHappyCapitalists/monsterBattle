import type { Monster } from '../domain/monster';
import type { Player } from '../domain/player';
import { Battle } from './battle';

type GameContext = 'Battle' | 'World' | 'Menu';

export class Game {
  private context: GameContext = 'Menu';
  private battle: Battle | undefined;
  constructor(private player: Player) {}

  getState() {
    if (this.context === 'Battle' && this.battle) {
      const battleState = this.battle.getBattleState();
      return {
        context: this.context,
        entities: {
          alliedMonster: { position: battleState.alliedMonster.position },
          opponentMonster: { position: battleState.opponentMonster.position },
        },
      };
    }
  }

  startBattle(opponent: Monster) {
    this.context = 'Battle';
    this.battle = new Battle(this.player.getMonsters(), opponent);
  }
}
