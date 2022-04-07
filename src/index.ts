import { Measurements, DesignParameter } from "./types/params";
import { generateBackBlock } from "./pieces/back";
import { colors, transforms } from "@jscad/modeling";

const { colorize, cssColors } = colors;
const { scale } = transforms;

const IN_TO_MM = 25.4;

export const main = (params: Measurements) => {
  const backPieces = generateBackBlock(params).map((path) =>
    colorize(cssColors.blue, path)
  );

  return [...backPieces].map((path) =>
    scale([IN_TO_MM, IN_TO_MM, IN_TO_MM], path)
  );
};

export const getParameterDefinitions = () => {
  const parameters: DesignParameter[] = [
    {
      name: "chestRound",
      type: "number",
      initial: 30,
      caption: "Chest (round horizontal measurement, under arms)",
      step: 0.25,
      min: 0,
    },
    {
      name: "bustRound",
      type: "number",
      initial: 31,
      caption: "Bust (round horizontal measurement)",
      step: 0.25,
      min: 0,
    },
    {
      name: "hipRound",
      type: "number",
      initial: 35,
      caption: "Hip (round horizontal measurement)",
      step: 0.25,
      min: 0,
    },
    {
      name: "waistRound",
      type: "number",
      initial: 24,
      caption: "Waist (round horizontal measurement)",
      step: 0.25,
      min: 0,
    },
    {
      name: "armRound",
      type: "number",
      initial: 10,
      caption: "Arm (round horizontal measurement, highest part of arm)",
      step: 0.25,
      min: 0,
    },
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
    {
      name: "ease",
      type: "number",
      initial: 3,
      caption: "Pattern ease",
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
