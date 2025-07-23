import type { AttributeKey, Operator, QueryOperator, Values } from './filter';

export type ConversationFilterPost = {
  payload: Array<{
    attribute_key: AttributeKey;
    operator: Operator;
    values: Values;
    query_operator: QueryOperator;
  }>;
};
