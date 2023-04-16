import Mesh from "./Mesh";
import Vector from "./Vector";

const getNormal =
  (index: number) =>
  (mesh: Mesh): Vector | undefined =>
    mesh.normals.at(index);
export default getNormal;
