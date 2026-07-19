import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useVerBoletos } from "../hooks/useVerBoletos";

const getEmptyStateMessage = (activeTab: string): string => {
  if (activeTab === "compras") return "No tienes compras realizadas";
  if (activeTab === "etickets") return "No tienes e-tickets disponibles";
  return "No tienes devoluciones";
};

export default function VerBoletos() {
  const { isAuthenticated, activeTab, setActiveTab, compras, loading } =
    useVerBoletos();

  const renderContent = () => {
    if (activeTab === "compras" && compras.length > 0) {
      return (
        <div className="container my-4">
          <div className="row g-4">
            {compras.map((compra) => (
              <div className="col-md-6 col-lg-4" key={compra.idCompra}>
                <div className="card h-100 shadow-sm">
                  <div className="card-header bg-danger text-white">
                    <h6 className="mb-0 fw-bold">{compra.evento}</h6>
                  </div>
                  <div className="card-body">
                    <p className="card-text mb-1">
                      <strong>Fecha:</strong> {compra.fechaCompra}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Lugar:</strong> {compra.lugar}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Zona:</strong> {compra.zona} &middot; {compra.tipo}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Cantidad:</strong> {compra.cantidad}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Pago:</strong> {compra.metodoPago.replace("_", " ").toUpperCase()}
                    </p>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-danger fs-5">
                        S/ {compra.total.toFixed(2)}
                      </span>
                      <span
                        className={`badge ${compra.estado === "CONFIRMADA" ? "bg-success" : "bg-warning"}`}
                      >
                        {compra.estado}
                      </span>
                    </div>
                    <Link
                      to={`/boleto/${compra.idCompra}`}
                      className="btn btn-outline-danger btn-sm w-100 mt-3 d-flex align-items-center justify-content-center gap-2"
                    >
                      <FaEye /> Ver detalle
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="container text-center my-5 py-5">
        <h3 className="text-dark mb-3">
          {getEmptyStateMessage(activeTab)}
        </h3>
        <Link to="/" className="btn btn-danger px-4 fw-bold">
          Comprar Boletos
        </Link>
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="container py-5 text-center">
        <h2>Debes iniciar sesión para ver tus boletos</h2>
        <Link to="/login" className="btn btn-danger mt-3">
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <main className="container py-2 mb-5">
        <div className="d-flex justify-content-between align-items-center my-4">
          <h1 className="h3 text-dark">Mis Boletos</h1>

          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              COMPRAS & E-TICKETS
            </button>
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item" onClick={() => setActiveTab("compras")}>
                  MIS COMPRAS
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => setActiveTab("etickets")}>
                  E-TICKETS
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => setActiveTab("devoluciones")}>
                  MIS DEVOLUCIONES
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="row list-unstyled text-center bg-light m-0 p-0" role="tablist">
          <button
            type="button"
            className={`col-4 btn py-3 rounded-0 border-0 ${activeTab === "compras" ? "btn-dark" : "btn-outline-secondary"}`}
            role="tab"
            aria-selected={activeTab === "compras"}
            onClick={() => setActiveTab("compras")}
          >
            MIS COMPRAS
          </button>
          <button
            type="button"
            className={`col-4 btn py-3 rounded-0 border-0 ${activeTab === "etickets" ? "btn-dark" : "btn-outline-secondary"}`}
            role="tab"
            aria-selected={activeTab === "etickets"}
            onClick={() => setActiveTab("etickets")}
          >
            ETICKETS
          </button>
          <button
            type="button"
            className={`col-4 btn py-3 rounded-0 border-0 ${activeTab === "devoluciones" ? "btn-dark" : "btn-outline-secondary"}`}
            role="tab"
            aria-selected={activeTab === "devoluciones"}
            onClick={() => setActiveTab("devoluciones")}
          >
            MIS DEVOLUCIONES
          </button>
        </div>

        {loading ? (
          <div className="container text-center my-5 py-5">
            <div className="spinner-border text-danger mb-3" aria-label="Cargando">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <h3 className="text-dark mb-3">Cargando tus boletos...</h3>
          </div>
        ) : renderContent()}
      </main>
    </div>
  );
}
