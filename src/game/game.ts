import { Battle } from './battle/application/battle';
import { InputProvider } from './input/application/input-provider';
import { Monster } from './monster/domain/monster';
import { Player } from './player/domain/player';

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
            name: battleState.alliedMonster.name,
          },
          opponentMonster: {
            position: battleState.opponentMonster.position,
            angle: battleState.opponentMonster.angle,
            name: battleState.opponentMonster.name,
          },
        },
        battleField: {
          biome: battleState.battleField.biome,
          position: battleState.battleField.position,
          size: battleState.battleField.size,
        },
      };
    }
  }

  startBattle(opponent: Monster) {
    this.context = 'Battle';
    this.battle = new Battle(this.player.getMonsters(), opponent, {
      biome: 'forest',
    });
  }

  tick() {
    const input = this.inputProvider.getInput();
    if (this.context === 'Battle') {
      this.battle?.tick(input);
    }
  }
}
