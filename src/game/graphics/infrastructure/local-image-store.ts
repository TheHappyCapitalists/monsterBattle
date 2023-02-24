import { ImageStore } from '../application/image-store';

export class LocalImageStore implements ImageStore {
  loadMonster(name: string): HTMLImageElement {
    const image = new Image(50, 50);
    image.src = `./ressources/monsters/${name}.png`;
    return image;
  }

  loadField(name: string): HTMLImageElement {
    const image = new Image(800, 800);
    image.src = `./ressources/fields/${name}.png`;
    return image;
  }
}
