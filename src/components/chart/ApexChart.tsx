import React from 'react';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';
import { ApexChartProps, ApexChartState, ChartDataItem } from '../../models/chart.model';


class ApexChart extends React.Component<ApexChartProps, ApexChartState> {
    constructor(props: ApexChartProps) {
        super(props);

        this.state = {
            series: this.processData(props.data),
            options: {
                chart: {
                    height: 450,
                    type: 'rangeBar'
                },
                title: {
                    text:props.title
                },
                
                plotOptions: {
                    bar: {
                        horizontal: true,
                        barHeight: '50%',
                        rangeBarGroupRows: true
                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function(val: number[]) { 
                        const a = moment(val[0]);
                        const b = moment(val[1]);
                        const diff = b.diff(a, 'days');
                        return diff + (diff > 1 ? ' days' : ' day');
                    }
                },
                // fill: {
                //     type: 'gradient',
                //     gradient: {
                //         shade: 'light',
                //         type: 'vertical',
                //         shadeIntensity: 0.25,
                //         gradientToColors: undefined,
                //         inverseColors: true,
                //         opacityFrom: 1,
                //         opacityTo: 1,
                //         stops: [50, 0, 100, 100],
                //     }
                // },
                xaxis: {
                    type: 'datetime'
                  },
                  legend: {
                    position: 'top'
                  }
            }
        };
    }

    componentDidUpdate(prevProps: ApexChartProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({
                series: this.processData(this.props.data)
            });
        }
    }
    processData(data: ChartDataItem[]) {
        const currentDate = new Date().getTime();
          console.log("data",data);
          
        const updatedData = data.map(item => {
            const [startDateStr, endDateStr] = item.dates;
            const start = new Date(startDateStr).getTime();
            const end = new Date(endDateStr).getTime();
    
            const barData = {
                x: item.name,
                y: [start, end],
                fillColor: item.fillColor
            };
    
            if (item.status === "Active") {
                console.log("data Active",data);
                
                if (end < currentDate) {
                    return [
                        barData,
                        {
                            x: item.name,
                            y: [end, currentDate],
                            fillColor: '#ff2d00'
                        }
                    ];
                }
                return [barData];
            }
            return [barData]; 
        }).flat();
    
        return [
            {
                data: updatedData
            }
        ];
    }
    

    render() {
        return (
            <div>
                <div id="chart">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="rangeBar" height={450} />
                </div>
                <div id="html-dist"></div>
            </div>
        );
    }
}

export default ApexChart;
