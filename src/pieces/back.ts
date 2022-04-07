import { Vec2 } from "@jscad/modeling/src/maths/types";
import { primitives, geometries } from "@jscad/modeling";

import { Measurements } from "../types/params";
import { getNeckWidth } from "./shared";

const { line } = primitives;
const { path2, geom2 } = geometries;

export const generateBackBlock = (params: Measurements) => {
  const { bustHeight, waistHeight, shoulderWidth } = params;

  const centerBackNeckPoint: Vec2 = [0, 1];
  const centerBackBustLine: Vec2 = [0, bustHeight];
  const centerBackWaistLine: Vec2 = [0, waistHeight];

  const centerBackLine = line([
    centerBackNeckPoint,
    centerBackBustLine,
    centerBackWaistLine,
  ]);

  const neckWidth = getNeckWidth(params);

  const upperShoulderPoint: Vec2 = [neckWidth / 2, 0];
  const shoulderSlopeAngle = Math.atan(1 / 7.5);
  const shoulderLength = (shoulderWidth - neckWidth) / 2;
  const lowerShoulderPoint: Vec2 = [
    shoulderWidth / 2,
    Math.sin(shoulderSlopeAngle) * shoulderLength,
  ];

  let backOutline = path2.create();
  backOutline = path2.appendPoints(
    [upperShoulderPoint, lowerShoulderPoint],
    centerBackLine
  );
  backOutline = path2.close(backOutline);

  return {
    backShort: backOutline,
  };
};
