import Colour from "../Mesh/Colour";

export interface Stroke {
  weight: number;
  colour: Colour;
}

export interface Normals extends Stroke {
  size: number;
}

export interface ColourAndSize {
  colour: Colour;
  size: number;
}

export default interface Config {
  fill?: Colour;
  stroke: Stroke;
  normals?: Normals;
  vertices?: ColourAndSize;
}
