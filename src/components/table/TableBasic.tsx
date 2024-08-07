import { useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Toast } from 'primereact/toast';
import { ColumnMeta } from '../../models/table.model';
import { font } from '../../utils/font';


declare module 'jspdf' {
    interface jsPDF {
        autoTable: any;
    }
}


interface TableBasicProps<T> {
    data: T[];
    columns: ColumnMeta<T>[];
    total: number;
    paginator?: boolean;
    tablename?: string;
    exports?: boolean;
    selection?: boolean;
    selectionClick?: boolean;
    selectionType?: 'radiobutton' | 'checkbox';
}

export default function TableBasic<T>({
    data,
    total,
    paginator = true,
    exports = false,
    selectionClick = false,
    selection = false,
    selectionType = 'checkbox',
    tablename = '',
    columns,
}: TableBasicProps<T>) {

    const dt = useRef<any>(null);
    const toast = useRef<Toast>(null);
    const [first, setFirst] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

    const onCustomPage = (event: any) => {
        setFirst(event.first);
    };
    const showToastError = (message: string) => {
        if (toast.current) {
            toast.current.show({ severity: 'error', summary: message });
        }
    };
    const filteredColumns = columns.filter(col => col.field !== 'action');
    const exportColumns = filteredColumns.map((col) => ({ title: col.header, dataKey: col.field }));

    const prepareCsvData = (selectionOnly: boolean) => {
        const rows = selectionOnly ? selectedProducts : data;
        if (rows.length === 0) {
            showToastError('กรุณาเลือกข้อมูลสำหรับ export');
            return [];
        }
        return rows.map(row =>
            exportColumns.reduce((acc: any, col) => {
                acc[col.title] = row[col.dataKey];
                return acc;
            }, {})
        );
    };

    const exportCSV = (selectionOnly: boolean) => {
        const csvData = prepareCsvData(selectionOnly);
        if (csvData.length === 0) return;
        const header = exportColumns.map(col => col.title).join(',');
        const rows = csvData.map(row =>
            exportColumns.map(col => row[col.title] || '').join(',')
        );
        const csvContent = [header, ...rows].join('\n');
        const bom = "\uFEFF";
        const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        const EXCEL_EXTENSION = '.csv';
        const filename = tablename ? `${tablename}` : 'Export';
        link.setAttribute('download', filename + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    const exportPdf = () => {
        const rows = selection ? selectedProducts : data;
        if (rows.length === 0) {
            showToastError('กรุณาเลือกข้อมูลสำหรับ export');
            return;
        }
        const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        doc.addFileToVFS("WorkSans-normal.ttf", font);
        doc.addFont("WorkSans-normal.ttf", "WorkSans", "normal");
        doc.setFont("WorkSans");

        (doc as any).autoTable({
            head: [exportColumns.map(col => col.title)],
            body: rows.map(row => exportColumns.map(col => row[col.dataKey])),
            headStyles: {
                font: "WorkSans",
                fontStyle: 'bold',
                fontSize: 14,
            },
            styles: { font: "WorkSans", fontStyle: 'normal', fontSize: 12 },
        });

        const filename = tablename ? `${tablename}` : 'Export';
        doc.save(filename + '_export_' + new Date().getTime() + '.pdf');
    };


    const exportExcel = () => {
        const rows = selection ? selectedProducts : data;
        if (rows.length === 0) {
            showToastError('กรุณาเลือกข้อมูลสำหรับ export');
            return;
        }
        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const filename = tablename ? `${tablename}` : 'Export';
        saveAsExcelFile(excelBuffer, filename);
    };

    const saveAsExcelFile = (buffer: any, fileName: string) => {
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], { type: EXCEL_TYPE });
        saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    };

    const header = (
        <>
            <div className='flex justify-between'>
                {tablename != '' ? (
                    <div className="flex align-items-center justify-content-start gap-2 export-buttons">

                        <span className="text-xl text-900 font-bold">{tablename}</span>
                    </div>
                ) :
                    <div className="flex align-items-center justify-content-start gap-2 export-buttons">
                    </div>}
                {exports && (
                    <div className="flex align-items-center justify-content-end gap-2 export-buttons">
                        <Button type="button" icon="pi pi-file" rounded data-pr-tooltip="CSV" onClick={() => exportCSV(selection)} />
                        <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
                        <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
                    </div>
                )}
            </div>
        </>

    );

    return (
        <div className="card">
            <Tooltip target=".export-buttons>button" position="bottom" />
            <Toast ref={toast}></Toast>
            <DataTable
                ref={dt}
                value={data}
                paginator={paginator}
                rows={20}
                first={first}
                totalRecords={total}
                onPage={onCustomPage}
                header={tablename != '' || exports ? header : null}
                removableSort
                dataKey="id"
                selectionMode={selectionClick ? selectionType : null}
                selection={selectedProducts}
                onSelectionChange={(e: any) => setSelectedProducts(e.value)}
                tableStyle={{ minWidth: '50rem' }}
            >
                {selection && selectionType === 'checkbox' && (
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                )}
                {selection && selectionType === 'radiobutton' && (
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }}></Column>
                )}
                <Column
                    body={(_rowData, { rowIndex }: { rowIndex: number }) => rowIndex + 1}
                    header="ลำดับ"
                    style={{ width: '3rem' }}
                />
                {columns.map((col, index) => (
                    <Column
                        key={index}
                        field={col.field as string}
                        header={col.header}
                        className={col.className}
                        sortable={col.sortable}
                        body={col.render}
                    />
                ))}
            </DataTable>
        </div>
    );
}
