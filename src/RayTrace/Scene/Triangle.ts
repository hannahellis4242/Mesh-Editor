import Vector, { cross, subtract, unit } from "../../mesh/Vector";
import Ray from "./Ray";

export default class Triangle {
  public readonly unitNormal: Vector;
  constructor(public readonly points: [Vector, Vector, Vector]) {
    this.unitNormal = unit(
      cross(
        subtract(this.points[1], this.points[0]),
        subtract(this.points[2], this.points[0])
      )
    );
  }
  intersects(l: Ray) {}
}
