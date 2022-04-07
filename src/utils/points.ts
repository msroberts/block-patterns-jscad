import { Vec2 } from "@jscad/modeling/src/maths/vec2";

export const pointAtAngle = (origin: Vec2, angle: number, distance: number) => {
  return [
    origin[0] + Math.cos(angle) * distance,
    origin[1] + Math.sin(angle) * distance,
  ] as Vec2;
};
