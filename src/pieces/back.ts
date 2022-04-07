import { Vec2 } from "@jscad/modeling/src/maths/types";
import { primitives, geometries } from "@jscad/modeling";

import { Measurements } from "../types/params";
import {
  getArmholeDepth,
  getChestWidth,
  getHipWidth,
  getShoulderPoints,
  getWaistWidth,
  HIP_HEIGHT,
} from "./shared";
import { appendSmoothCurve } from "../utils/curves";

const { line } = primitives;
const { path2 } = geometries;

export const generateBackBlock = (params: Measurements) => {
  const { bustHeight, waistHeight } = params;

  const centerBackNeckPoint: Vec2 = [0, 1];
  const centerBackBustLine: Vec2 = [0, bustHeight];
  const centerBackWaistLine: Vec2 = [0, waistHeight];
  const centerBackHipLine: Vec2 = [0, waistHeight + HIP_HEIGHT];

  const backHipPoint: Vec2 = [getHipWidth(params), centerBackHipLine[1]];

  const backWaistPoint: Vec2 = [getWaistWidth(params), centerBackWaistLine[1]];

  const [upperShoulderPoint, lowerShoulderPoint] = getShoulderPoints(params);

  const armholeDepth = getArmholeDepth(params);

  const centerBackChestLine: Vec2 = [0, lowerShoulderPoint[1] + armholeDepth];

  const backArmholePoint: Vec2 = [
    getChestWidth(params),
    centerBackChestLine[1],
  ];

  const backArmholeHalfPoint: Vec2 = [
    lowerShoulderPoint[0],
    lowerShoulderPoint[1] + armholeDepth / 2,
  ];

  let backOutline = path2.create([
    centerBackNeckPoint,
    centerBackChestLine,
    centerBackBustLine,
    centerBackWaistLine,
    centerBackHipLine,
  ]);

  backOutline = path2.appendPoints([backHipPoint], backOutline);

  backOutline = appendSmoothCurve(
    [
      {
        origin: backHipPoint,
        distance: (HIP_HEIGHT * 3) / 4,
        angle: (Math.PI * 3) / 2,
      },
      {
        origin: backWaistPoint,
        distance: HIP_HEIGHT / 4,
        angle: (Math.PI * 3) / 2,
      },
      {
        origin: backArmholePoint,
        distance: 0,
        angle: 0,
      },
    ],
    backOutline
  );

  backOutline = path2.appendPoints(
    [backArmholePoint, backArmholeHalfPoint],
    backOutline
  );

  backOutline = path2.appendPoints(
    [lowerShoulderPoint, upperShoulderPoint],
    backOutline
  );
  backOutline = path2.close(backOutline);

  return {
    backShort: backOutline,
  };
};
