import { Monster } from '../domain/monster';
import { Battle } from './battle';

describe('battle', () => {
  let battle: Battle;
  let opponent: Monster;
  let alliedMonster: Monster;
  beforeEach(() => {
    opponent = new Monster({ x: 150, y: 150 });
    alliedMonster = new Monster({ x: 150, y: 150 });
    battle = new Battle([alliedMonster], opponent);
  });
  it('should move the allied monster position', () => {
    const vector = battle.move(alliedMonster, vector);
  });
});
