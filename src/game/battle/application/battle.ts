import {
  BattleAbilityIntent,
  BattleIntent,
  BattleMovementIntent,
  EntityBattleIntent,
  UserBattleIntent,
} from '../domain/battle-intent';
import type { Monster } from '../../monster/domain/monster';
import { InputsState } from '../../input/domain/input';
import { BattleState } from '../domain/battle-state';
import { BattleArea } from '../domain/battle-area';
import { BattleField } from '../domain/battle-field';
import { BattleEntityPhysicProps, BattlePhysic } from './battle-physic';

export class Battle {
  private actualAlliedMonster: Monster;
  private battlePhysic: BattlePhysic;
  private battleField: BattleField;
  constructor(
    private alliedteam: Monster[],
    private opponent: Monster,
    battleArea: BattleArea,
  ) {
    this.battleField = new BattleField(battleArea);
    this.actualAlliedMonster = alliedteam[0];
    this.battlePhysic = this.initBattlePhysic();
  }

  initBattlePhysic(): BattlePhysic {
    const alliedSpawn = this.battleField.getAlliedSpawn();
    const alliedMonster: BattleEntityPhysicProps = {
      entity: this.actualAlliedMonster,
      position: alliedSpawn.position,
      angle: alliedSpawn.angle,
    };

    const opponentSpawn = this.battleField.getOpponentSpawn();
    const opponentMonster: BattleEntityPhysicProps = {
      entity: this.opponent,
      position: opponentSpawn.position,
      angle: opponentSpawn.angle,
    };

    return new BattlePhysic([alliedMonster, opponentMonster]);
  }

  tick(input: InputsState) {
    const intents = this.translateInput(input);
    const alliedEntityIntents = {
      entity: this.actualAlliedMonster,
      movementIntent: intents.entityIntents.find(
        (intent) => intent.type === 'movement',
      ) as BattleMovementIntent,
      actionIntent: intents.entityIntents.find(
        (intent) => intent.type === 'attack',
      ) as BattleAbilityIntent,
    };
    this.battlePhysic.tick([alliedEntityIntents]);
  }

  translateInput(input: InputsState): {
    userIntents: UserBattleIntent[];
    entityIntents: EntityBattleIntent[];
  } {
    const entityIntents: EntityBattleIntent[] = [];
    const userIntents: UserBattleIntent[] = [];

    if (input.analogicInput.intensity > 0.05) {
      entityIntents.push({
        type: 'movement',
        direction: input.analogicInput.angle,
        intensity: input.analogicInput.intensity,
      });
    }
    return { userIntents: userIntents, entityIntents: entityIntents };
  }

  getBattleState(): BattleState {
    const allied = this.getPhysicReference(this.actualAlliedMonster);
    const opponent = this.getPhysicReference(this.opponent);
    return {
      alliedMonster: {
        position: allied.position,
        angle: allied.angle,
        name: allied.name,
      },
      opponentMonster: {
        position: opponent.position,
        angle: opponent.angle,
        name: opponent.name,
      },
      battleField: {
        position: this.battleField.position,
        size: this.battleField.size,
        biome: this.battleField.biome,
      },
    };
  }

  getPhysicReference(monster: Monster) {
    return this.battlePhysic.getReference(monster);
  }
}
