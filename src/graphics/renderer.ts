import type { Game } from 'src/game/application/game';

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly game: Game,
  ) {
    this.ctx = this.canvas.getContext('2d')!;
    this.render();
  }

  render() {
    this.renderEntities(this.game.getState().entities);
  }

  renderEntities(entities: { x: number; y: number }[]) {
    for (const entity of entities) {
      this.drawCircle(entity.x, entity.y, 50);
    }
  }

  drawCircle(x: number, y: number, radius: number) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
}
