import { BattleIntent } from '../domain/battle-intent';
import { InputFixture } from '../domain/input';
import { Monster, MonsterFixtures } from '../domain/monster';
import { Player } from '../domain/player';
import { BasicsAngle } from '../domain/position';
import { KeyboardInputsProvider } from '../infrastructure/keyboard-inputs-provider';
import { Game } from './game';
import { InputProvider } from './input-provider';

describe('it should generate a battlefield', () => {
  let game: Game;
  let player: Player;
  let alliedMonster: Monster;
  let inputProvider: InputProvider;
  beforeEach(() => {
    alliedMonster = MonsterFixtures.Betoblyat;
    player = new Player([alliedMonster]);
    inputProvider = {
      getInput: () => InputFixture.turnRightInput,
    };

    game = new Game(player, inputProvider);
  });
  describe('battle', () => {
    it('should switch the context of the game to enter Battle context', () => {
      const opponent = MonsterFixtures.Sneko;

      game.startBattle(opponent);

      expect(game.getState()!.context).toBe('Battle');
    });

    it('should return the opposing monsters in the battle', () => {
      const opponent = MonsterFixtures.Sneko;
      game.startBattle(opponent);
      expect(game.getState()!.entities).toEqual({
        alliedMonster: {
          position: { x: 100, y: 100 },
          angle: BasicsAngle.bottomRight,
        },
        opponentMonster: {
          position: { x: 1500, y: 800 },
          angle: BasicsAngle.topLeft,
        },
      });
    });

    it('should tick battle when in battle context', () => {
      const opponent = MonsterFixtures.Sneko;
      game.startBattle(opponent);
      game.tick();
      expect(game.getState()!.entities).toEqual({
        alliedMonster: {
          position: { x: 105, y: 100 },
          angle: BasicsAngle.right,
        },
        opponentMonster: {
          position: { x: 1500, y: 800 },
          angle: BasicsAngle.topLeft,
        },
      });
    });
  });
});
