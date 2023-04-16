import Mesh from "./Mesh";
import Vector from "./Vector";

const getVertex =
  (index: number) =>
  (mesh: Mesh): Vector | undefined =>
    mesh.vertices.at(index);
export default getVertex;
