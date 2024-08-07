import { Controller, useFormContext } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputMask } from 'primereact/inputmask';
import { FloatInputProps } from '../../models/input.model';
export default function FloatInput({
    label,
    name,
    className,
    rules,
    type = 'text',
    placeholder,
    disabled,
    maxLength,
    toggleMask,
    header,
    footer,
    mask,
}: FloatInputProps) {
    const { control } = useFormContext();

    return (
        <div className={`globals-input-layout ${className}`}>
            {label && (
                <label className='mb-1'>
                    {label}
                    {rules?.required && <span className="text-[#FF0000]"> *</span>}
                </label>
            )}
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState }) => {
                    const value = field.value ?? '';
                    switch (type) {
                        case 'text':
                        case 'email':
                            return (
                                <InputText
                                    id={name}
                                    type={type}
                                    {...field}
                                    value={value}
                                    placeholder={placeholder}
                                    disabled={disabled}
                                    maxLength={maxLength}
                                    className={`globals-input ${fieldState.invalid ? 'p-invalid !border-red-600' : ''}`}
                                />
                            );
                        case 'textarea':
                            return (
                                <InputTextarea
                                    id={name}
                                    {...field}
                                    value={value}
                                    placeholder={placeholder}
                                    disabled={disabled}
                                    maxLength={maxLength}
                                    rows={5} cols={30}
                                    className={`border rounded-md  ${fieldState.invalid ? 'p-invalid !border-red-600' : ''}`}
                                />
                            );
                        case 'tel':
                            return (
                                <InputMask
                                    id={name}
                                    value={value}
                                    onChange={(e) => field.onChange(e.value)}
                                    placeholder={placeholder}
                                    disabled={disabled}
                                    mask={mask}
                                    className={`globals-input ${fieldState.invalid ? 'p-invalid !border-red-600' : ''}`}
                                />
                            );
                        case 'password':
                            return (
                                <Password
                                    id={name.toString()}
                                    {...field}
                                    value={value}
                                    toggleMask={toggleMask}
                                    header={header}
                                    footer={footer}
                                    maxLength={maxLength}
                                    feedback={false} // ถ้าต้องการให้มี Popup ให้ เป็น  true หรือปิดไว้
                                    // ตั้งค่า ความสูง ความกว้าง ที่ styles.css
                                    className={`border rounded-md ${fieldState.invalid ? 'p-invalid !border-red-600' : ''}`}
                                />
                            );
                        default:
                            return <div></div>;
                    }
                }}
            />
        </div>
    );
}