import { geometries, curves } from "@jscad/modeling";
import { Path2 } from "@jscad/modeling/src/geometries/types";
import { Vec2 } from "@jscad/modeling/src/maths/vec2";
import { pointAtAngle } from "./points";

const { path2 } = geometries;

export interface CurvePoint {
  origin: Vec2;
  angle: number;
  distance: number;
}

export const appendSmoothCurve = (curvePoints: CurvePoint[], path: Path2) => {
  for (let i = 1; i < curvePoints.length; i++) {
    const start = curvePoints[i - 1];
    const end = curvePoints[i];

    const controlPoints = [
      start.origin,
      pointAtAngle(start.origin, start.angle, start.distance),
      pointAtAngle(end.origin, end.angle, -end.distance),
      end.origin,
    ];

    console.log(controlPoints);

    path = path2.appendBezier({ controlPoints, segments: 4 }, path);
  }

  return path;
};
