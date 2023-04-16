import Mesh from "./Mesh";
import Vector from "./Vector";
import getVertex from "./getVertex";

const getVertices =
  (...indices: number[]) =>
  (mesh: Mesh): Vector[] | undefined => {
    const maybeVertices = indices.map((i) => getVertex(i)(mesh));
    if (maybeVertices.some((v) => !v)) {
      return undefined;
    }
    return maybeVertices.map((v) => v!);
  };

export default getVertices;
