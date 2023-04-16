import { unit } from "../../src/Mesh2/Mesh";
import { vec } from "../../src/Mesh2/Vector";
import addVertices from "../../src/Mesh2/addVertices";

describe("addVertices", () => {
  describe("adding mulitple verctices to the mesh", () => {
    const mesh = addVertices([
      vec(1, 2, 3),
      vec(2, 3, 4),
      vec(3, 4, 5),
      vec(1, 2, 3),
      vec(4, 5, 6),
    ])(unit());
    it("should have 4 vertices", () => {
      expect(mesh.vertices).toHaveLength(4);
    });
  });
});
