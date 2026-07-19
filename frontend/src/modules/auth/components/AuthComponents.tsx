import { FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import type { SuccessModalProps, LanguageSelectorProps, FormFieldProps } from "../interfaces/ComponentTypes";

export function SuccessModal({ title, body, buttonText, onNavigate }: SuccessModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <FaCheckCircle className="text-success mb-3" style={{ fontSize: "3rem" }} />
        <h2 className="fw-bold mb-1" style={{ color: "#333" }}>{title}</h2>
        <p className="text-muted mb-4">{body}</p>
        <button
          className="btn btn-success w-100 py-2 fw-bold"
          style={{ backgroundColor: "#198754", border: "none", borderRadius: "10px" }}
          onClick={onNavigate}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export function LanguageSelector({ language, onLanguageChange }: LanguageSelectorProps) {
  return (
    <fieldset className="mb-4 border-0 p-0" aria-label="Selección de idioma">
      <button
        type="button"
        className="px-2 btn btn-link text-decoration-none p-0"
        onClick={() => onLanguageChange("es")}
        style={{ fontWeight: language === "es" ? "bold" : "normal", color: language === "es" ? "#dc3545" : "black" }}
        aria-pressed={language === "es"}
      >
        ES
      </button>
      <span className="text-muted mx-1" aria-hidden="true">|</span>
      <button
        type="button"
        className="px-2 btn btn-link text-decoration-none p-0"
        onClick={() => onLanguageChange("en")}
        style={{ fontWeight: language === "en" ? "bold" : "normal", color: language === "en" ? "#dc3545" : "black" }}
        aria-pressed={language === "en"}
      >
        EN
      </button>
    </fieldset>
  );
}

export function FormField({ id, label, type, name, value, error, onChange, showToggle, toggleVisible, onToggle, toggleLabel }: FormFieldProps) {
  const inputType = showToggle && toggleVisible ? "text" : type;
  return (
    <div className="mb-3">
      <label htmlFor={id} className="fw-semibold text-muted small mb-1">{label}</label>
      <div className={showToggle ? "input-group" : undefined}>
        <input
          id={id}
          type={inputType}
          name={name}
          className={`form-control form-control-lg shadow-sm ${showToggle ? "border-end-0" : ""} ${error ? "is-invalid" : ""}`}
          value={value}
          onChange={onChange}
        />
        {showToggle && onToggle && (
          <button type="button" className="input-group-text bg-white border-start-0 shadow-sm" onClick={onToggle} aria-label={toggleLabel}>
            {toggleVisible ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
