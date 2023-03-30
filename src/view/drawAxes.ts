import p5 from "p5";

const drawAxes = (size: number, weight: number) => (context: p5) => {
  context.push();
  context.strokeWeight(weight);
  //x-axis
  context.stroke(255, 0, 0);
  context.line(0, 0, 0, size, 0, 0);
  //y-axis
  context.stroke(0, 255, 0);
  context.line(0, 0, 0, 0, size, 0);
  //z-axis
  context.stroke(0, 0, 255);
  context.line(0, 0, 0, 0, 0, size);
  context.pop();
};
export default drawAxes;
