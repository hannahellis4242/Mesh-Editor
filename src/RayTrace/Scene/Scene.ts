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
  translate(t: Vector): Shape {
    return this.translateScene(t);
  }
  translateScene(t: Vector): Scene {
    const newScene = new Scene(this.backround);
    this.shapes
      .map((s) => s.translate(t))
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
