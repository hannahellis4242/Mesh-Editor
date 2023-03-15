import Vector from "./Vector";

export default class SceneCoord implements Vector {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly z: number
  ) {}
}
