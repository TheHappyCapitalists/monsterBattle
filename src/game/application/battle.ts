import { BattleIntent } from '../domain/battle-intent';
import { BattleEntity } from '../domain/battle-entity';
import type { Monster } from '../domain/monster';
import { BattlePhysic } from './battle-physic';
import { InputsState } from '../domain/input';
import { BasicsAngle } from '../domain/position';

export class EntityNotFoundError extends Error {
  constructor(entity: BattleEntity) {
    super(`Entity ${entity} not found in battle reference`);
  }
}

export class Battle {
  private actualAlliedMonster: Monster;
  private entitiesReference: Map<Monster, BattlePhysic<Monster>> = new Map();
  constructor(private alliedteam: Monster[], private opponent: Monster) {
    this.actualAlliedMonster = alliedteam[0];
    this.entitiesReference.set(
      this.actualAlliedMonster,
      new BattlePhysic(
        this.actualAlliedMonster,
        { x: 100, y: 100 },
        BasicsAngle.bottomRight,
        0,
      ),
    );
    this.entitiesReference.set(
      this.opponent,
      new BattlePhysic(
        this.opponent,
        { x: 1500, y: 800 },
        BasicsAngle.topLeft,
        0,
      ),
    );
  }

  tick(input: InputsState) {
    this.input(this.actualAlliedMonster, input);
    this.entitiesReference.forEach((entity) => entity.tick());
  }

  translateInput(input: InputsState): BattleIntent[] {
    console.log(input);
    const intents: BattleIntent[] = [];
    intents.push({
      type: 'movement',
      direction: input.analogicInput.angle,
      intensity: input.analogicInput.intensity,
    });
    return intents;
  }

  input(monster: Monster, input: InputsState) {
    const entity = this.getReference(monster);
    const intents = this.translateInput(input);
    intents.map((intent) => entity.intent(intent));
  }

  getBattleState() {
    const allied = this.getReference(this.actualAlliedMonster);
    const opponent = this.getReference(this.opponent);
    return {
      alliedMonster: {
        position: allied.position,
        angle: allied.angle,
      },
      opponentMonster: {
        position: opponent.position,
        angle: opponent.angle,
      },
    };
  }

  getReference(monster: Monster) {
    const found = this.entitiesReference.get(monster);
    if (!found) {
      throw new EntityNotFoundError(monster);
    }
    return found;
  }
}
