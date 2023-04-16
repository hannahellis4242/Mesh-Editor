import Mesh from "./Mesh";
import Vector from "./Vector";
import addVertex from "./addVertex";

const addVertices =
  (vertices: Vector[]) =>
  (mesh: Mesh): Mesh =>
    vertices.reduce((acc, v) => addVertex(v)(acc), mesh);

export default addVertices;
