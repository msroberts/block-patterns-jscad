export interface Measurements {
  chestRound: number;
  bustRound: number;
  waistRound: number;
  hipRound: number;
  armRound: number;

  shoulderWidth: number;

  bustHeight: number;
  waistHeight: number;
  waistHeightBack: number;

  ease: number;
  sleeveLength: number;
}

export interface DesignParameter {
  name: string;
  type: string;
  initial: number;
  caption: string;
  step?: number;
  min?: number;
}
