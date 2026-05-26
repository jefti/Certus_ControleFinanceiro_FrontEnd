.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(18px);
  background: var(--color-surface-overlay);
  color: var(--color-text);
  border-bottom: 1px solid rgba(47, 74, 99, 0.18);
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
}

.app-header__inner {
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 18px;
  padding: 8px 22px;
}

.app-header--public .app-header__inner {
  display: flex;
  justify-content: space-between;
}

.app-header--public .app-header__nav {
  margin-left: auto;
}

.app-header__brand {
  display: inline-flex;
  align-items: center;
  gap: 0;
  min-width: fit-content;
  padding: 0;
}

.app-header__logo {
  height: 50px;
  width: auto;
  object-fit: contain;
}

.app-header__nav-group {
  display: flex;
  align-items: center;
  gap: 18px;
  min-width: 0;
}

.app-header__nav {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  width: fit-content;
  padding: 2px;
  border: 1px solid rgba(47, 74, 99, 0.06);
  border-radius: 999px;
  background: transparent;
  box-shadow: none;
}

.app-header__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 34px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 0.84rem;
  font-weight: 600;
  color: #32485d;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.app-header__link:hover,
.app-header__link:focus-visible {
  background: rgba(27, 46, 63, 0.08);
  color: var(--color-primary);
}

.app-header__link--button {
  border: none;
  background: transparent;
}

.app-header__caret {
  font-size: 0.72rem;
}

.app-header__dropdown {
  position: relative;
}

.app-header__dropdown-menu,
.app-header__profile-menu {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  min-width: 210px;
  padding: 8px;
  border: 1px solid rgba(47, 74, 99, 0.14);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 20px 48px rgba(15, 23, 42, 0.14);
  opacity: 0;
  visibility: hidden;
  transform: translateY(6px);
  transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s ease;
}

.app-header__dropdown:hover .app-header__dropdown-menu,
.app-header__dropdown:focus-within .app-header__dropdown-menu,
.app-header__profile:hover .app-header__profile-menu,
.app-header__profile:focus-within .app-header__profile-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.app-header__dropdown-item {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 38px;
  padding: 0 12px;
  border: none;
  border-radius: 12px;
  background: transparent;
  color: #32485d;
  font-size: 0.86rem;
  font-weight: 600;
  text-align: left;
}

.app-header__dropdown-item:hover,
.app-header__dropdown-item:focus-visible {
  background: rgba(27, 46, 63, 0.08);
  color: var(--color-primary);
}

.app-header__dropdown-item--disabled {
  cursor: not-allowed;
  color: #94a3b8;
}

.app-header__dropdown-item--disabled:hover,
.app-header__dropdown-item--disabled:focus-visible {
  background: transparent;
  color: #94a3b8;
}

.app-header__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  min-width: 102px;
  padding: 0 14px;
  border-radius: 999px;
  background: linear-gradient(135deg, #1b2e3f 0%, #2f4a63 100%);
  color: var(--color-surface);
  font-size: 0.82rem;
  font-weight: 600;
  box-shadow: 0 8px 18px rgba(27, 46, 63, 0.18);
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
}

.app-header__cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 34px rgba(27, 46, 63, 0.28);
  filter: brightness(1.04);
}

.app-header__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.app-header__profile {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px 4px 6px;
  border: 1px solid rgba(47, 74, 99, 0.14);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  outline: none;
}

.app-header__avatar {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1b2e3f 0%, #426888 100%);
  color: var(--color-surface);
  font-size: 0.76rem;
  font-weight: 700;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
}

.app-header__profile-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.app-header__profile-label {
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #7d8fa0;
}

.app-header__user {
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 700;
}

.app-header__profile-menu {
  left: auto;
  right: 0;
  min-width: 190px;
}

.app-header__dropdown-item--danger {
  color: #a53b3b;
}

.app-header__dropdown-item--danger:hover,
.app-header__dropdown-item--danger:focus-visible {
  background: rgba(165, 59, 59, 0.1);
  color: #8f2d2d;
}

@media (max-width: 900px) {
  .app-header__inner,
  .app-header__nav-group,
  .app-header__nav,
  .app-header__actions {
    gap: 12px;
  }

  .app-header__inner {
    grid-template-columns: auto 1fr auto;
    padding: 6px 16px;
  }

  .app-header__profile-label {
    display: none;
  }

  .app-header__link {
    padding: 0 10px;
    font-size: 0.84rem;
  }
}

@media (max-width: 720px) {
  .app-header__inner {
    display: flex;
    flex-wrap: wrap;
  }

  .app-header__nav-group {
    width: 100%;
    justify-content: space-between;
  }

  .app-header__nav {
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .app-header__actions {
    width: 100%;
    justify-content: flex-end;
  }
}
