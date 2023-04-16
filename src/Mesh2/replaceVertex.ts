import Mesh from "./Mesh";
import Vector from "./Vector";
import buildMesh from "./buildMesh";
import getVertex from "./getVertex";

export interface ReplaceVertex {
  index: number;
  value: Vector;
}

const replaceVertex =
  ({ index, value }: ReplaceVertex) =>
  (mesh: Mesh): Mesh => {
    const found = getVertex(index)(mesh);
    if (!found) {
      return mesh;
    }
    return buildMesh(
      mesh.vertices.map((v, i) => (i === index ? value : v)),
      mesh.surfaces
    );
  };
export default replaceVertex;
