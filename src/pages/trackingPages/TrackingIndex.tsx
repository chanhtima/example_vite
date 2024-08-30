import { Button } from "primereact/button";
import { Card } from "primereact/card";
import TableBasic from "../../components/table/TableBasic";
import { useEffect, useState } from "react";
import { ColumnMeta } from "../../models/table.model";
import { trackingModel } from "../../models/tracking.model";
import { Image } from "primereact/image";
import TrackApi from "../../services/api/tracking.api";
import ConvertDate from "../../utils/ConvertDate";

export default function Tracking() {
  const [data, setData] = useState<trackingModel[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const columns: ColumnMeta<trackingModel>[] = [
    { field: 'end_date', header: 'วันที่สิ้นสุด', className:'' ,
      render: (val) => (
        <ConvertDate date={val.end_date} />
      ),
    },
    { field: 'progress', header: 'ผลการดำเนินงาน', className: 'min-w-[10rem]' },
    {
      field: 'uploads',
      header: 'รูป',
      className: 'min-w-[10rem] text-center',
      
      render: (_rec) => {
        const url = _rec?.uploads[0].url
        const fullUrl = `${import.meta.env.VITE_URL_API}${url}`;
        return (
          <div className=" border p-2">
            <Image src={fullUrl} alt="Image" width="250" />
          </div>
        );
      },
    },
    { field: 'remark', header: 'หมายเหตุ' },
    {
      field: "action",
      header: "จัดการ",
      render: (val, _rec) => (
        <div className="flex  gap-2 items-center">
          <Button
            icon="pi pi-check"
            onClick={() => console.log("val:", val)}
          />
          <Button
            icon="pi pi-check"
            onClick={() => console.log("val:", val)}
          />
          <Button
            icon="pi pi-check"
            onClick={() => console.log("val:", val)}
          />


        </div>

      ),
    },
  ];

  const onDelete = async () => {
    const resApi = await TrackApi.getAll();
    setData(resApi.projects)
    console.log(resApi.projects, "resApi.projects");

    setTotalRecords(resApi.projects.length);
  };

  useEffect(() => {
    onDelete()
  }, []);

  return (
    <div>
      <h4 className="text-green-1 mb-4">ระบบรายงานบริหารโครงการ  (เพิ่มโครงการ)</h4>
      <div className="flex justify-end mb-4 ">
        <Button label="เพิ่ม" icon="pi pi-check" className="  bg-green-2 px-4" />
      </div>
      <div className="">
        <Card>
          <TableBasic
            data={data}
            total={totalRecords}
            columns={columns} />
        </Card>
      </div>
    </div>
  )
}
