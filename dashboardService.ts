import { Outlet } from "react-router-dom";
import { PublicHeader } from "../components/Header/PublicHeader";

export function PublicLayout() {
  return (
    <div className="app-shell">
      <PublicHeader />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}
