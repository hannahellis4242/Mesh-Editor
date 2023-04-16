import Mesh from "./Mesh";
import { Indices } from "./Triangle";
import addSurface from "./addSurface";

const addSurfaces =
  (...indices: Indices[]) =>
  (mesh: Mesh): Mesh =>
    indices.reduce((acc, x) => addSurface(x)(acc), mesh);
export default addSurfaces;
