import React from "react";
import ReactApexChart from "react-apexcharts";
import { ChartBasicBarProps, ChartBasicBarState } from "../../models/chart.model";

class ChartBasicBar extends React.Component<ChartBasicBarProps, ChartBasicBarState> {
    constructor(props: ChartBasicBarProps) {
        super(props);
        this.state = {
            options: {
                chart: {
                    type: 'bar', 
                    height: 350,
                    stacked: true,
                },
                title: {
                    text:props.title
                },
                plotOptions: {
                    bar: {
                        horizontal: props.horizontal,
                        dataLabels: {
                            total: {
                                enabled: props.enabled,
                                offsetX: 0,
                                style: {
                                    fontSize: '13px',
                                    fontWeight: 900
                                }
                            }
                        }
                    },
                },
                stroke: {
                    width: 1,
                    colors: ['#fff']
                },

                xaxis: {
                    categories: this.props.categories, 
                   
                },
                colors: props.colors,
                yaxis: {
                    title: {
                        text: undefined
                    },
                },
                tooltip: {
                    y: {
                        formatter: function (val: number) {
                            return val + "K";
                        }
                    }
                },
                fill: {
                    opacity: 1
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'left',
                    offsetX: 40
                }
            }
        };
    }

    render() {
        return (
            <div>
                <div id="chart">
                    <ReactApexChart 
                        options={this.state.options} 
                        series={this.props.series} // Use props for series
                        type="bar" 
                        height={350} 
                    />
                </div>
                <div id="html-dist"></div>
            </div>
        );
    }
}

export default ChartBasicBar;
