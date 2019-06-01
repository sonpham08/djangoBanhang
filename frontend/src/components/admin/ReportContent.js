import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import moment from 'moment';
import 'moment-timezone';
import ReactEcharts from 'echarts-for-react';
import { css } from '@emotion/core';
// First way to import
import { ClipLoader } from 'react-spinners';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
var $ = require("jquery");
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class ReportContent extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            dropdownOpen: false,
            filter_by: 'year',
            year: 2019,
            month: 0
        };
    }

    toggle = () => {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
    }

    handleSwitchPagination(e, index) {
        e.preventDefault();
        this.setState({
            currentPage: index
        });
    }

    setColumns(statistics) {
        if(statistics[0].hasOwnProperty('month')) {
            return [
                {
                    Header: 'Tháng',
                    accessor: 'month'
                }, 
                {
                    Header: 'Số lượng', // Custom header components!
                    accessor: 'count'
                },
                {
                    Header: 'Năm',
                    accessor: 'year'
                }, 
                
            ]
        } else {
            return [
                {
                    Header: 'Ngày',
                    accessor: 'day'
                }, 
                {
                    Header: 'Số lượng', // Custom header components!
                    accessor: 'count'
                },
                {
                    Header: 'Năm',
                    accessor: 'year'
                }, 
                
            ]
        }
        
    }

    getOption(statistic) {
        return {
            title : {
                text: 'Thống kê trong năm 2019',
                // subtext: 'trong '
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['sanpham']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : statistic.month
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLabel : {
                        formatter: '{value} sp'
                    }
                }
            ],
            series : [
                {
                    name:'sanpham',
                    type:'line',
                    data: statistic.output,
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name: '平均值'}
                        ]
                    }
                },
                // {
                //     name:'最低气温',
                //     type:'line',
                //     data:[1, -2, 2, 5, 3, 2, 0],
                //     markPoint : {
                //         data : [
                //             {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                //         ]
                //     },
                //     markLine : {
                //         data : [
                //             {type : 'average', name : '平均值'}
                //         ]
                //     }
                // }
            ]
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    updateFilter = (code) => {
        if(code == 'year') {
            this.setState({filter_by: 'year'})
        }
        if(code == 'month') {
            this.setState({filter_by: 'month'});
        }
    }

    onFilterReport = () => {
        this.props.onFilterReport(this.state.year, this.state.month);
    }

    render() {
        var listDetails = [];
        var {statistic} = this.props;
        var {filter_by, year, month} = this.state;
        console.log(this.props.statistic);
        console.log(filter_by);
        
        if (this.props.tab == 3) {
            return (
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                    <div className="row" style={{marginLeft: '0', display: 'flex'}}>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                        Thống kê theo
                        </DropdownToggle>
                        <DropdownMenu style={{padding: '0', minWidth:'103px'}}>
                        <DropdownItem onClick={() => this.updateFilter('year')}>Năm</DropdownItem>
                        <DropdownItem onClick={() => this.updateFilter('month')}>Tháng</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    {
                        (filter_by == 'year' || filter_by == 'month') &&
                        <div style={{display: 'flex'}}>
                            <label style={{marginLeft: '28px'}}>Nhập năm: </label>
                            <input 
                            type="number" 
                            min={1}
                            max={2019}
                            className="form-control"
                            style={{width: '40%', marginLeft: '10px', marginRight: '10px'}}
                            name="year"
                            value={year}
                            onChange={this.onChange}
                            />
                        </div>
                    }
                    {
                        filter_by == 'month' &&
                        <div style={{display: 'flex'}}>
                            <label style={{marginLeft: '28px', width: '90px'}}>Nhập tháng: </label>
                            <input 
                            type="number" 
                            min={1}
                            max={12}
                            className="form-control"
                            style={{width: '40%', marginLeft: '10px', marginRight: '10px'}}
                            name="month"
                            value={month}
                            onChange={this.onChange}
                            />
                        </div>
                    }
                    
                    <button type="button" className="btn btn-danger" onClick={this.onFilterReport}>Lọc</button>
                    
                    </div>
                    <div className="row" style={{marginLeft: '0'}}>
                        {
                            statistic.year.status == 'loaded' && 
                            <ReactEcharts
                                option={this.getOption(statistic.year.data)}
                                notMerge={true}
                                lazyUpdate={true}
                                theme={"theme_name"}
                            />
                        }
                        {
                            statistic.year.status == 'loading' &&
                            <div className='sweet-loading' style={{textAlign: 'center', marginTop: '150px'}}>
                                <ClipLoader
                                css={override}
                                sizeUnit={"px"}
                                size={100}
                                color={'#123abc'}
                                loading={true}
                                />
                            </div> 
                        }
                    </div>
                    <div className="row" style={{marginLeft: '0'}}>
                        {
                            statistic.year.status == 'loaded' &&
                            <ReactTable
                                data={statistic.year.data.statistics}
                                style={{textAlign: 'center'}}
                                columns={this.setColumns(statistic.year.data.statistics)}
                            />
                        }
                    </div>
                    
                </div>
            );
        }
        return null;
    }
}

export default ReportContent;
