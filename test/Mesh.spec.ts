import Vector, { equal, vec } from "../src/Mesh/Vector";

interface Mesh {
  readonly vertices: Vector[];
}

const unit = (): Mesh => ({
  vertices: [],
});

const build = (vertices: Vector[]): Mesh => ({ vertices });

const addVertex = (parent: Mesh, vertex: Vector) => {
  const found = parent.vertices.find((v) => equal(v, vertex));
  return found ? parent : build(parent.vertices.concat(vertex));
};

const removeVertex = (parent: Mesh, index: number) => {
  if (index < 0) {
    return parent;
  }
  if (index >= parent.vertices.length) {
    return parent;
  }
  return build(parent.vertices.filter((_, i) => i == index));
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
  describe("removing an existing vertex from the mesh", () => {
    const init = addVertex(addVertex(unit(), vec(1, 2, 3)), vec(2, 3, 4));
    const mesh = removeVertex(init, 1);
    it("should now have only one vertex", () =>
      expect(mesh.vertices).toHaveLength(1));
  });
});
