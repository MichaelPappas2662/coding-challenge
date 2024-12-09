import { AccountingRecord } from '../types/accounting';
import { AccountingCalculator } from '../utils/calculations';

describe("AccountingCalculator", () => {
  const testData: AccountingRecord[] = [
    {
      account_category: "revenue",
      account_code: "200",
      account_currency: "AUD",
      account_identifier: "test-id-1",
      account_name: "Sales",
      account_status: "ACTIVE",
      account_type: "sales",
      account_type_bank: "",
      system_account: "",
      value_type: "debit",
      total_value: 1000,
    },
    {
      account_category: "expense",
      account_code: "400",
      account_currency: "AUD",
      account_identifier: "test-id-2",
      account_name: "General Expense",
      account_status: "ACTIVE",
      account_type: "current",
      account_type_bank: "",
      system_account: "",
      value_type: "credit",
      total_value: 600,
    },
    {
      account_category: "assets",
      account_code: "090",
      account_currency: "AUD",
      account_identifier: "test-id-3",
      account_name: "Bank Account",
      account_status: "ACTIVE",
      account_type: "bank",
      account_type_bank: "BANK",
      system_account: "",
      value_type: "debit",
      total_value: 2000,
    },
    {
      account_category: "liability",
      account_code: "800",
      account_currency: "AUD",
      account_identifier: "test-id-4",
      account_name: "Current Liability",
      account_status: "ACTIVE",
      account_type: "current",
      account_type_bank: "",
      system_account: "",
      value_type: "credit",
      total_value: 1500,
    },
  ];

  const calculator = new AccountingCalculator(testData);

  describe("Basic Calculations", () => {
    test("calculates revenue correctly", () => {
      expect(calculator.calculateRevenue()).toBe(1000);
    });

    test("calculates expenses correctly", () => {
      expect(calculator.calculateExpenses()).toBe(600);
    });
  });

  describe("Formatting", () => {
    test("formats currency correctly", () => {
      const metrics = calculator.calculateMetrics();
      const formatted = calculator.formatMetrics(metrics);
      expect(formatted.revenue).toBe("$1,000");
      expect(formatted.expenses).toBe("$600");
    });

    test("formats percentages correctly", () => {
      const metrics = calculator.calculateMetrics();
      const formatted = calculator.formatMetrics(metrics);
      expect(formatted.netProfitMargin).toMatch(/^\d+\.\d%$/);
    });
  });

  describe("Ratio Calculations", () => {
    test("calculates net profit margin correctly", () => {
      const metrics = calculator.calculateMetrics();
      expect(metrics.netProfitMargin).toBe(0.4);
    });

    test("calculates working capital ratio correctly", () => {
      const metrics = calculator.calculateMetrics();
      expect(metrics.workingCapitalRatio).toBeCloseTo(1.33, 2);
    });
  });
});
