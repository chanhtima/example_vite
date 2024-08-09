import { ApexOptions } from "apexcharts";

export interface ChartDataItem {
    name: string;
    dates: string[];
    fillColor: string;
    status: string;
}

export interface ApexChartProps {
    data: ChartDataItem[];
    title?:string
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


export interface ChartBasicBarProps {
    series: {
        name: string;
        data: number[];
    }[];
    categories: string[] | number[]; // Adjust according to your data type
    title?:string;
    horizontal?:boolean;
    enabled?:boolean;
    colors: string[] 
    
}

export interface ChartBasicBarState {
    options: ApexOptions;
}


export interface chartData{
    series: {
        data: number[];
    }[];
    options: {
        chart: {
            type: "bar";
            height: number;
        };
        plotOptions: {
            bar: {
                borderRadius: number;
                borderRadiusApplication: string;
                horizontal: boolean;
            };
        };
        dataLabels: {
            enabled: boolean;
        };
        xaxis: {
        
        };
    };
}