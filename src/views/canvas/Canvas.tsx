import React, { useEffect, useRef } from 'react';
import { Renderer } from '../../graphics/renderer';
import { Game } from '../../game/application/game';
export function Canvas() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvas.current) return;
    const game = new Game();
    new Renderer(canvas.current, game);
  }, [canvas]);

  return <canvas width="1600" height="900" ref={canvas}></canvas>;
}
