import Vector, { add, scale, subtract } from "../../mesh/Vector";

export default class Ray {
  constructor(public readonly source: Vector, public readonly target: Vector) {}
  direction(): Vector {
    return subtract(this.target, this.source);
  }
  point(t: number): Vector {
    return add(scale(1 - t)(this.source), scale(t)(this.target));
  }
}
