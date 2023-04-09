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

describe("Mesh", () => {
  describe("unit mesh", () => {
    const unitMesh = unit();
    it("should have no vertices", () =>
      expect(unitMesh.vertices).toHaveLength(0));
  });
  describe("when adding a vertex to a unit mesh", () => {
    const unitMesh = unit();
    const child = addVertex(unitMesh, vec(1, 2, 3));
    it("should have one vertex", () => expect(child.vertices).toHaveLength(1));
    it("and it should have the same value as the vertex added", () => {
      const [vertex] = child.vertices;
      const { x, y, z } = vertex;
      expect(x).toBe(1);
      expect(y).toBe(2);
      expect(z).toBe(3);
    });
  });
  describe("adding two different vertices to a unit mesh", () => {
    const init = addVertex(unit(), vec(1, 2, 3));
    const child = addVertex(init, vec(2, 4, 9));
    it("should have two vertices", () =>
      expect(child.vertices).toHaveLength(2));
    it("and it should contain the same value as the vertex added", () => {
      const { x, y, z } = child.vertices.at(-1)!;
      expect(x).toBe(2);
      expect(y).toBe(4);
      expect(z).toBe(9);
    });
  });
  describe("adding a second vertex that is the same as the first", () => {
    const init = addVertex(unit(), vec(1, 2, 3));
    const child2 = addVertex(init, vec(1, 2, 3));
    it("should have one vertex", () => expect(child2.vertices).toHaveLength(1));
  });
});
