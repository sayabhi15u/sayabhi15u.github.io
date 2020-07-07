import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import crossfilter from 'crossfilter2';
import axios from 'axios'



class Analytics extends Component {
    constructor(props) {
        super(props);
        this.state = {
        dataset : [],
        options: {}
        };
        this.senData = this.senData.bind(this);
    }

    senData = (tC,tAR,aD,tOI) => {
        this.props.onCallback(tC,tAR,aD,tOI)
    }
    componentDidMount(){
        const _this = this;
        axios.get('http://localhost:8080/1728202/dummy.do')
            .then(res => {
                const dataset = res.data;
                this.setState({dataset});
                const data = crossfilter(this.state.dataset);
        const codeDim = data.dimension(d => d.business_code);
        const groupAmountSum = codeDim.group().reduceSum(d => d.paid_amount);

        const nameDim = data.dimension( d => d.customer_name);
        const groupNameCount = nameDim.group().reduceCount( d => d.nameDim);
        const groupNameSum = nameDim.group().reduceSum( d => d.total_open_amount);
        const groupDelaySum = nameDim.group().reduceSum(d => d.dayspast_due);
        
        const openDim = data.dimension( d => d.isOpen);
        const groupOpen = openDim.group().reduceCount(d => d.openDim);

        var totalCount = groupNameCount.size();
        console.log(totalCount);
        
        
        var totalAR = 0;
        groupNameSum.all().forEach(el => {
            totalAR = totalAR + el.value;
        });
        console.log(Math.round(totalAR));

        var totalDelay = 0;
        groupDelaySum.all().forEach(el => {
            totalDelay += el.value;
        })
        var avgDelay = totalDelay / totalCount ;
        console.log(Math.round(avgDelay));

        var totalOpen = 0;
        groupOpen.all().forEach(el => {
            if ( el.key === 1){
                totalOpen = el.value;
            }
        });
        console.log(totalOpen);
        this.senData(totalCount,Math.round(totalAR),Math.round(avgDelay),totalOpen);
        function prepare(group){
          var categories = [];
          var val = [];
          var gData = group.top(Infinity);
          gData.forEach(d => {
              categories.push(d.key);
              val.push(d.value);
          }); 
          return{
              categories: categories,
              data: val
          }
          }
          var tempObj1 = prepare(groupAmountSum);
          const options = {
            chart: {
                type: 'bar',
                backgroundColor: 'transparent',
                inverted: true,
                height: '800px'
            },
            title: {
                text: 'Total Amount by Company Code',
                align: 'left',
                style: {
                    color: '#bebebe'
                }
            },
            xAxis: {
                title: {
                    text: null
                },
                categories: tempObj1.categories,
                labels: {
                    style: {
                        color: '#ffffff'
                    }
                }
            },
           yAxis: {
               
                title: {
                    text: null,
                },
                alignTicks: false,
                gridLineColor: '#323a5e',
                labels: {
                    enabled: false
                }
                
            },
            credits:{
                enabled:false
            },
            tooltip: {
                
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: false
                    }
                },
                series: {
                    point: {
                        events: {
                            click: function(){
                                this.select(null,true);
                                var selectedPoints = this.series.chart.getSelectedPoints();
                                var filteredPoints = [];
                                for(let index =0; index< selectedPoints.length; index++){
                                    filteredPoints.push(selectedPoints[index].category);
                                }
                                function multivariate_filter(values){
                                    return function(v){
                                        return values.indexOf(v) !== -1;
                                    }
                                }
                                if(filteredPoints.length > 0){
                                    codeDim.filterFunction(multivariate_filter(filteredPoints));
                                }else codeDim.filterAll();
                                var groupNew = groupNameCount.all();
                                totalCount = 0;
                                groupNew.forEach(el => {
                                    totalCount = totalCount + el.value;
                                });
                                console.log(totalCount);

                                groupNew = groupNameSum.all();
                                totalAR = 0;
                                groupNew.forEach(el => {
                                    totalAR += el.value;
                                });
                                console.log(Math.round(totalAR));

                                totalDelay = 0;
                                groupDelaySum.all().forEach(el => {
                                    totalDelay += el.value;
                                })

                                avgDelay = totalDelay / totalCount ;
                                console.log(Math.round(avgDelay));

                                totalOpen = 0;
                                groupOpen.all().forEach(el => {
                                    if ( el.key === 1){
                                        totalOpen = el.value;
                                    }
                                });
                                console.log(totalOpen);
                                _this.senData(totalCount,Math.round(totalAR),Math.round(avgDelay),totalOpen);
                            }
                        }
                    }
                }
            },
            
            credit: {
                enabled: false
            },
            series: [{
                    name: 'Total Amount',
                //data: [107, 131, 185, 253],
                data: tempObj1.data,
                showInLegend: false
            },] 
        }
        this.setState({
          options : options
        })
        }
        )
    
    }
    


    render(){
        
        return(
            <div autoid="companycode-chart" style={{ height: '100%',overflowX: 'scroll', overflowY: 'scroll' }} >
            <HighchartsReact highcharts={Highcharts} options={this.state.options}/></div>
        );
    }
}
export default Analytics;