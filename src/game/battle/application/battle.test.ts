import { BasicsAngle } from '../../shared/angle';
import {
  InputFixture,
  InputStateBuilder,
  InputsState,
} from '../../input/domain/input';
import { Monster, MonsterFixtures } from '../../monster/domain/monster';
import { Battle } from './battle';

describe('battle', () => {
  let battle: Battle;
  let opponent: Monster;
  let alliedMonster: Monster;
  beforeEach(() => {
    opponent = MonsterFixtures.Sneko;
    alliedMonster = MonsterFixtures.Betoblyat;
    battle = new Battle([alliedMonster], opponent, { biome: 'forest' });
  });

  describe('battleInput and BattleIntent', () => {
    describe('movement', () => {
      it('should translate movement input', () => {
        const input: InputsState = {
          analogicInput: { intensity: 1, angle: 0 },
        };
        const battleIntent = battle.translateInput(input);
        expect(battleIntent).toEqual({
          userIntents: [],
          entityIntents: [{ type: 'movement', direction: 0, intensity: 1 }],
        });
      });

      it('should turn the monster when intent is a battleMovement', () => {
        battle.tick(InputFixture.leftDirectionInput);
        expect(battle.getPhysicReference(alliedMonster).angle).not.toBe(
          BasicsAngle.topLeft,
        );
      });

      it('should not turn the monster if the intensity of the input is 0', () => {
        battle.tick(
          new InputStateBuilder()
            .withAnalogicInput(0, BasicsAngle.left)
            .build(),
        );
        expect(battle.getPhysicReference(alliedMonster).angle).not.toBe(
          BasicsAngle.left,
        );
      });
    });
  });

  describe('tick', () => {
    it('should move each moving monster depending on speed and vector', () => {
      const allied = battle.getPhysicReference(alliedMonster);
      const previousxPosition = allied.position.x;
      const previousyPosition = allied.position.y;
      allied.speed = 4;
      battle.tick(InputFixture.bottomRightDirectionInput);
      expect(allied.position.x).not.toBe(previousxPosition);
      expect(allied.position.y).not.toBe(previousyPosition);
    });
  });

  describe('hitbox', () => {
    it('should not allow a monster to move out the battle Area', () => {
      const allied = battle.getPhysicReference(alliedMonster);
      allied.position.x = 25;
      allied.position.y = 25;
      battle.tick(InputFixture.bottomLeftDirectionInput);
      battle.tick(InputFixture.bottomLeftDirectionInput);
      expect(allied.position.x).toBeGreaterThan(0);
      expect(allied.position.y).toBeGreaterThan(0);
    });
  });
});
