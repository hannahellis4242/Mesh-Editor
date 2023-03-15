import Colour from "./Colour";
import Intersection from "./Intersection";
import Ray from "./Ray";
import Shape from "./Shape";

export default class Scene implements Shape {
  private shapes: Shape[];
  constructor(public readonly backround: Colour) {
    this.shapes = [];
  }
  intersections(ray: Ray): Intersection[] {
    return this.shapes.flatMap((shape) => shape.intersections(ray));
  }
  addShape(s: Shape) {
    this.shapes.push(s);
  }
}
