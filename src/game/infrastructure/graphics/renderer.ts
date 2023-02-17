import { Game } from '../../application/game';
import { Position } from '../../domain/position';
import { ImageStore } from './image-store';

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
      this.renderEntities([
        state.entities.alliedMonster,
        state.entities.opponentMonster,
      ]);
    }
  }

  renderEntities(entities: { position: Position }[]) {
    for (const entity of entities) {
      this.drawMonster(entity.position.x, 900 - entity.position.y);
    }
  }

  drawMonster(x: number, y: number) {
    this.ctx.beginPath();
    const sneko = this.imageStore.load('sneko');
    this.ctx.drawImage(sneko, x - 50, y - 50);
    this.ctx.stroke();
  }

  clear() {
    this.ctx.clearRect(0, 0, 1600, 900);
  }
}
