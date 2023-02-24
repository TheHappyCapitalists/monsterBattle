import { InputFixture } from './input/domain/input';
import { Monster, MonsterFixtures } from './monster/domain/monster';
import { Player } from './player/domain/player';
import { Game } from './game';
import { InputProvider } from './input/application/input-provider';
import { BasicsAngle } from './shared/angle';

describe('it should generate a battlefield', () => {
  let game: Game;
  let player: Player;
  let alliedMonster: Monster;
  let inputProvider: InputProvider;
  beforeEach(() => {
    alliedMonster = MonsterFixtures.Betoblyat;
    player = new Player([alliedMonster]);
    inputProvider = {
      getInput: () => InputFixture.rightDirectionInput,
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
          position: { x: -320, y: -320 },
          name: alliedMonster.name,
          angle: BasicsAngle.topRight,
        },
        opponentMonster: {
          position: { x: 320, y: 320 },
          name: opponent.name,
          angle: BasicsAngle.bottomLeft,
        },
      });
    });

    it('should tick battle when in battle context', () => {
      const opponent = MonsterFixtures.Sneko;
      const previousXPosition = 320;
      game.startBattle(opponent);
      game.tick();
      expect(game.getState()!.entities.alliedMonster.position.x).not.toBe(
        previousXPosition,
      );
    });
  });
});
