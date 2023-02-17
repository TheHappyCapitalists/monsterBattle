export interface Position {
  x: number;
  y: number;
}

export class BasicsAngle {
  static left = Math.PI;
  static up = Math.PI / 2;
  static right = 0;
  static down = (Math.PI * 3) / 2;
  static bottomRight = (7 * Math.PI) / 4;
  static topLeft = (3 * Math.PI) / 4;
  static topRight = Math.PI / 4;
  static bottomLeft = (5 * Math.PI) / 4;
}
