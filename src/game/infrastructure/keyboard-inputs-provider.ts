import { InputProvider } from '../application/input-provider';
import { AnalogicInput } from '../domain/input';
import { BasicsAngle } from '../domain/position';

export class KeyboardInputsProvider implements InputProvider {
  private isKeyDownPressed: boolean = false;
  private isKeyUpPressed: boolean = false;
  private isKeyLeftPressed: boolean = false;
  private isKeyRightPressed: boolean = false;
  constructor() {
    this.mount();
  }

  mount() {
    window.addEventListener('keyup', (e) => {
      e.preventDefault();
      switch (e.key) {
        case 'ArrowDown':
          this.isKeyDownPressed = false;
          break;
        case 'ArrowUp':
          this.isKeyUpPressed = false;
          break;
        case 'ArrowRight':
          this.isKeyRightPressed = false;
          break;
        case 'ArrowLeft':
          this.isKeyLeftPressed = false;
          break;
      }
    });

    window.addEventListener('keydown', (e) => {
      e.preventDefault();
      switch (e.key) {
        case 'ArrowDown':
          this.isKeyDownPressed = true;
          break;
        case 'ArrowUp':
          this.isKeyUpPressed = true;
          break;
        case 'ArrowLeft':
          this.isKeyLeftPressed = true;
          break;
        case 'ArrowRight':
          this.isKeyRightPressed = true;
          break;
      }
    });
  }

  getInput() {
    const direction = this.getAnalogueDirection();
    return { analogicInput: direction };
  }

  getAnalogueDirection(): AnalogicInput {
    const isPressingOnlyLeft = this.isKeyLeftPressed && !this.isKeyRightPressed;
    const isPressingOnlyRight =
      this.isKeyRightPressed && !this.isKeyLeftPressed;
    const isPressingOnlyUp = this.isKeyUpPressed && !this.isKeyDownPressed;
    const isPressingOnlyDown = this.isKeyDownPressed && !this.isKeyUpPressed;

    switch (true) {
      case isPressingOnlyLeft && isPressingOnlyUp:
        return { intensity: 1, angle: BasicsAngle.topLeft };
      case isPressingOnlyLeft && isPressingOnlyDown:
        return { intensity: 1, angle: BasicsAngle.bottomLeft };
      case isPressingOnlyRight && isPressingOnlyUp:
        return { intensity: 1, angle: BasicsAngle.topRight };
      case isPressingOnlyRight && isPressingOnlyDown:
        return { intensity: 1, angle: BasicsAngle.bottomRight };
      case isPressingOnlyLeft:
        return { intensity: 1, angle: BasicsAngle.left };
      case isPressingOnlyRight:
        return { intensity: 1, angle: BasicsAngle.right };
      case isPressingOnlyDown:
        return { intensity: 1, angle: BasicsAngle.down };
      case isPressingOnlyUp:
        return { intensity: 1, angle: BasicsAngle.up };
      default:
        return { intensity: 0, angle: BasicsAngle.up };
    }
  }
}
