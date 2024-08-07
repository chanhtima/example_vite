import { ColumnBodyOptions } from 'primereact/column';
type FieldType<T> = T extends { [key: string]: any } ? keyof T | 'action' : never;
export interface tableprops {
   data:any
}

export interface ColumnMeta<T = unknown> {
    field: FieldType<T>; 
    header: string;
    sortable?: boolean;
    className?: string;
    render?: (data: T, options: ColumnBodyOptions) => React.ReactNode;
}

 export interface PaginatorProps {
    first: number;
    rows: number;
    totalRecords: number;
    onPageChange?: (event: any) => void;
}
export interface PaginatorTemplate {
    layout: string;
    RowsPerPageDropdown: (options: any) => React.ReactNode;
    CurrentPageReport: (options: any) => React.ReactNode;
    // Add other template keys as needed
}
