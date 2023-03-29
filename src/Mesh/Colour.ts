export default class Colour {
  constructor(
    public readonly red: number,
    public readonly green: number,
    public readonly blue: number,
    public readonly alpha: number = 255
  ) {}
}

export const colours = {
  red: new Colour(255, 0, 0),
  green: new Colour(0, 255, 0),
  blue: new Colour(0, 0, 255),
  black: new Colour(0, 0, 0),
  white: new Colour(255, 255, 255),
};
