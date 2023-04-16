import Mesh from "./Mesh";
import Vector, { equalVectors } from "./Vector";
import buildMesh from "./buildMesh";

const addVertex =
  (vertex: Vector) =>
  (mesh: Mesh): Mesh => {
    const found = mesh.vertices.find((v) => equalVectors(v, vertex));
    return found
      ? mesh
      : buildMesh(mesh.vertices.concat(vertex), mesh.surfaces);
  };

export default addVertex;
