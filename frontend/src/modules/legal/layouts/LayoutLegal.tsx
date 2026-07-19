import { Outlet } from "react-router-dom";

export default function LayoutLegal() {
  return (
    <main className="flex-fill">
      <Outlet />
    </main>
  );
}
