import { InputOtp } from 'primereact/inputotp';
import { Controller, useFormContext } from 'react-hook-form';
import { InputOtpProps } from '../../models/input.model';
export default function InputOtps({
    label,
    name,
    className,
    rules,
    placeholder,
    disabled,
    length
}: InputOtpProps) {
    const { control } = useFormContext();

    return (
        <div className={`globals-input-layout ${className}`}>
            {label && (
                <label htmlFor={name} className='mb-1'>
                    {label}
                    {rules?.required && <span className="text-[#FF0000]"> *</span>}
                </label>
            )}
            <Controller
                name={name}
                control={control}
                rules={rules}
                
                render={({ field, fieldState }) => {
                    const value = field.value === 'number' ? field.value : 0;

                    return (
                        <div>
                            <InputOtp
                                className={`${fieldState.invalid ? 'p-invalid !border-red-600' : ''}`}
                                id={name}
                                {...field}
                                value={value}
                                onChange={(e) => field.onChange(e.value)}
                                placeholder={placeholder}
                                disabled={disabled}
                                length={length}
                                min={0}
                               
                            />
                           
                        </div>
                    );
                }}
            />
        </div>
    );
}
