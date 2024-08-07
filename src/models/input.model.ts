
export type DropdownInputProps = {
  label?: string;
  name: string;
  options: { label: string; key: string }[];
  rules?: any;
  disabled?: boolean;
  filter?: boolean;
  onChange?: any;
  EN?: boolean;
  invalid?: boolean;
  onSelected?: (values: any) => void;
  placeholder?: string;
  className?: string;
};



export type FloatInputProps = {
  label?: string;
  name: string;
  rules?: any;
  type?: string;
  mask?: string;
  placeholder?: string;
  EN?: boolean;
  disabled?: boolean;
  copyToClipboard?: boolean;
  suffix?: React.ReactNode;
  maxLength?: number;
  noSpace?: boolean;
  invalid?: boolean;
  error?: boolean;
  customSetValueFunction?: (value: string) => void;
  className?: string;
  icon?: React.ReactNode;
  IconFields?:boolean;
  autoFocus?: boolean;
  options?: { label: string; key: string }[];
  toggleMask?: boolean;  
  header?: React.ReactNode;  
  footer?: React.ReactNode; 
}

export type InputNumberProps = {
  label?: string;
  name: string;
  rules?: any;
  placeholder?: string;
  EN?: boolean;
  disabled?: boolean;
  copyToClipboard?: boolean;
  suffix?: string;
  prefix?: string;
  maxLength?: number;
  error?: boolean;
  className?: string;
  autoFocus?: boolean;

}
export type InputOtpProps = {
  label?: string;
  name: string;
  rules?: any;
  placeholder?: string;
  EN?: boolean;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  autoFocus?: boolean;
  length:number
}

