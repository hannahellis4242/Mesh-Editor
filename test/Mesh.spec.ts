import Vector, { equal, vec } from "../src/Mesh/Vector";

interface Mesh {
  readonly vertices: Vector[];
}

const unit = (): Mesh => ({
  vertices: [],
});

const build = (vertices: Vector[]): Mesh => ({ vertices });

//vertex crud
//create
const addVertex = (mesh: Mesh, vertex: Vector): Mesh => {
  const found = mesh.vertices.find((v) => equal(v, vertex));
  return found ? mesh : build(mesh.vertices.concat(vertex));
};
const addVertices = (mesh: Mesh, vertices: Vector[]): Mesh =>
  vertices.reduce((acc, v) => addVertex(acc, v), mesh);
//read
const getVertex = (mesh: Mesh, index: number): Vector | undefined =>
  mesh.vertices.at(index);
//edit
interface ReplaceVertex {
  index: number;
  value: Vector;
}
const replaceVertex = (mesh: Mesh, { index, value }: ReplaceVertex): Mesh => {
  const found = getVertex(mesh, index);
  if (!found) {
    return mesh;
  }
  return build(mesh.vertices.map((v, i) => (i === index ? value : v)));
};
//delete
const removeVertex = (mesh: Mesh, index: number): Mesh => {
  if (index < 0) {
    return mesh;
  }
  if (index >= mesh.vertices.length) {
    return mesh;
  }
  return build(mesh.vertices.filter((_, i) => i == index));
};

describe("Mesh", () => {
  describe("unit mesh", () => {
    const init = unit();
    it("should have no vertices", () => expect(init.vertices).toHaveLength(0));
  });
  describe("when adding a vertex to a unit mesh", () => {
    const init = unit();
    const mesh = addVertex(init, vec(1, 2, 3));
    it("should have one vertex", () => expect(mesh.vertices).toHaveLength(1));
    it("and it should have the same value as the vertex added", () => {
      const [vertex] = mesh.vertices;
      const { x, y, z } = vertex;
      expect(x).toBe(1);
      expect(y).toBe(2);
      expect(z).toBe(3);
    });
  });
  describe("adding two different vertices to a unit mesh", () => {
    const init = addVertex(unit(), vec(1, 2, 3));
    const mesh = addVertex(init, vec(2, 4, 9));
    it("should have two vertices", () => expect(mesh.vertices).toHaveLength(2));
    it("and it should contain the same value as the vertex added", () => {
      const { x, y, z } = mesh.vertices.at(-1)!;
      expect(x).toBe(2);
      expect(y).toBe(4);
      expect(z).toBe(9);
    });
  });
  describe("adding a second vertex that is the same as the first", () => {
    const init = addVertex(unit(), vec(1, 2, 3));
    const mesh = addVertex(init, vec(1, 2, 3));
    it("should have one vertex", () => expect(mesh.vertices).toHaveLength(1));
  });
  describe("adding mulitple verctices to the mesh", () => {
    const mesh = addVertices(unit(), [
      vec(1, 2, 3),
      vec(2, 3, 4),
      vec(3, 4, 5),
      vec(1, 2, 3),
      vec(4, 5, 6),
    ]);
    it("should have 4 vertices", () => {
      expect(mesh.vertices).toHaveLength(4);
    });
  });
  describe("getting a vertex from a mesh", () => {
    const init = addVertex(unit(), vec(1, 2, 3));
    it("should find the zeroth entry", () => {
      const value = getVertex(init, 0);
      expect(value).toBeDefined();
      if (value) {
        const { x, y, z } = value;
        expect(x).toBe(1);
        expect(y).toBe(2);
        expect(z).toBe(3);
      }
    });
  });
  describe("getting a vertex from a mesh that doesn't exist", () => {
    const init = addVertex(unit(), vec(1, 2, 3));
    it("should find the first entry", () => {
      const value = getVertex(init, 1);
      expect(value).toBeUndefined();
    });
  });
  describe("replacing a vertex", () => {
    const vertex = vec(1, 2, 3);
    const init = addVertex(unit(), vertex);
    it("should have one vertex with a new value", () => {
      const mesh = replaceVertex(init, { index: 0, value: vec(3, 2, 1) });
      expect(mesh.vertices).toHaveLength(1);
      const value = getVertex(mesh, 0);
      expect(value).toBeDefined();
      if (value) {
        const { x, y, z } = value;
        expect(x).toBe(3);
        expect(y).toBe(2);
        expect(z).toBe(1);
      }
    });
  });
  describe("removing an existing vertex from the mesh", () => {
    const init = addVertex(addVertex(unit(), vec(1, 2, 3)), vec(2, 3, 4));
    const mesh = removeVertex(init, 1);
    it("should now have only one vertex", () =>
      expect(mesh.vertices).toHaveLength(1));
  });
});
