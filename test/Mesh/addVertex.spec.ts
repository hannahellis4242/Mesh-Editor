import { unit } from "../../src/Mesh2/Mesh";
import { vec } from "../../src/Mesh2/Vector";
import addVertex from "../../src/Mesh2/addVertex";

describe("addVertex", () => {
  describe("when adding a vertex to a unit mesh", () => {
    const init = unit();
    const mesh = addVertex(vec(1, 2, 3))(init);
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
    const init = addVertex(vec(1, 2, 3))(unit());
    const mesh = addVertex(vec(2, 4, 9))(init);
    it("should have two vertices", () => expect(mesh.vertices).toHaveLength(2));
    it("and it should contain the same value as the vertex added", () => {
      const { x, y, z } = mesh.vertices.at(-1)!;
      expect(x).toBe(2);
      expect(y).toBe(4);
      expect(z).toBe(9);
    });
  });
  describe("adding a second vertex that is the same as the first", () => {
    const init = addVertex(vec(1, 2, 3))(unit());
    const mesh = addVertex(vec(1, 2, 3))(init);
    it("should have one vertex", () => expect(mesh.vertices).toHaveLength(1));
  });
});
