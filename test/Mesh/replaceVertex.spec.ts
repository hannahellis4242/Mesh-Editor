import { vec } from "../../src/Mesh2/Vector";
import addVertex from "../../src/Mesh2/addVertex";
import getVertex from "../../src/Mesh2/getVertex";
import unitMesh from "../../src/Mesh2/unitMesh";
import replaceVertex from "../../src/Mesh2/replaceVertex";

describe("replacing a vertex", () => {
  const vertex = vec(1, 2, 3);
  const init = addVertex(vertex)(unitMesh());
  it("should have one vertex with a new value", () => {
    const mesh = replaceVertex({ index: 0, value: vec(3, 2, 1) })(init);
    expect(mesh.vertices).toHaveLength(1);
    const value = getVertex(0)(mesh);
    expect(value).toBeDefined();
    if (value) {
      const { x, y, z } = value;
      expect(x).toBe(3);
      expect(y).toBe(2);
      expect(z).toBe(1);
    }
  });
});
