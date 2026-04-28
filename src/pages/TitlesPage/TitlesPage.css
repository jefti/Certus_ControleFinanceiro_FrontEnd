.titles-page {
  --titles-ink: var(--color-primary-strong);
  --titles-ink-soft: #2f4558;
  --titles-accent: #2f6b94;
  --titles-accent-strong: #214f72;
  --titles-surface: rgba(255, 255, 255, 0.88);
  --titles-surface-strong: var(--color-surface);
  --titles-line: rgba(128, 146, 166, 0.22);
  --titles-text: #526578;
  --titles-muted: #7c8fa2;
  min-height: calc(100vh - var(--header-offset));
  padding: 32px 24px 64px;
  background:
    radial-gradient(circle at top left, rgba(196, 123, 82, 0.14), transparent 24%),
    radial-gradient(circle at top right, rgba(49, 95, 127, 0.16), transparent 28%),
    linear-gradient(180deg, #eef3f7 0%, var(--color-surface-soft) 100%);
}

.titles-page__main {
  width: var(--page-content-width);
  margin: 0 auto;
}

.titles-page__header {
  margin-bottom: 24px;
  padding: 6px 4px 0;
}

.titles-page__eyebrow {
  display: inline-block;
  margin-bottom: 10px;
  color: #2a5c7d;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.titles-page__title {
  margin: 0;
  color: var(--titles-ink);
  font-size: clamp(2rem, 3vw, 2.7rem);
  letter-spacing: -0.03em;
}

.titles-page__description {
  max-width: 720px;
  margin: 12px 0 0;
  color: var(--titles-text);
  line-height: 1.6;
  font-size: 1rem;
}

.titles-page__card {
  padding: 22px;
  background: var(--titles-surface);
  border: 1px solid var(--titles-line);
  border-radius: 22px;
  box-shadow:
    0 20px 38px rgba(18, 34, 48, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
}

.titles-page__card + .titles-page__card {
  margin-top: 24px;
}

.titles-page__form {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.titles-page__input {
  width: 100%;
  min-height: 50px;
  padding: 0 14px;
  border: 1px solid rgba(151, 166, 184, 0.34);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.96);
  color: var(--titles-ink);
  font: inherit;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.titles-page__input:focus {
  outline: none;
  border-color: rgba(196, 123, 82, 0.75);
  background: var(--titles-surface-strong);
  box-shadow:
    0 0 0 4px rgba(196, 123, 82, 0.14),
    0 10px 24px rgba(35, 52, 70, 0.08);
}

.titles-page__input::placeholder {
  color: var(--titles-muted);
}

.titles-page__input--wide {
  grid-column: span 2;
}

.titles-page__button {
  min-height: 50px;
  padding: 0 20px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--titles-accent) 0%, var(--titles-accent-strong) 100%);
  color: var(--color-surface);
  font: inherit;
  font-weight: 700;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    filter 0.2s ease;
}

.titles-page__button:hover {
  transform: translateY(-1px);
  filter: saturate(1.04);
  box-shadow: 0 14px 28px rgba(33, 79, 114, 0.28);
}

.titles-page__table-header {
  margin-bottom: 14px;
}

.titles-page__table-title {
  margin: 0;
  color: var(--titles-ink);
  font-size: 1.35rem;
  letter-spacing: -0.02em;
}

.titles-page__table-wrap {
  overflow-x: auto;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 18px;
  background: rgba(250, 252, 253, 0.92);
}

.titles-page__table {
  width: 100%;
  min-width: 820px;
  border-collapse: collapse;
  background: transparent;
}

.titles-page__table thead {
  background: linear-gradient(135deg, #203243 0%, #314c62 100%);
}

.titles-page__table th {
  color: var(--color-surface);
  font-size: 0.82rem;
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.titles-page__table th,
.titles-page__table td {
  padding: 15px 12px;
  border-bottom: 1px solid rgba(217, 225, 232, 0.78);
}

.titles-page__table td {
  text-align: center;
  color: var(--titles-ink-soft);
  background: rgba(255, 255, 255, 0.74);
}

.titles-page__empty {
  color: var(--titles-muted);
  font-weight: 600;
}

@media (max-width: 900px) {
  .titles-page__form {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .titles-page {
    padding: 24px 16px 48px;
  }

  .titles-page__card {
    padding: 18px;
  }

  .titles-page__form {
    grid-template-columns: 1fr;
  }

  .titles-page__input--wide {
    grid-column: span 1;
  }
}
