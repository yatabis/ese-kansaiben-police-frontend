export const RESULT_TYPE = {
  KANSAI: 'kansai',
  ESE: 'ese',
} as const;

export type Result = typeof RESULT_TYPE[keyof typeof RESULT_TYPE];

export interface ResultResponse {
  result: Result,
  kansai: number;
  ese: number;
}
