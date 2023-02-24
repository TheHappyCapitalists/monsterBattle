import { Biome } from '../battle/domain/battle-area';
import { Game } from '../game';
import { Position } from '../shared/position';
import { Size } from '../shared/size';
import { ImageStore } from './application/image-store';

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  constructor(
    private readonly imageStore: ImageStore,
    private readonly canvas: HTMLCanvasElement,
    private readonly game: Game,
  ) {
    this.ctx = this.canvas.getContext('2d')!;
    const render = () => {
      this.render();
      window.requestAnimationFrame(render);
    };
    render();
  }

  render() {
    this.clear();
    const state = this.game.getState();
    if (state) {
      if (state.context === 'Battle') {
        this.renderBattleField(
          state.battleField.position,
          state.battleField.size,
          state.battleField.biome,
        );
        this.renderEntities(
          [state.entities.alliedMonster, state.entities.opponentMonster],
          state.battleField.position,
        );
      }
    }
  }

  renderBattleField(position: Position, size: Size, biome: Biome) {
    this.ctx.beginPath();
    const background = this.imageStore.loadField(biome);
    this.ctx.drawImage(
      background,
      position.x - size.width / 2,
      position.y - size.height / 2,
    );
  }

  renderEntities(
    entities: { position: Position; angle: number; name: string }[],
    battleFieldPosition: Position,
  ) {
    for (const entity of entities) {
      const relativeX = entity.position.x + battleFieldPosition.x;
      const relativeY = 900 - (entity.position.y + battleFieldPosition.y);

      this.drawMonster(relativeX, relativeY, entity.name);
    }
  }

  drawMonster(x: number, y: number, name: string) {
    this.ctx.beginPath();
    const monster = this.imageStore.loadMonster(name);
    this.ctx.drawImage(monster, x - 50, y - 50);
    this.ctx.stroke();
  }

  clear() {
    this.ctx.clearRect(0, 0, 1600, 900);
  }
}
