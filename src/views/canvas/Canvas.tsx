import React, { useEffect, useRef } from 'react';
import { Renderer } from '../../graphics/renderer';
import { Game } from '../../game/application/game';
import { Player } from '../../game/domain/player';
import { Monster } from '../../game/domain/monster';
export function Canvas() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvas.current) return;
    const player = new Player([new Monster({ x: 300, y: 450 })]);
    const opponent = new Monster({ x: 800, y: 450 });
    const game = new Game(player);
    game.startBattle(opponent);
    new Renderer(canvas.current, game);
  }, [canvas]);

  return <canvas width="1600" height="900" ref={canvas}></canvas>;
}
