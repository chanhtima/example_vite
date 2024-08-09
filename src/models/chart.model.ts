import { ApexOptions } from "apexcharts";

export interface ChartDataItem {
    name: string;
    dates: string[];
    fillColor: string;
    status: string;
}

export interface ApexChartProps {
    data: ChartDataItem[];
}
export  interface ApexChartState {
    series: {
        data: {
            x: string;
            y: number[];
            fillColor: string;
        }[];
    }[];
    options: ApexOptions; 
}
