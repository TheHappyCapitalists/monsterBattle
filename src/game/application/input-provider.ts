import { InputsState } from '../domain/input';

export abstract class InputProvider {
  abstract getInput(): InputsState;
}
