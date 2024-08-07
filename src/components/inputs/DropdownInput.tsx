import { Controller, useFormContext } from "react-hook-form";
import { DropdownInputProps } from "../../models/input.model";
import { Dropdown } from "primereact/dropdown";

export default 
function DropdownInput({
    label,
    name,
    options,
    rules,
    disabled = false,
    filter = false,
    EN = false,
    onSelected,
    className,
    onChange: onSelectedChange,
    placeholder
}: DropdownInputProps) {
    const { control } = useFormContext();

    const handleChange = (e: any) => {
        if (onSelectedChange) {
            onSelectedChange(e);
        }
        if (onSelected) {
            onSelected(e.value);
        }
    };

    return (
        <div className={`field globals-input-layout ${className}`}>
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
                render={({ field, fieldState }) => (
                    <Dropdown
                    className={`globals-input   ${fieldState.invalid ? 'p-invalid !border-red-600' : ''}`}
                        id={name}
                        {...field}
                        options={
                            options?.map((item) => ({
                              label: item.label,
                              value: item.key,
                            })) as any
                          }
                        disabled={disabled}
                        placeholder={placeholder || (EN ? "Please select the information." : "กรุณาเลือกข้อมูล")}
                        onChange={(e) => {
                            field.onChange(e.value);
                            handleChange(e);
                        }}
                        filter={filter}
                    />
                )}
            />
        </div>
    );
}