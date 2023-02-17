export abstract class ImageStore {
  abstract load(name: string): HTMLImageElement;
}
