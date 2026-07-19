import { FaUserPlus } from "react-icons/fa";
import styles from "../styles/login.module.css";
import { useRegistro } from "../hooks/useRegistro";
import type { TextosRegistro } from "../interfaces/RegistroTypes";
import { SuccessModal, LanguageSelector, FormField } from "../components/AuthComponents";

const getRegistrationButtonText = (isLoading: boolean, language: string, t: TextosRegistro): string => {
  if (isLoading) {
    return language === "es" ? "Registrando..." : "Registering...";
  }
  return t.btn;
};

function Registro() {
  const {
    language, setLanguage, showPassword, setShowPassword, showConfirm, setShowConfirm,
    showSuccessModal, isLoading, fieldErrors, formData, error, t,
    handleChange, handleSubmit, handleNavigateLogin,
  } = useRegistro();

  return (
    <div className={`container-fluid p-0 ${styles.page}`}>
        {showSuccessModal && (
          <SuccessModal title={t.modalTitle} body={t.modalBody} buttonText={t.modalBtn} onNavigate={handleNavigateLogin} />
        )}

        <div className="row g-0 vh-100">
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-white p-4 shadow">
            <LanguageSelector language={language} onLanguageChange={setLanguage} />

            <form className={styles.formWrapper} onSubmit={handleSubmit} noValidate>
              <div className="text-center mb-4">
                <div className="badge bg-danger mb-2 px-3 py-2 text-uppercase">{t.badge}</div>
                <h2 className="fw-bold text-dark m-0">{t.welcome}</h2>
                <p className="text-muted small">{t.subtitle}</p>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <FormField id="nombre" label={t.name} type="text" name="nombre" value={formData.nombre} error={fieldErrors.nombre} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <FormField id="apellido" label={t.lastname} type="text" name="apellido" value={formData.apellido} error={fieldErrors.apellido} onChange={handleChange} />
                </div>
              </div>

              <FormField id="telefono" label={t.phone} type="tel" name="telefono" value={formData.telefono} error={fieldErrors.telefono} onChange={handleChange} />
              <FormField id="correo" label={t.email} type="email" name="correo" value={formData.correo} error={fieldErrors.correo} onChange={handleChange} />

              <div className="row">
                <div className="col-md-6">
                  <FormField id="contrasena" label={t.pass} type="password" name="contrasena" value={formData.contrasena} error={fieldErrors.contrasena} onChange={handleChange} showToggle toggleVisible={showPassword} onToggle={() => setShowPassword(!showPassword)} toggleLabel={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"} />
                </div>
                <div className="col-md-6">
                  <FormField id="confirmar" label={t.confirm} type="password" name="confirmar" value={formData.confirmar} error={fieldErrors.confirmar} onChange={handleChange} showToggle toggleVisible={showConfirm} onToggle={() => setShowConfirm(!showConfirm)} toggleLabel={showConfirm ? "Ocultar confirmación" : "Mostrar confirmación"} />
                </div>
              </div>

              {error && (
                <div className="alert alert-danger py-2 small text-center border-0 shadow-sm" role="alert">{error}</div>
              )}

              <button type="submit" className="btn btn-danger btn-lg w-100 mb-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2" disabled={isLoading}>
                {isLoading ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> : <FaUserPlus />}
                {getRegistrationButtonText(isLoading, language, t)}
              </button>

              <div className="text-center mt-3 pt-3 border-top">
                <button type="button" onClick={handleNavigateLogin} className="btn btn-link text-decoration-none small text-danger fw-bold p-0">{t.link}</button>
              </div>
            </form>
          </div>

          <div className="col-md-6 d-none d-md-block position-relative">
            <div className={styles.heroTextWrapper}>
              <h1 className="display-4 fw-bold m-0">TicketPlus+</h1>
              <p className="lead opacity-75">Tu entrada a los mejores eventos.</p>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Registro;
