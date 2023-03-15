import Vector, {
  cross,
  subtract,
  unit,
  scale,
  dot,
  add,
} from "../../mesh/Vector";
import Ray from "./Ray";

export interface IntersectionParams {
  t: number;
  u: number;
  v: number;
}

export default class Triangle {
  private readonly p01: Vector;
  private readonly p02: Vector;
  public readonly normal: Vector;
  public readonly unitNormal: Vector;
  constructor(public readonly points: [Vector, Vector, Vector]) {
    this.p01 = subtract(this.points[1], this.points[0]);
    this.p02 = subtract(this.points[2], this.points[0]);
    this.normal = cross(this.p01, this.p02);
    this.unitNormal = unit(this.normal);
  }
  intersects(l: Ray): IntersectionParams | undefined {
    const lab = scale(-1)(l.direction());
    const det = dot(lab, this.normal);
    if (det === 0) {
      return undefined;
    }
    const b = subtract(l.source, this.points[0]);
    const u = dot(cross(this.p02, lab), b) / det;
    if (u < 0 || u > 1) {
      return undefined;
    }
    const v = dot(cross(lab, this.p01), b) / det;
    if (v < 0 || v > 1) {
      return undefined;
    }
    if (u + v > 1) {
      return undefined;
    }
    const t = dot(this.normal, b) / det;
    return { t, u, v };
  }
  point(u: number, v: number): Vector | undefined {
    if (u < 0 || v < 0 || u + v > 1) {
      return undefined;
    }
    const a = scale(u)(this.p01);
    const b = scale(v)(this.p02);
    return add(this.points[0], add(a, b));
  }
}
