import { BattleIntent } from '../domain/battle-intent';
import { Monster, MonsterFixtures } from '../domain/monster';
import { Player } from '../domain/player';
import { Game } from './game';

describe('it should generate a battlefield', () => {
  let game: Game;
  let player: Player;
  let alliedMonster: Monster;
  beforeEach(() => {
    alliedMonster = MonsterFixtures.Betoblyat;
    player = new Player([alliedMonster]);
    game = new Game(player);
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
        alliedMonster: { position: { x: 100, y: 100 } },
        opponentMonster: { position: { x: 1500, y: 800 } },
      });
    });
  });
});
