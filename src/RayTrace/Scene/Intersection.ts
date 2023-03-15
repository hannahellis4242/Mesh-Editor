import Vector from "./Vector";
import Ray from "./Ray";
import Shape from "./Shape";
import Colour from "./Colour";

export default interface Intersection {
  ray: Ray;
  shape: Shape;
  normal: Vector;
  baseColour: Colour;
  point: Vector;
  distance: number;
}
