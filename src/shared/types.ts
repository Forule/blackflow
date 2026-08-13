export type PlanId = 'monthly' | 'yearly';

export interface RegisterInput {
  username: string;
  email: string;
  plan: PlanId;
}

export interface Account {
  username: string;
  email: string;
  password: string;
  planName: string;
  planAmount: string;
  start: string;
  renewal: string;
}