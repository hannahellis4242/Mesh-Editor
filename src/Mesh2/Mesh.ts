import Triangle from "./Triangle";
import Vector from "./Vector";
import buildMesh from "./buildMesh";

export default interface Mesh {
  readonly vertices: Vector[];
  readonly surfaces: Triangle[];
}
