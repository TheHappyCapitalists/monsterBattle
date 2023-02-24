import { BasicsAngle } from '../../shared/angle';
import { Monster, MonsterFixtures } from '../../monster/domain/monster';
import { BattlePhysic } from './battle-physic';
import { BattleIntentFixtures } from '../domain/battle-intent';

describe('BattlePhysic', () => {
  let battlePhysic: BattlePhysic;
  let allied: Monster;
  let opponent: Monster;
  beforeEach(() => {
    allied = MonsterFixtures.Betoblyat;
    opponent = MonsterFixtures.Sneko;
    battlePhysic = new BattlePhysic([
      {
        entity: allied,
        position: { x: -100, y: -100 },
        angle: BasicsAngle.topRight,
      },
      {
        entity: opponent,
        position: { x: 100, y: 100 },
        angle: BasicsAngle.bottomLeft,
      },
    ]);
  });

  describe('Tick', () => {
    it('should apply the intent to the right entity', () => {
      const alliedPhysic = battlePhysic.getReference(allied);
      const previousxPosition = alliedPhysic.position.x;
      alliedPhysic.speed = 5;
      battlePhysic.tick([
        {
          entity: allied,
          movementIntent: BattleIntentFixtures.moveRight,
          abilityIntent: undefined,
        },
      ]);
      expect(alliedPhysic.position.x).toBeGreaterThan(previousxPosition);
    });
    it('should slow down speed of entities as tick pass if no movement input were provided', () => {
      const alliedPhysic = battlePhysic.getReference(allied);
      const previousSpeed = 8;
      alliedPhysic.speed = previousSpeed;
      battlePhysic.tick([
        {
          entity: allied,
          movementIntent: undefined,
          abilityIntent: BattleIntentFixtures.attack,
        },
      ]);

      expect(alliedPhysic.speed).toBeLessThan(previousSpeed);
    });

    describe('Slowly turn entity each tick', () => {
      it('Basic Case', () => {
        const alliedPhysic = battlePhysic.getReference(allied);
        let previousAngle = alliedPhysic.angle;
        const battleIntent = [
          {
            entity: allied,
            movementIntent: BattleIntentFixtures.moveLeft,
          },
        ];

        battlePhysic.tick(battleIntent);
        expect(alliedPhysic.angle).toEqual(previousAngle + Math.PI / 16);
        previousAngle = alliedPhysic.angle;
        battlePhysic.tick(battleIntent);
        expect(alliedPhysic.angle).toEqual(previousAngle + Math.PI / 16);
        previousAngle = alliedPhysic.angle;
        battlePhysic.tick(battleIntent);
        expect(alliedPhysic.angle).toEqual(previousAngle + Math.PI / 16);
        previousAngle = alliedPhysic.angle;
        battlePhysic.tick(battleIntent);
        expect(alliedPhysic.angle).toEqual(previousAngle + Math.PI / 16);
      });

      it('Case overflow negative radiant', () => {
        const alliedPhysic = battlePhysic.getReference(allied);
        alliedPhysic.angle = Math.PI / 4;
        let previousAngle = alliedPhysic.angle;
        const battleIntent = [
          {
            entity: allied,
            movementIntent: BattleIntentFixtures.moveDown,
          },
        ];

        battlePhysic.tick(battleIntent);
        expect(alliedPhysic.angle).toEqual(previousAngle - Math.PI / 16);
        previousAngle = alliedPhysic.angle;
        battlePhysic.tick(battleIntent);
        expect(alliedPhysic.angle).toEqual(previousAngle - Math.PI / 16);
        previousAngle = alliedPhysic.angle;
        battlePhysic.tick(battleIntent);
        expect(alliedPhysic.angle).toEqual(previousAngle - Math.PI / 16);
        previousAngle = alliedPhysic.angle;
        battlePhysic.tick(battleIntent);
        expect(alliedPhysic.angle).toEqual(0);

        previousAngle = alliedPhysic.angle;
        battlePhysic.tick(battleIntent);
        expect(alliedPhysic.angle).toEqual(2 * Math.PI - Math.PI / 16);

        previousAngle = alliedPhysic.angle;
        battlePhysic.tick(battleIntent);
        expect(alliedPhysic.angle).toEqual(previousAngle - Math.PI / 16);
      });

      it('Case overflow >2PI radiant', () => {
        const alliedPhysic = battlePhysic.getReference(allied);
        alliedPhysic.angle = (15 * Math.PI) / 8;
        let previousAngle = alliedPhysic.angle;
        const battleIntent = [
          {
            entity: allied,
            movementIntent: BattleIntentFixtures.moveUp,
          },
        ];

        battlePhysic.tick(battleIntent);
        expect(alliedPhysic.angle).toEqual(previousAngle + Math.PI / 16);
        previousAngle = alliedPhysic.angle;

        battlePhysic.tick(battleIntent);
        expect(alliedPhysic.angle).toEqual(0);
        previousAngle = alliedPhysic.angle;

        battlePhysic.tick(battleIntent);
        expect(alliedPhysic.angle).toEqual(Math.PI / 16);
        previousAngle = alliedPhysic.angle;
      });
    });
  });
});
