import React, { useEffect, useRef } from 'react';
import { Renderer } from '../../game/infrastructure/graphics/renderer';
import { Game } from '../../game/application/game';
import { Player } from '../../game/domain/player';
import { Monster, MonsterFixtures } from '../../game/domain/monster';
import { KeyboardInputsProvider } from '../../game/infrastructure/keyboard-inputs-provider';
import { LocalImageStore } from '../../game/infrastructure/graphics/local-image-store';

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
