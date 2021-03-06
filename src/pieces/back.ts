import { Vec2 } from "@jscad/modeling/src/maths/types";
import { geometries, transforms } from "@jscad/modeling";

import { Measurements } from "../types/params";
import {
  getArmholeDepth,
  getChestWidth,
  getHipWidth,
  getShoulderPoints,
  getWaistDartPoints,
  getWaistWidth,
  HIP_HEIGHT,
} from "./shared";
import { appendSmoothCurve } from "../utils/curves";

const { mirrorY } = transforms;
const { path2 } = geometries;

export const generateBackBlock = (params: Measurements) => {
  const { bustHeight, waistHeight } = params;

  const centerBackNeckPoint: Vec2 = [0, 1];
  const centerBackBustLine: Vec2 = [0, bustHeight];
  const centerBackWaistLine: Vec2 = [0, waistHeight];
  const centerBackHipLine: Vec2 = [0, waistHeight + HIP_HEIGHT];

  const backHipPoint: Vec2 = [getHipWidth(params), centerBackHipLine[1]];

  const backWaistPoint: Vec2 = [getWaistWidth(params), centerBackWaistLine[1]];

  const { upperShoulderPoint, lowerShoulderPoint, shoulderSlopeAngle } =
    getShoulderPoints(params);

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

  backOutline = appendSmoothCurve(
    [
      {
        origin: backArmholePoint,
        angle: Math.PI,
        distance: ((backArmholePoint[0] - backArmholeHalfPoint[0]) * 3) / 4,
      },
      {
        origin: backArmholeHalfPoint,
        angle: (Math.PI * 3) / 2,
        distance: armholeDepth / 5,
      },
    ],
    backOutline
  );

  backOutline = path2.appendPoints(
    [lowerShoulderPoint, upperShoulderPoint],
    backOutline
  );

  backOutline = appendSmoothCurve(
    [
      {
        origin: upperShoulderPoint,
        angle: shoulderSlopeAngle * 2 + Math.PI / 2,
        distance: 2 / 3,
      },
      {
        origin: centerBackNeckPoint,
        angle: Math.PI,
        distance: upperShoulderPoint[0] / 2,
      },
    ],
    backOutline
  );

  backOutline = path2.close(backOutline);

  let backDart = path2.fromPoints({ closed: true }, getWaistDartPoints(params));

  return [backOutline, backDart].map((path) => mirrorY(path));
};
