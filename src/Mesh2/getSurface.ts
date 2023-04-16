import Mesh from "./Mesh";
import Triangle from "./Triangle";

const getSurface =
  (index: number) =>
  (mesh: Mesh): Triangle | undefined =>
    mesh.surfaces.at(index);

export default getSurface;
