import { BasicsAngle } from './position';

export type AnalogicInput = { intensity: number; angle: number };

export type InputsState = {
  analogicInput: AnalogicInput;
};

export class InputStateBuilder {
  constructor(
    private analogicInput: { intensity: number; angle: number } = {
      intensity: 0,
      angle: 0,
    },
  ) {}

  withAnalogicInput(intensity: number, angle: number) {
    this.analogicInput = { intensity, angle };
    return this;
  }

  build() {
    return {
      analogicInput: {
        intensity: this.analogicInput.intensity,
        angle: this.analogicInput.angle,
      },
    };
  }
}

export class InputFixture {
  static neutralInput = new InputStateBuilder().build();
  static turnLeftInput = new InputStateBuilder()
    .withAnalogicInput(1, BasicsAngle.left)
    .build();
  static turnRightInput = new InputStateBuilder()
    .withAnalogicInput(1, BasicsAngle.right)
    .build();
  static bottomRightInput = new InputStateBuilder()
    .withAnalogicInput(1, BasicsAngle.bottomRight)
    .build();
}
