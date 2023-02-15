import { Monster } from '../domain/monster';
import { Player } from '../domain/player';
import { Game } from './game';

describe('it should generate a battlefield', () => {
  let game: Game;
  let player: Player;
  let alliedMonster: Monster;
  beforeEach(() => {
    alliedMonster = new Monster({ x: 50, y: 70 });
    player = new Player([alliedMonster]);
    game = new Game(player);
  });
  describe('battle', () => {
    it('should switch the context of the game to enter Battle context', () => {
      const opponent = new Monster({ x: 900, y: 850 });
      game.startBattle(opponent);
      expect(game.getState()!.context).toBe('Battle');
    });

    it('should return the opposing monsters in the battle', () => {
      const opponent = new Monster({ x: 900, y: 850 });
      game.startBattle(opponent);
      expect(game.getState()!.entities).toEqual({
        alliedMonster: { position: alliedMonster.position },
        opponentMonster: { position: opponent.position },
      });
    });
  });
});
