import matrix3, { det } from "../../lin-alg/matrix3";
import Vector, { cross, subtract, unit } from "../../mesh/Vector";
import Ray from "./Ray";

export interface IntersectionParams {
  t: number;
  u: number;
  v: number;
}

export default class Triangle {
  private readonly p01: Vector;
  private readonly p02: Vector;
  public readonly unitNormal: Vector;
  constructor(public readonly points: [Vector, Vector, Vector]) {
    this.p01 = subtract(this.points[1], this.points[0]);
    this.p02 = subtract(this.points[2], this.points[0]);
    this.unitNormal = unit(cross(this.p01, this.p02));
  }
  intersects(l: Ray): boolean {
    const lab = l.direction();
    const m: matrix3 = [
      -lab.x,
      this.p01.x,
      this.p02.x,
      -lab.y,
      this.p01.y,
      this.p02.y,
      -lab.z,
      this.p01.x,
      this.p02.z,
    ];
    if (det(m) === 0) {
      return false;
    }
    //TODO do more here
    return false;
  }
}
