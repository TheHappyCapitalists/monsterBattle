import { HitBoxSchema } from '../../monster/domain/hitbox-schema';

export abstract class BattleEntity {
  constructor(
    public maxSpeed: number,
    public name: string,
    public hitboxSchema: HitBoxSchema,
  ) {}
}
