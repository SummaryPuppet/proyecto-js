import { Link } from "react-router-dom";
import { useInicio } from "../hooks/useInicio";
import { formatFecha } from "../../../shared/utils/formatFecha";

export default function Inicio() {
  const { eventos, heroSlides } = useInicio();

  return (
    <div className="d-flex flex-column min-vh-100 bg-light index-page">
      <section className="hero">
        <div className="container-fluid p-0">
          <div
            id="heroCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="4500"
          >
            <div className="carousel-indicators">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  data-bs-target="#heroCarousel"
                  data-bs-slide-to={index}
                  className={slide.active ? "active" : ""}
                  aria-current={slide.active ? "true" : undefined}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="carousel-inner">
              {heroSlides.map((slide) => (
                <div
                  key={slide.id}
                  className={`carousel-item ${slide.active ? "active" : ""}`}
                >
                  <Link
                    to={slide.ruta}
                    className="d-block text-decoration-none"
                  >
                    <div className="position-relative">
                      <img
                        src={slide.banner}
                        className="d-block w-100 img-fluid"
                        alt={slide.titulo}
                        style={{
                          height: "clamp(420px, 70vh, 760px)",
                          objectFit: "cover",
                        }}
                      />
                      <div className="carousel-caption d-none d-md-block text-start">
                        <div
                          className="bg-dark bg-opacity-50 rounded-4 p-4"
                          style={{ maxWidth: "520px" }}
                        >
                          <p className="text-uppercase fw-semibold mb-2 text-warning">
                            {slide.ciudad} &middot; {slide.lugar}
                          </p>
                          <h2 className="display-6 fw-bold mb-2">
                            {slide.titulo}
                          </h2>
                          <p className="mb-1">{slide.descripcion}</p>
                          <p className="small mb-0 opacity-75">
                            {formatFecha(slide.fecha, slide.hora, "corto")} &middot; S/ {slide.precio}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              />
              <span className="visually-hidden">Anterior</span>
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              />
              <span className="visually-hidden">Siguiente</span>
            </button>
          </div>
        </div>
      </section>

      <main className="container my-4 flex-fill">
        <h3 className="pb-4">Eventos destacados</h3>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {eventos.map((evento) => (
            <div className="col" key={evento.id}>
              <div className="card h-100 border-0 shadow-sm overflow-hidden">
                <Link to={evento.ruta}>
                  <img
                    src={evento.img}
                    alt={evento.titulo}
                    className="card-img-top"
                    style={{ transition: "transform 0.3s" }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                    onFocus={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </Link>
                <div className="card-body">
                  <p
                    className="card-text mb-1 fw-bold"
                    style={{ color: "black", fontSize: "1.15rem" }}
                  >
                    {evento.titulo}
                  </p>
                  <p className="card-text text-secondary small mb-1">
                    {formatFecha(evento.fecha, evento.hora, "corto")} &middot; {evento.hora} hrs
                  </p>
                  <p className="card-text text-secondary small mb-2">
                    {evento.lugar} &middot; {evento.ciudad}
                  </p>
                  <span className="badge bg-danger">S/ {evento.precio}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
