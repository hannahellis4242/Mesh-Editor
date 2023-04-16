import Triangle from "./Triangle";
import Vector from "./Vector";

export default interface Mesh {
  readonly vertices: Vector[];
  readonly surfaces: Triangle[];
  readonly normals: Vector[];
}
