import { Outlet } from "react-router-dom";
import { PrivateHeader } from "../components/Header/PrivateHeader";

export function PrivateLayout() {
  return (
    <div className="app-shell">
      <PrivateHeader />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}
