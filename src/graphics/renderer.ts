import { Game } from '../game/application/game';
import { Position } from '../game/domain/position';

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  constructor(
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
      this.drawCircle(entity.position.x, entity.position.y, 50);
    }
  }

  drawCircle(x: number, y: number, radius: number) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
}
