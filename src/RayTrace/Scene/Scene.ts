import Colour from "./Colour";
import Intersection from "./Intersection";
import Ray from "./Ray";
import Shape from "./Shape";
import Vector from "./Vector";

export default class Scene implements Shape {
  private shapes: Shape[];
  constructor(public readonly backround: Colour) {
    this.shapes = [];
  }
  transform(f: (v: Vector) => Vector): Shape {
    return this.transformScene(f);
  }
  transformScene(f: (v: Vector) => Vector): Scene {
    const newScene = new Scene(this.backround);
    this.shapes
      .map((s) => s.transform(f))
      .forEach((shape) => newScene.addShape(shape));
    return newScene;
  }
  intersections(ray: Ray): Intersection[] {
    return this.shapes.flatMap((shape) => shape.intersections(ray));
  }
  addShape(s: Shape) {
    this.shapes.push(s);
  }
}
