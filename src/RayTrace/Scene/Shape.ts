import Intersection from "./Intersection";
import Ray from "./Ray";
import Vector from "./Vector";

export default interface Shape {
  intersections(ray: Ray): Intersection[];
  transform(fn: (x: Vector) => Vector): Shape;
}
