import unitMesh from "../../src/Mesh2/unitMesh";

describe("unit mesh", () => {
  const init = unitMesh();
  it("should have no vertices", () => expect(init.vertices).toHaveLength(0));
  it("should have no surfaces", () => expect(init.surfaces).toHaveLength(0));
});
