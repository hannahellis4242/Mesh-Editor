import Mesh from "./Mesh";
import Vector, { equalVectors } from "./Vector";
import buildMesh from "./buildMesh";

const add =
  (vertex: Vector) =>
  (mesh: Mesh): Mesh => {
    const found = mesh.vertices.find((v) => equalVectors(v, vertex));
    return found
      ? mesh
      : buildMesh(mesh.vertices.concat(vertex), mesh.surfaces);
  };

const addVertex =
  (...vertices: Vector[]) =>
  (mesh: Mesh): Mesh =>
    vertices.reduce((acc, v) => add(v)(acc), mesh);

export default addVertex;
