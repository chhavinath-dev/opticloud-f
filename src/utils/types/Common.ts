
export interface CardProps {
  variant?: "primary" | "outline" | "secondary" | "light";
  className?: string;
  onClick?: () => void;
  role?: string;
}

export interface ButtonProps {
  label: string;
  variant?:
  | "primary"
  | "outline"
  | "secondary"
  | "dark"
  | "success"
  | "danger"
  | "outline-2"
  | "grey"
  | "yes"
  | "gradient";
  fullWidth?: boolean;
  width?: number;
  onClick?: () => void;
  iconProps?: JSX.Element | undefined;
  type: "button" | "submit" | "reset" | undefined;
  height?: number;
  disabled?: boolean;
}


