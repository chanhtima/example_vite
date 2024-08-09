import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from 'primereact/button';
import FloatInput from '../components/inputs/FloatInput';
import { Divider } from 'primereact/divider';
import FloatInputIcons from '../components/inputs/FloatInputIcons';
import DropdownInput from '../components/inputs/DropdownInput';
import CalendarBasic from '../components/inputs/CalendarBasic';
import InputNumber from '../components/inputs/InputNumber';
import InputOtps from '../components/inputs/InputOtpProps';
import { ensureHttp } from '../utils/ensureHttp';



type FormValues = {
    dropdown: string;
    name: string;
    email: string;
    tel: string;
    password: string;
    number: number;
};
function Form() {
    const defaultValues: FormValues = {
        // dropdown: "3",
        // name: "4339",
        // email: "admin@j.com",
        // tel: '09-517782236',
        // password:"123456",
        // number: 0,
        dropdown: "",
        name: "",
        email: "",
        tel: '',
        password: "",
        number: 0,
    };

    const methods = useForm<FormValues>({ defaultValues, shouldFocusError: true });
    const { handleSubmit, reset, } = methods;

    const options = [
        { label: 'Option 1', key: '1' },
        { label: 'Option 2', key: '2' },
        { label: 'Option 3', key: '3' },
    ];

    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );
    


    

    
    const onSubmit = (data: FormValues) => {
        console.log(data);
        reset(defaultValues);
        const formattedUrl = ensureHttp(data.name);
        console.log("Original URL:", data.name);
        console.log("Formatted URL:", formattedUrl);

    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="!grid grid-cols-1  md:grid-cols-3  gap-x-4 ">
                    <div className=" col-span-1">
                        <FloatInput
                            name="name"
                            label="Name"
                            type="text"
                            // rules={{ required: "Name is required." }}

                        />
                    </div>
                    <div className=" col-span-1">
                        <FloatInputIcons
                            name="nameIcon"
                            label="Input Icon"
                            type="text"
                            icon={(<i className="pi pi-user"></i>)}
                        // IconFields // ถ้าต้องการให้ ไอคคอนอยู่ใน  Fields
                        />
                    </div>

                    <div className=" col-span-1">


                        <FloatInput
                            name="password"
                            label="Password"
                            type="password"
                            toggleMask
                            header={passwordHeader}
                            footer={passwordFooter}
                            maxLength={8}
                        />
                    </div>
                    <div className=" col-span-1">


                        <FloatInput
                            name="tel"
                            label="Tel"
                            type="tel"
                            placeholder="06-12345678"
                            mask='99-99999999' // การจัดวางรูปแบบ เลข 9 หมายถึง พิมพืได้ 0-9 
                            // rules={{ required: "Tel is required." }}
                        />
                    </div>
                    <div className=" col-span-1">
                        <FloatInput
                            name="email"
                            label="Email"
                            type="email"
                            // rules={{
                            //     required: "Email is required.",
                            //     pattern: {
                            //         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            //         message: "Invalid email address. E.g. example@email.com",
                            //     },
                            // }}
                        />
                    </div>
                    <div className=" col-span-1">
                        <DropdownInput
                            name="dropdown"
                            label="Dropdown"
                            options={options}
                            placeholder="Select an option"
                            filter //ใช้สำหรับ เมื่อตต้องการพิมพ์ค้นหา ใน dropdown
                        />
                    </div>
                    <div className=" col-span-1">
                        <InputNumber
                            name="number"
                            label="Number"
                        />
                    </div>
                    <div className=" col-span-1 md:col-span-2">
                        <InputOtps
                            name="otp"
                            label="Otp"
                            length={12}
                            // rules={{ required: "Tel is required." }}
                        />
                    </div>
                    <div className=" col-span-1">
                        <CalendarBasic
                            name="calendar"
                            label="Calendar"
                        />
                    </div>
                </div>
                <FloatInput
                    name="textarea"
                    label="Textarea"
                    type="textarea"
                />
                <Button type="submit" className="bg-black text-white p-2 mt-4">บันทึก</Button>
            </form>
        </FormProvider>
    );
}

export default Form