import Mesh from "./Mesh";
import Triangle from "./Triangle";
import Vector from "./Vector";

const buildMesh = (vertices: Vector[], surfaces: Triangle[]): Mesh => ({
  vertices,
  surfaces,
});

export default buildMesh;
