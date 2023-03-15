import Vector, { cross, subtract, unit, scale, dot, add } from "../Vector";
import Ray from "../Ray";
import Intersection from "../Intersection";
import Shape from "../Shape";

export default class Triangle implements Shape {
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
  getNormalAt(_: Vector): Vector | undefined {
    return this.unitNormal;
  }
  intersects(l: Ray): Intersection | undefined {
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
    const point = l.point(t);
    return { ray: l, shape: this, point, distance: t };
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
