import { primitives } from "@jscad/modeling";
import { BlockParameters, DesignParameter } from "./types/params";

const { star } = primitives;

export const main = ({ param1 }: BlockParameters) => {
  const newStar = star({ outerRadius: param1, center: [2, 3] });

  return [newStar];
};

export const getParameterDefinitions = () => {
  const parameters: DesignParameter[] = [
    {
      name: "param1",
      type: "int",
      initial: 10,
      caption: "Parameter 1",
    },
  ];

  return parameters;
};
