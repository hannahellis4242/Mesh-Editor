import Vector, { cross, subtract, unit, scale, dot, add } from "./Vector";

export default class Triangle {
  public readonly normal: Vector;
  public readonly unitNormal: Vector;
  constructor(
    public readonly indices: [number, number, number],
    public readonly points: [Vector, Vector, Vector]
  ) {
    const p01 = subtract(this.points[1], this.points[0]);
    const p02 = subtract(this.points[2], this.points[0]);
    this.normal = cross(p01, p02);
    this.unitNormal = unit(this.normal);
  }
  contains(index: number): boolean {
    return this.indices.find((x) => x === index) !== undefined;
  }
}
