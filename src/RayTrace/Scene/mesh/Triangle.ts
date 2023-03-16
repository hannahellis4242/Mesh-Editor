import Vector, { cross, subtract, unit, scale, dot, add } from "../Vector";
import Ray from "../Ray";
import Intersection from "../Intersection";
import Shape from "../Shape";
import Colour from "../Colour";

export default class Triangle implements Shape {
  private readonly p01: Vector;
  private readonly p02: Vector;
  public readonly normal: Vector;
  public readonly unitNormal: Vector;
  constructor(
    public readonly points: [Vector, Vector, Vector],
    public readonly colour: Colour
  ) {
    this.p01 = subtract(this.points[1], this.points[0]);
    this.p02 = subtract(this.points[2], this.points[0]);
    this.normal = cross(this.p01, this.p02);
    this.unitNormal = unit(this.normal);
  }
  transform(f: (v: Vector) => Vector): Shape {
    const [p1, p2, p3] = this.points;
    const newPoints: [Vector, Vector, Vector] = [f(p1), f(p2), f(p3)];
    return new Triangle(newPoints, this.colour);
  }
  intersections(l: Ray): Intersection[] {
    const lab = scale(-1)(l.direction());
    const det = dot(lab, this.normal);
    if (det === 0) {
      return [];
    }
    const b = subtract(l.source, this.points[0]);
    const u = dot(cross(this.p02, lab), b) / det;
    if (u < 0 || u > 1) {
      return [];
    }
    const v = dot(cross(lab, this.p01), b) / det;
    if (v < 0 || v > 1) {
      return [];
    }
    if (u + v > 1) {
      return [];
    }
    const t = dot(this.normal, b) / det;
    const point = l.point(t);
    return [
      {
        ray: l,
        shape: this,
        normal: this.unitNormal,
        baseColour: this.colour,
        point,
        distance: t,
      },
    ];
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
