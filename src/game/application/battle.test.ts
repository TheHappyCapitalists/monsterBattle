import { InputsState } from '../domain/input';
import { Monster, MonsterFixtures } from '../domain/monster';
import { BasicsAngle } from '../domain/position';
import { Battle } from './battle';

describe('battle', () => {
  let battle: Battle;
  let opponent: Monster;
  let alliedMonster: Monster;
  beforeEach(() => {
    opponent = MonsterFixtures.Sneko;
    alliedMonster = MonsterFixtures.Betoblyat;
    battle = new Battle([alliedMonster], opponent);
  });

  describe('battleInput and BattleIntent', () => {
    describe('movement', () => {
      it('should translate movement input', () => {
        const input: InputsState = {
          analogicInput: { intensity: 1, angle: 0 },
        };
        const battleIntent = battle.translateInput(input);
        expect(battleIntent).toEqual({ type: 'movement', direction: 0 });
      });

      it('should turn the monster when intent is a battleMovement', () => {
        battle.input(alliedMonster, {
          type: 'movement',
          direction: BasicsAngle.left,
        });
        expect(battle.getReference(alliedMonster).angle).toBe(BasicsAngle.left);
      });
    });
  });

  describe('tick', () => {
    it('should move each moving monster depending on speed and vector', () => {
      const allied = battle.getReference(alliedMonster);
      const previousxPosition = allied.position.x;
      const previousyPosition = allied.position.y;
      allied.speed = 4;
      battle.tick();
      expect(allied.position.x).not.toBe(previousxPosition);
      expect(allied.position.y).not.toBe(previousyPosition);
    });
  });
});
