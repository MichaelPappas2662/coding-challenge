import {
  AccountingMetrics,
  AccountingRecord,
  FormattedMetrics,
} from '../types/accounting';

export class AccountingCalculator {
  private data: AccountingRecord[];

  constructor(data: AccountingRecord[]) {
    this.data = data;
  }

  calculateRevenue(): number {
    return this.data
      .filter((record) => record.account_category === "revenue")
      .reduce((sum, record) => sum + record.total_value, 0);
  }

  calculateExpenses(): number {
    return this.data
      .filter((record) => record.account_category === "expense")
      .reduce((sum, record) => sum + record.total_value, 0);
  }

  calculateGrossProfitMargin(): number {
    const salesValue = this.data
      .filter(
        (record) =>
          record.value_type === "debit" || record.account_type === "sales"
      )
      .reduce((sum, record) => sum + record.total_value, 0);

    console.log(
      "Records used for sales value calculation:",
      this.data.filter(
        (record) =>
          record.value_type === "debit" || record.account_type === "sales"
      )
    );
    console.log("Total sales value:", salesValue);

    const revenue = this.calculateRevenue();
    console.log("Total revenue:", revenue);
    console.log("Gross profit margin:", salesValue / revenue);

    return revenue ? salesValue / revenue : 0;
  }

  calculateNetProfitMargin(): number {
    const revenue = this.calculateRevenue();
    const expenses = this.calculateExpenses();
    return revenue ? (revenue - expenses) / revenue : 0;
  }

  calculateWorkingCapitalRatio(): number {
    const assets = this.calculateAssets();
    const liabilities = this.calculateLiabilities();
    return liabilities ? assets / liabilities : 0;
  }

  private calculateAssets(): number {
    const validTypes = ["current", "bank", "current_accounts_receivable"];

    const debits = this.data
      .filter(
        (record) =>
          record.account_category === "assets" &&
          record.value_type === "debit" &&
          validTypes.includes(record.account_type)
      )
      .reduce((sum, record) => sum + record.total_value, 0);

    const credits = this.data
      .filter(
        (record) =>
          record.account_category === "assets" &&
          record.value_type === "credit" &&
          validTypes.includes(record.account_type)
      )
      .reduce((sum, record) => sum + record.total_value, 0);

    return debits - credits;
  }

  private calculateLiabilities(): number {
    const validTypes = ["current", "current_accounts_payable"];

    const credits = this.data
      .filter(
        (record) =>
          record.account_category === "liability" &&
          record.value_type === "credit" &&
          validTypes.includes(record.account_type)
      )
      .reduce((sum, record) => sum + record.total_value, 0);

    const debits = this.data
      .filter(
        (record) =>
          record.account_category === "liability" &&
          record.value_type === "debit" &&
          validTypes.includes(record.account_type)
      )
      .reduce((sum, record) => sum + record.total_value, 0);

    return credits - debits;
  }

  calculateMetrics(): AccountingMetrics {
    return {
      revenue: this.calculateRevenue(),
      expenses: this.calculateExpenses(),
      grossProfitMargin: this.calculateGrossProfitMargin(),
      netProfitMargin: this.calculateNetProfitMargin(),
      workingCapitalRatio: this.calculateWorkingCapitalRatio(),
    };
  }

  formatMetrics(metrics: AccountingMetrics): FormattedMetrics {
    return {
      revenue: this.formatCurrency(metrics.revenue),
      expenses: this.formatCurrency(metrics.expenses),
      grossProfitMargin: this.formatPercentage(metrics.grossProfitMargin),
      netProfitMargin: this.formatPercentage(metrics.netProfitMargin),
      workingCapitalRatio: this.formatPercentage(metrics.workingCapitalRatio),
    };
  }

  private formatCurrency(value: number): string {
    return `$${Math.floor(value).toLocaleString()}`;
  }

  private formatPercentage(value: number): string {
    return `${(value * 100).toFixed(1)}%`;
  }
}
