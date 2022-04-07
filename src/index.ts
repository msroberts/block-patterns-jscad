import { Measurements, DesignParameter } from "./types/params";
import { generateBackBlock } from "./pieces/back";

export const main = (params: Measurements) => {
  const { backShort } = generateBackBlock(params);

  return [backShort];
};

export const getParameterDefinitions = () => {
  const parameters: DesignParameter[] = [
    {
      name: "shoulderWidth",
      type: "number",
      initial: 14.5,
      caption: "Horizontal width across back at shoulder",
      step: 0.25,
      min: 0,
    },
    {
      name: "bustHeight",
      type: "number",
      initial: 9,
      caption: "Length from middle of shoulder to bust point",
      step: 0.25,
      min: 0,
    },
    {
      name: "waistHeight",
      type: "number",
      initial: 17,
      caption: "Length from middle of shoulder over bust point to waist",
      step: 0.25,
      min: 0,
    },
  ];

  return parameters;
};

const defaultMeasurements: Measurements = {
  chestRound: 30,
  bustRound: 31,
  waistRound: 24,
  hipRound: 35,
  armRound: 10,

  shoulderWidth: 14.5,

  bustHeight: 9,
  waistHeight: 17,
  waistHeightBack: 16,

  ease: 3,
  sleeveLength: 5,
};
