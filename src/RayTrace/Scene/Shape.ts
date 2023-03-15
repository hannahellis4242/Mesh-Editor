import Intersection from "./Intersection";
import Ray from "./Ray";

export default interface Shape {
  intersections(ray: Ray): Intersection[];
}
