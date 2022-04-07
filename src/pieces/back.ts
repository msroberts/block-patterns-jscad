import { Vec2 } from "@jscad/modeling/src/maths/types";
import { primitives } from "@jscad/modeling";

import { Measurements } from "../types/params";
import { getNeckWidth } from "./shared";

const { line } = primitives;

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
  const shoulderSlopeAngle = Math.atan(7.5 / -1);

  return {
    backShort: centerBackLine,
  };
};
