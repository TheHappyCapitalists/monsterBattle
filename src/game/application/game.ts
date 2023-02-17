import type { Monster } from '../domain/monster';
import type { Player } from '../domain/player';
import { KeyboardInputsProvider } from '../infrastructure/keyboard-inputs-provider';
import { Battle } from './battle';
import { InputProvider } from './input-provider';

type GameContext = 'Battle' | 'World' | 'Menu';

export class Game {
  private context: GameContext = 'Menu';
  private battle: Battle | undefined;
  constructor(private player: Player, public inputProvider: InputProvider) {
    setInterval(() => this.tick(), 30);
  }

  getState() {
    if (this.context === 'Battle' && this.battle) {
      const battleState = this.battle.getBattleState();
      return {
        context: this.context,
        entities: {
          alliedMonster: {
            position: battleState.alliedMonster.position,
            angle: battleState.alliedMonster.angle,
          },
          opponentMonster: {
            position: battleState.opponentMonster.position,
            angle: battleState.opponentMonster.angle,
          },
        },
      };
    }
  }

  startBattle(opponent: Monster) {
    this.context = 'Battle';
    this.battle = new Battle(this.player.getMonsters(), opponent);
  }

  tick() {
    const input = this.inputProvider.getInput();
    if (this.context === 'Battle') {
      this.battle?.tick(input);
    }
  }
}
