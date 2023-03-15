import Vector from "./Vector";

export default interface Shape {
  getNormalAt(point: Vector): Vector | undefined;
}
