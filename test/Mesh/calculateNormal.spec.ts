import { show, vec } from "../../src/Mesh2/Vector";
import calculateNormal from "../../src/Mesh2/calculateNormal";
describe("calculateNormal", () => {
  it.each([
    [vec(0, 0, 0), vec(1, 0, 0), vec(0, 1, 0), vec(0, 0, 1)],
    [vec(1, 0, 0), vec(0, 1, 0), vec(0, 0, 1), vec(1, 1, 1)],
  ])("test", (p0, p1, p2, expected) => {
    const normal = calculateNormal(p0, p1, p2);
    expect(normal.x).toBe(expected.x);
    expect(normal.y).toBe(expected.y);
    expect(normal.z).toBe(expected.z);
  });
});
