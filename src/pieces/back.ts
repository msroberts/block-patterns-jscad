import { Vec2 } from "@jscad/modeling/src/maths/types";
import { primitives, geometries } from "@jscad/modeling";

import { Measurements } from "../types/params";
import { getShoulderPoints, HIP_HEIGHT } from "./shared";

const { line } = primitives;
const { path2 } = geometries;

export const generateBackBlock = (params: Measurements) => {
  const { bustHeight, waistHeight, hipRound, ease } = params;

  const centerBackNeckPoint: Vec2 = [0, 1];
  const centerBackBustLine: Vec2 = [0, bustHeight];
  const centerBackWaistLine: Vec2 = [0, waistHeight];
  const centerBackHipLine: Vec2 = [0, waistHeight + HIP_HEIGHT];

  const centerBackLine = line([
    centerBackNeckPoint,
    centerBackBustLine,
    centerBackWaistLine,
    centerBackHipLine,
  ]);

  const backHipPoint: Vec2 = [
    (hipRound + (ease * 2) / 3) / 4,
    centerBackHipLine[1],
  ];

  let backOutline = path2.appendPoints([backHipPoint], centerBackLine);

  backOutline = path2.appendPoints(
    getShoulderPoints(params).reverse(),
    backOutline
  );
  backOutline = path2.close(backOutline);

  return {
    backShort: backOutline,
  };
};
