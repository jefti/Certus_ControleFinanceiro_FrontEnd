.dashboard-container {
  width: 100%;
  max-width: var(--page-content-wide);
  margin: 0 auto;
  padding: 0 16px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.dashboard-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin: 0;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 16px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-border);
  border-top: 4px solid var(--color-info-strong);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-container p {
  font-size: 14px;
  color: var(--color-text-muted);
}

/* Financial Cards Grid */
.financial-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.financial-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 20px;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.financial-card:hover {
  box-shadow: var(--shadow-card-lg);
  transform: translateY(-2px);
}

.financial-card-income {
  border-left: 4px solid var(--color-success);
}

.financial-card-expense {
  border-left: 4px solid #ef4444;
}

.financial-card-balance {
  border-left: 4px solid var(--color-info-strong);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.card-title {
  font-size: 14px;
  color: var(--color-text-muted);
  margin: 0;
  font-weight: 500;
}

.card-percentage {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
}

.card-percentage.positive {
  background: #dcfce7;
  color: var(--color-success);
}

.card-percentage.negative {
  background: #fee2e2;
  color: #ef4444;
}

.card-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text-heading);
  margin: 0;
}

/* Dashboard Grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 32px;
}

@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-heading);
  margin: 0 0 16px 0;
}

/* Chart Container */
.chart-container {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 20px;
  box-shadow: var(--shadow-sm);
}

.chart-placeholder {
  overflow-x: auto;
}

.chart-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.chart-table thead {
  background: var(--color-surface-soft);
  border-bottom: 1px solid var(--color-border);
}

.chart-table th {
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: var(--color-text-muted);
}

.chart-table td {
  padding: 12px;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
}

.chart-table tr:hover {
  background: var(--color-surface-soft);
}

.value-positive {
  color: var(--color-success);
  font-weight: 600;
}

.value-negative {
  color: #ef4444;
  font-weight: 600;
}

/* Transactions Container */
.transactions-container {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 20px;
  box-shadow: var(--shadow-sm);
}

.transactions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.transaction-item:hover {
  background: var(--color-surface-soft);
  border-color: var(--color-border-muted);
}

.transaction-item.status-completed {
  border-left: 3px solid var(--color-success);
}

.transaction-item.status-pending {
  border-left: 3px solid #f59e0b;
}

.transaction-item.status-overdue {
  border-left: 3px solid #ef4444;
}

.transaction-info {
  flex: 1;
}

.transaction-description {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-heading);
  margin: 0 0 4px 0;
}

.transaction-date {
  font-size: 12px;
  color: var(--color-text-muted);
  margin: 0;
}

.transaction-details {
  text-align: right;
}

.transaction-amount {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text-heading);
  margin: 0 0 4px 0;
}

.transaction-amount.positive {
  color: var(--color-success);
}

.transaction-amount.negative {
  color: #ef4444;
}

.transaction-status {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: uppercase;
}

.transaction-status.status-completed {
  background: #dcfce7;
  color: var(--color-success);
}

.transaction-status.status-pending {
  background: #fef3c7;
  color: #b45309;
}

.transaction-status.status-overdue {
  background: #fee2e2;
  color: #dc2626;
}

.empty-message {
  text-align: center;
  padding: 20px;
  color: var(--color-text-muted);
  font-size: 13px;
}

/* Metrics Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.metric-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 16px;
  box-shadow: var(--shadow-sm);
  text-align: center;
}

.metric-label {
  font-size: 12px;
  color: var(--color-text-muted);
  margin: 0 0 8px 0;
  text-transform: uppercase;
  font-weight: 600;
}

.metric-value {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text-heading);
  margin: 0;
}

.metric-value.positive {
  color: var(--color-success);
}

/* Responsivo */
@media (max-width: 768px) {
  .financial-cards-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .chart-table {
    font-size: 12px;
  }

  .chart-table th,
  .chart-table td {
    padding: 8px;
  }

  .transaction-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .transaction-details {
    width: 100%;
    text-align: left;
    margin-top: 8px;
  }
}
