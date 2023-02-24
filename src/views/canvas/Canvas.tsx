import React, { useEffect, useRef } from 'react';
import { Renderer } from '../../game/graphics/renderer';
import { Player } from '../../game/player/domain/player';
import { MonsterFixtures } from '../../game/monster/domain/monster';
import { KeyboardInputsProvider } from '../../game/input/infrastructure/keyboard-inputs-provider';
import { LocalImageStore } from '../../game/graphics/infrastructure/local-image-store';
import { Game } from '../../game/game';

export function Canvas() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvas.current) return;
    const player = new Player([MonsterFixtures.Betoblyat]);
    const opponent = MonsterFixtures.Sneko;
    const keyboardInputsProvider = new KeyboardInputsProvider();
    const imageStore = new LocalImageStore();
    const game = new Game(player, keyboardInputsProvider);
    game.startBattle(opponent);
    new Renderer(imageStore, canvas.current, game);
  }, [canvas]);

  return <canvas width="1600" height="900" ref={canvas}></canvas>;
}
