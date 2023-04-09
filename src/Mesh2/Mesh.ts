import Triangle, { Indices, equalTriangles, triangle } from "./Triangle";
import Vector, { equalVectors } from "./Vector";

export default interface Mesh {
  readonly vertices: Vector[];
  readonly surfaces: Triangle[];
}

export const unit = (): Mesh => ({
  vertices: [],
  surfaces: [],
});

export const build = (vertices: Vector[], surfaces: Triangle[]): Mesh => ({
  vertices,
  surfaces,
});

//vertex crud
//create
export const addVertex = (mesh: Mesh, vertex: Vector): Mesh => {
  const found = mesh.vertices.find((v) => equalVectors(v, vertex));
  return found ? mesh : build(mesh.vertices.concat(vertex), mesh.surfaces);
};
export const addVertices = (mesh: Mesh, vertices: Vector[]): Mesh =>
  vertices.reduce((acc, v) => addVertex(acc, v), mesh);
//read
export const getVertex = (mesh: Mesh, index: number): Vector | undefined =>
  mesh.vertices.at(index);
//edit
export interface ReplaceVertex {
  index: number;
  value: Vector;
}
export const replaceVertex = (
  mesh: Mesh,
  { index, value }: ReplaceVertex
): Mesh => {
  const found = getVertex(mesh, index);
  if (!found) {
    return mesh;
  }
  return build(
    mesh.vertices.map((v, i) => (i === index ? value : v)),
    mesh.surfaces
  );
};
//delete
export const removeVertex = (mesh: Mesh, index: number): Mesh => {
  if (index < 0) {
    return mesh;
  }
  if (index >= mesh.vertices.length) {
    return mesh;
  }
  return build(
    mesh.vertices.filter((_, i) => i == index),
    mesh.surfaces
  );
};

//surface crud
//create
export const addSurface = (mesh: Mesh, indices: Indices) => {
  //check all vertices exist
  const allExist = indices.every((x) => mesh.vertices.at(x));
  if (!allExist) {
    return mesh;
  }
  const surface = triangle(indices);
  //check we don't already have this surface
  const found = mesh.surfaces.find((x) => equalTriangles(x, surface));
  return found ? mesh : build(mesh.vertices, mesh.surfaces.concat(surface));
};
export const addSurfaces = (mesh: Mesh, indices: Indices[]) =>
  indices.reduce((acc, x) => addSurface(acc, x), mesh);
//read
export const getSurface = (mesh: Mesh, index: number): Triangle | undefined =>
  mesh.surfaces.at(index);
//update
export interface ReplaceSurface {
  index: number;
  value: Indices;
}
export const replaceSurface = (
  mesh: Mesh,
  { index, value }: ReplaceSurface
): Mesh => {
  return build(
    mesh.vertices,
    mesh.surfaces.map((v, i) => (i === index ? triangle(value) : v))
  );
};
//delete
