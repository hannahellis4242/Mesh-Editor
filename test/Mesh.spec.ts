import Vector, { equal, vec } from "../src/Mesh/Vector";

class Mesh {
  constructor(public readonly vertices: Vector[] = []) {}
}

const addVertex = (parent: Mesh, vertex: Vector) => {
  const found = parent.vertices.find((v) => equal(v, vertex));
  return found ? parent : new Mesh(parent.vertices.concat(vertex));
};

describe("Mesh", () => {
  describe("top level", () => {
    const topLevel = new Mesh();
    it("should have no vertices", () =>
      expect(topLevel.vertices).toHaveLength(0));
    describe("adding a vertex", () => {
      const child = addVertex(topLevel, vec(1, 2, 3));
      it("should have one vertex", () =>
        expect(child.vertices).toHaveLength(1));
      it("and it should have the same value as the vertex added", () => {
        const [vertex] = child.vertices;
        const { x, y, z } = vertex;
        expect(x).toBe(1);
        expect(y).toBe(2);
        expect(z).toBe(3);
      });
      describe("adding a second vertex", () => {
        const child2 = addVertex(child, vec(2, 4, 9));
        it("should have two vertices", () =>
          expect(child2.vertices).toHaveLength(2));
        it("and it should contain the same value as the vertex added", () => {
          const { x, y, z } = child2.vertices.at(-1)!;
          expect(x).toBe(2);
          expect(y).toBe(4);
          expect(z).toBe(9);
        });
      });
      describe("adding a second vertex that is the same as the first", () => {
        const child2 = addVertex(child, vec(1, 2, 3));
        it("should have one vertex", () =>
          expect(child2.vertices).toHaveLength(1));
      });
    });
  });
});
