
import { Controller, useFormContext } from 'react-hook-form';
import { InputNumber as PrimeInputNumber } from 'primereact/inputnumber';
import { InputNumberProps } from '../../models/input.model';

export default function InputNumber({
    label,
    name,
    className,
    rules,
    placeholder,
    disabled,
    suffix,
    maxLength,
    prefix
}: InputNumberProps) {
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
                            <PrimeInputNumber
                                className={` rounded-md ${fieldState.invalid ? 'p-invalid !border-red-600' : ''}`}
                                id={name}
                                {...field}
                                value={value}
                                onChange={(e) => field.onChange(e.value)}
                                placeholder={placeholder}
                                disabled={disabled}
                                useGrouping={false}  //ถ้าต้องการ ให้ตัวเลข 1,000 ให้เอาอันนี้ออก
                                prefix={prefix} // หน่วยนับ หรือ ข้อความที่แสดงข้างหน้าตัวเลข
                                suffix={suffix} // หน่วยนับ หรือ ข้อความที่แสดงต่อท้ายตตัวเลข
                                maxLength={maxLength}
                                min={0}
                                // ถ้าต้องการใช้ปุ่มให้เปิดข้างล่าง
                                // showButtons  
                                // buttonLayout="horizontal" // แสดงไอคอน horizontal ซ้ายขาว  vertical ขึ้นลง
                                // step={1} 
                                //  incrementButtonIcon="pi pi-plus"  //icon ในการคลิกเพิ่มลง
                                //  decrementButtonIcon="pi pi-minus"
                            />
                           
                        </div>
                    );
                }}
            />
        </div>
    );
}
