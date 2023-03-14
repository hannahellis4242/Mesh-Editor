import CanvasCoord from "../src/RayTrace/Canvas/CanvasCoord";
import CanvasParams from "../src/RayTrace/Canvas/CanvasParams";
import canvasCoordsToSceneCoords from "../src/RayTrace/canvasCoordsToSceneCoords";

describe("canvasCoordToSceneCoord", () => {
  describe("when given a Canvas at depth zero", () => {
    const depth = 0;
    describe("and the canvas has width 20 and height 10", () => {
      const width = 20;
      const height = 10;
      const canvas = new CanvasParams(width, height, depth);
      describe("and the canvas coordinate of (width/2,height/2)", () => {
        const canvasCoord = new CanvasCoord(width / 2, height / 2);
        it("should give back the SceenCoord (0,0,0)", () => {
          const result = canvasCoordsToSceneCoords(canvas)(canvasCoord);
          expect(result.x).toBe(0);
          expect(result.y).toBe(0);
          expect(result.z).toBe(0);
        });
      });
    });
  });
});
