import { useLegal } from "../hooks/useLegal";

export default function LegalPage() {
  const { pageTitle } = useLegal();

  return (
    <div className="container py-5">
      <h1 className="mb-4">{pageTitle}</h1>
      <p className="text-muted">
        Esta página está en construcción. Próximamente encontrarás toda la información legal aquí.
      </p>
    </div>
  );
}
