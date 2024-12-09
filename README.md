<h1>Accounting Metrics Calculator</h1>
<p>This is a Next.js application that calculates and displays common accounting metrics from financial data. The application processes accounting records and displays key financial metrics including Revenue, Expenses, Gross Profit Margin, Net Profit Margin, and Working Capital Ratio.</p>
<h2>Features</h2>
<ul>
    <li>📊 Calculates 5 key financial metrics</li>
    <li>💰 Proper currency formatting</li>
    <li>📈 Percentage calculations with precise decimal places</li>
    <li>✅ Comprehensive test coverage</li>
    <li>🎨 Clean, modern UI using Tailwind CSS</li>
    <li>📱 Responsive design</li>
</ul>
<h2>Getting Started</h2>
<h3>Prerequisites</h3>
<ul>
    <li>Node.js (v18.x or higher)</li>
    <li>npm (v7.x or higher)</li>
</ul>
<h3>Installation</h3>
<ol>
    <li>Clone the repository:
        <pre><code>git clone &lt;your-repository-url&gt;
cd accounting-metrics</code></pre>
    </li>
    <li>Install dependencies:
        <pre><code>npm install</code></pre>
    </li>
    <li>Start the development server:
        <pre><code>npm run dev</code></pre>
    </li>
    <li>Open <a href="http://localhost:3000">http://localhost:3000</a> in your browser.</li>
</ol>
<h2>Project Structure</h2>
<pre>
accounting-metrics/
├── app/
│   ├── __tests__/
│   │   └── calculations.test.ts
│   ├── data/
│   │   └── data.json
│   ├── types/
│   │   └── accounting.ts
│   ├── utils/
│   │   └── calculations.ts
│   └── page.tsx
├── jest.config.ts
├── jest.setup.js
├── package.json
└── README.md
</pre>
<h2>Metric Calculations</h2>
<h3>Revenue</h3>
<ul>
    <li>Sum of all <code>total_value</code> fields where <code>account_category</code> is "revenue"</li>
</ul>
<h3>Expenses</h3>
<ul>
    <li>Sum of all <code>total_value</code> fields where <code>account_category</code> is "expense"</li>
</ul>
<h3>Gross Profit Margin</h3>
<ul>
    <li>Sum of all <code>total_value</code> fields where:
        <ul>
            <li><code>account_type</code> is "sales" OR</li>
            <li><code>value_type</code> is "debit"</li>
        </ul>
    </li>
    <li>Divided by total revenue</li>
    <li>Displayed as a percentage with one decimal place</li>
</ul>
<h3>Net Profit Margin</h3>
<ul>
    <li>Calculated as: (Revenue - Expenses) / Revenue</li>
    <li>Displayed as a percentage with one decimal place</li>
</ul>
<h3>Working Capital Ratio</h3>
<p><strong>Assets calculation:</strong></p>
<ul>
    <li>Adding <code>total_value</code> from records where:
        <ul>
            <li><code>account_category</code> is "assets"</li>
            <li><code>value_type</code> is "debit"</li>
            <li><code>account_type</code> is one of: "current", "bank", "current_accounts_receivable"</li>
        </ul>
    </li>
    <li>Subtracting <code>total_value</code> from records where:
        <ul>
            <li><code>account_category</code> is "assets"</li>
            <li><code>value_type</code> is "credit"</li>
            <li><code>account_type</code> is one of: "current", "bank", "current_accounts_receivable"</li>
        </ul>
    </li>
</ul>
<p><strong>Liabilities calculation:</strong></p>
<ul>
    <li>Adding <code>total_value</code> from records where:
        <ul>
            <li><code>account_category</code> is "liability"</li>
            <li><code>value_type</code> is "credit"</li>
            <li><code>account_type</code> is one of: "current", "current_accounts_payable"</li>
        </ul>
    </li>
    <li>Subtracting <code>total_value</code> from records where:
        <ul>
            <li><code>account_category</code> is "liability"</li>
            <li><code>value_type</code> is "debit"</li>
            <li><code>account_type</code> is one of: "current", "current_accounts_payable"</li>
        </ul>
    </li>
</ul>
<p><strong>Final ratio:</strong></p>
<ul>
    <li>Assets divided by Liabilities</li>
    <li>Displayed as a percentage with one decimal place</li>
</ul>
<h2>Running Tests</h2>
<p>Execute the test suite:</p>
<pre><code>npm test</code></pre>
<p>Run tests in watch mode:</p>
<pre><code>npm run test:watch</code></pre>
<h2>Formatting Requirements</h2>
<h3>Currency Values</h3>
<ul>
    <li>Prefixed with $ sign</li>
    <li>No decimal places</li>
    <li>Comma separators for thousands</li>
</ul>
<h3>Percentage Values</h3>
<ul>
    <li>One decimal place</li>
    <li>Prefixed with % sign</li>
    <li>Values are multiplied by 100 before display</li>
</ul>
<h2>Development</h2>
<h3>Available Scripts</h3>
<ul>
    <li><code>npm run dev</code>: Start development server</li>
    <li><code>npm run build</code>: Build the application</li>
    <li><code>npm run start</code>: Start production server</li>
    <li><code>npm run lint</code>: Run ESLint</li>
    <li><code>npm test</code>: Run tests</li>
    <li><code>npm run test:watch</code>: Run tests in watch mode</li>
</ul>
<h2>Technologies Used</h2>
<ul>
    <li>Next.js 14</li>
    <li>TypeScript</li>
    <li>Tailwind CSS</li>
    <li>Jest</li>
    <li>React Testing Library</li>
</ul>
<h2>Contributing</h2>
<ol>
    <li>Fork the repository</li>
    <li>Create your feature branch (<code>git checkout -b feature/amazing-feature</code>)</li>
    <li>Commit your changes (<code>git commit -m 'Add some amazing feature'</code>)</li>
    <li>Push to the branch (<code>git push origin feature/amazing-feature</code>)</li>
    <li>Open a Pull Request</li>
</ol>
<h2>License</h2>
<p>This project is licensed under the MIT License - see the LICENSE file for details.</p>
