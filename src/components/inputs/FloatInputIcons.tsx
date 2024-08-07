import { InputMask } from 'primereact/inputmask';
import { Password } from 'primereact/password';
import { Controller, useFormContext } from 'react-hook-form';
import { FloatInputProps } from '../../models/input.model';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
export default function FloatInputIcons({
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
    icon,
    IconFields
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
                                <>
                                    {IconFields ? (
                                        // เพิ่ม iconPosition="left" ใน IconField ถ้าต้องการให้ไอคอน อยู่ด้านซ้าย
                                        <IconField>
                                            <InputIcon>{icon}</InputIcon>
                                            <InputText
                                                id={name}
                                                type={type}
                                                {...field}
                                                value={value}
                                                placeholder={placeholder}
                                                disabled={disabled}
                                                maxLength={maxLength}
                                                className={`globals-input w-full  ${fieldState.invalid ? 'p-invalid !border-red-600' : ''}`}
                                            />
                                        </IconField>
                                    ) : (
                                        <div className="p-inputgroup flex-1 ">
                                            {/* {icon && <span className="p-inputgroup-addon  rounded-l-md mb-[1px]">{icon}</span>} */}
                                            <InputText
                                                id={name}
                                                type={type}
                                                {...field}
                                                value={value}
                                                placeholder={placeholder}
                                                disabled={disabled}
                                                maxLength={maxLength}
                                                className={`globals-input  ${fieldState.invalid ? 'p-invalid !border-red-600' : ''}`}
                                            />
                                            {/* สีพื้นหลัง ตั้งค่่า ที่ class .p-inputgroup-addon styles.css */}
                                            {icon && <span className="p-inputgroup-addon ">{icon}</span>}
                                        </div>

                                    )}

                                </>
                            );
                        case 'tel':
                            return (
                                <>
                                    {IconFields ? (
                                        // เพิ่ม iconPosition="left" ใน IconField ถ้าต้องการให้ไอคอน อยู่ด้านซ้าย
                                        <IconField>
                                            <InputIcon>{icon}</InputIcon>
                                            <InputMask
                                                id={name}
                                                value={value}
                                                onChange={(e) => field.onChange(e.value)}
                                                placeholder={placeholder}
                                                disabled={disabled}
                                                mask={mask}
                                                className={`globals-input w-full ${fieldState.invalid ? 'p-invalid !border-red-600' : ''}`}
                                            />
                                        </IconField>
                                    ) : (
                                        <div className="p-inputgroup flex-1 ">
                                            {/* {icon && <span className="p-inputgroup-addon  rounded-l-md mb-[1px]">{icon}</span>} */}
                                            <InputMask
                                                id={name}
                                                value={value}
                                                onChange={(e) => field.onChange(e.value)}
                                                placeholder={placeholder}
                                                disabled={disabled}
                                                mask={mask}
                                                className={`globals-input ${fieldState.invalid ? 'p-invalid !border-red-600' : ''}`}
                                            />
                                            {/* สีพื้นหลัง ตั้งค่่า ที่ class .p-inputgroup-addon styles.css */}
                                            {icon && <span className="p-inputgroup-addon ">{icon}</span>}
                                        </div>

                                    )}

                                </>

                            );
                        case 'password':
                            return (
                                <>
                                    {icon ? (
                                        <div className="p-inputgroup flex-1 ">
                                            {/* {icon && <span className="p-inputgroup-addon  rounded-l-md mb-[1px]">{icon}</span>} */}
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
                                                className={`border ${fieldState.invalid ? 'p-invalid !border-red-600' : ''}`}
                                            />
                                            {/* สีพื้นหลัง ตั้งค่่า ที่ class .p-inputgroup-addon styles.css */}
                                            {icon && <span className="p-inputgroup-addon ">{icon}</span>}
                                        </div>
                                    ) : (
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

                                    )}

                                </>

                            );
                        default:
                            return <div></div>;
                    }
                }}
            />
        </div>
    );
}
