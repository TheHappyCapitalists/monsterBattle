import { ImageStore } from './image-store';

export class LocalImageStore implements ImageStore {
  load(name: string): HTMLImageElement {
    const image = new Image(50, 50);
    image.src = `./ressources/${name}.png`;
    return image;
  }
}
