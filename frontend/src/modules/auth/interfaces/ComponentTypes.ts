export interface SuccessModalProps {
  readonly title: string;
  readonly body: string;
  readonly buttonText: string;
  readonly onNavigate: () => void;
}

export interface LanguageSelectorProps {
  readonly language: "es" | "en";
  readonly onLanguageChange: (lang: "es" | "en") => void;
}

export interface FormFieldProps {
  readonly id: string;
  readonly label: string;
  readonly type: string;
  readonly name: string;
  readonly value: string;
  readonly error?: string;
  readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly showToggle?: boolean;
  readonly toggleVisible?: boolean;
  readonly onToggle?: () => void;
  readonly toggleLabel?: string;
}
