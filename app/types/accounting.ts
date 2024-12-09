export interface AccountingRecord {
  account_category: string;
  account_code: string;
  account_currency: string;
  account_identifier: string;
  account_name: string;
  account_status: string;
  account_type: string;
  account_type_bank: string;
  system_account: string;
  value_type: string;
  total_value: number;
}

export interface AccountingData {
  object_category: string;
  connection_id: string;
  user: string;
  object_creation_date: string;
  data: AccountingRecord[];
  currency: string;
  object_origin_type: string;
  object_origin_category: string;
  object_type: string;
  object_class: string;
  balance_date: string;
}

export interface AccountingMetrics {
  revenue: number;
  expenses: number;
  grossProfitMargin: number;
  netProfitMargin: number;
  workingCapitalRatio: number;
}

export interface FormattedMetrics {
  revenue: string;
  expenses: string;
  grossProfitMargin: string;
  netProfitMargin: string;
  workingCapitalRatio: string;
}
