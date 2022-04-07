import { Vec2 } from "@jscad/modeling/src/maths/types";
import { primitives, geometries } from "@jscad/modeling";

import { Measurements } from "../types/params";
import { getShoulderPoints } from "./shared";

const { line } = primitives;
const { path2 } = geometries;

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

  let backOutline = path2.create();
  backOutline = path2.appendPoints(getShoulderPoints(params), centerBackLine);
  backOutline = path2.close(backOutline);

  return {
    backShort: backOutline,
  };
};
