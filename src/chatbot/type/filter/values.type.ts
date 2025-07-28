import type { Operator } from './operator.type';

export type Values = {
  [Operator.equals]: string | number | boolean;
  [Operator.not_equals]: string | number | boolean;
  [Operator.contains]: string | number | boolean;
  [Operator.does_not_contain]: string | number | boolean;
  [Operator.is_present]: null;
  [Operator.is_not_present]: null;
  [Operator.is_greater_than]: Date;
  [Operator.is_less_than]: Date;
  [Operator.is_x_days_before]: Date;
};
