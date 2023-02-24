export abstract class ImageStore {
  abstract loadMonster(name: string): HTMLImageElement;
  abstract loadField(name: string): HTMLImageElement;
}
