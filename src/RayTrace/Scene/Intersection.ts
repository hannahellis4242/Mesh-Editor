import Vector from "./Vector";
import Ray from "./Ray";
import Shape from "./Shape";

export default interface Intersection {
  ray: Ray;
  shape: Shape;
  point: Vector;
  distance: number;
}
