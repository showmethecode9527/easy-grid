import React from 'react';

import EasyGridRow from './EasyGridRow';

class EasyGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.gridConfig.data,
            header: [],
            rows: [],
            // 记录点击的行数
            checkedRowIndex: [],
            // 选中的行数据
            checkedRowData: [],
            customHeaderMap: []
        };
    }

    /**
     * 检查元素是否在数组中
     * @Author   wangk
     * @DateTime 2016-08-29T18:53:31+0800
     * @param    {[type]}   val [description]
     * @param    {Array}    ary [description]
     * @return   {Number}   如果val不在数组ary中, 返回-1, 否则, 返回val在ary中的索引   
     */
    _isInArray(val, ary) {
        if (Array.isArray(ary)) {
            let index = -1;
            for (let i = 0; i < ary.length; i++) {
                if (val === ary[i]) {
                    index = -1;
                    break;
                }
            }
            return index;
        } else {
            console.warn('参数错误! _isInArray方法的第2个参数必须是数组!');
        }
    }

    /**
     * 检查组件的配置参数
     * @Author   wangk
     * @DateTime 2016-08-27T16:31:53+0800
     */
    checkConfig() {
        let config = this.props.gridConfig;
        if (config.header.length !== config.colWidth.length) {
            console.warn('配置项中, header.width !== colWidth.length');
        }
        if (config.header.length !== config.colConfig.length) {
            console.warn('配置项中, header.width !== colConfig.length');
        }
        if (config.colConfig.length !== config.colWidth.length) {
            console.warn('配置项中, conConfig.width !== colWidth.length');
        }
    }

    rowClickCallback(index, checkedRowData) {
        // console.log(index, checkedRowData);
        
        let gridConfig = this.props.gridConfig;

        if (gridConfig.multiRow) {
            let newRowIndex = this.state.checkedRowIndex;
            let newRowData = this.state.checkedRowData;
            if (typeof gridConfig.rowID === 'undefined' || gridConfig.rowID === '') {
                if (this._isInArray(index, newRowIndex) === -1) {
                    newRowIndex.push(index);
                    newRowData.push(checkedRowData);
                }
            } else {
                // if ()
                let rowIsInState = false;
                for (let i = 0; i < newRowData.length; i++) {
                    if (checkedRowData[gridConfig.rowID] === newRowData[i][gridConfig.rowID]) {
                        rowIsInState = true;
                    }
                }
                if (!rowIsInState) {
                    newRowIndex.push(index);
                    newRowData.push(checkedRowData);
                }
            }
            this.setState({
                checkedRowIndex: newRowIndex,
                checkedRowData: newRowData
            });
        } else {
            this.setState({
                checkedRowIndex: index,
                checkedRowData: checkedRowData
            });
        }
        // 自定义回调
    }

    /**
     * 设置表头
     * @Author   wangk
     * @DateTime 2016-08-27T16:32:20+0800
     */
    setHeader() {
        let config = this.props.gridConfig;
        let headerData = config.header;
        let newHeader = [];
        // 保存自定义表头的ID, 之后需要直接操作DOM
        let headerMap = [];
        let tempKey;

        // showSelect: 是否配置了显示选择列
        // selectCol: 选择列的配置详情
        let showSelect = false, selectCol;
        // 读取用户选择列配置
        let configSelectCol = config.selectCol;

        if (typeof configSelectCol !== 'undefined') {
            showSelect = typeof configSelectCol.show === 'undefined' ? false : configSelectCol.show;
            selectCol = {
                show: showSelect,
                type: typeof configSelectCol.type === 'undefined' ? 'checkbox' : configSelectCol.type,
                width: typeof configSelectCol.width === 'undefined' ? '5%' : configSelectCol.width,
                location: typeof configSelectCol.location === 'undefined' ? 'start': configSelectCol.location,
                checkedRowClass: typeof configSelectCol.checkedRowClass === 'undefined' ? 'checked' : configSelectCol.checkedRowClass
            };
        }

        // 判断是否配置了选择列
        if (showSelect && selectCol.location === 'start') {
            newHeader.push(
                <div className="easy-grid-col select-col" key={'header-select'} style={{width: selectCol.width}}>
                    <input type="checkbox" />
                </div>
            );
        }

        headerData.forEach((v, i) => {
            tempKey = "header-col-" + i;
            if (v.text === '' || typeof v.text === 'undefined') {
                headerMap.push({
                    key: tempKey,
                    val: v.tag
                });
                newHeader.push(
                    <div className="easy-grid-col" key={tempKey} id={tempKey} style={{width: config.colWidth[i]}}></div>
                );
            } else {
                newHeader.push(
                    <div className="easy-grid-col" key={tempKey} style={{width: config.colWidth[i]}}>{v.text}</div>
                );
            }
        });
        this.setState({
            header: newHeader,
            customHeaderMap: headerMap
        });
    }

    addRow() {
        let currentData = this.state.data;
        currentData.unshift({
            name: '',
            account: '',
            patriarchMobile: '',
            studentID: ''
        });
        this.setState({
            data: currentData
        });
        this.setRows(currentData);
    }

    setRows(data = this.state.data) {
        let config = this.props.gridConfig;
        let newRows = [];
        // let data = this.state.data;

        // 对象数组
        /* data: 
         * [{
         *     name: '郭靖',
         *     studentID: '2016001',
         *     patriarchMobile: '18600000000',
         *     account: '18900000000'
         * }, {
         *     name: '黄蓉',
         *     studentID: '2016002',
         *     patriarchMobile: '18600000001',
         *     account: '18900000001'
         * }];
         */
        if (config.dataFlag === 0) {
            // ['name', 'studentID', 'patriarchMobile', 'account', '']

            let rowConfig;

            data.forEach((v, i) => {
                rowConfig = {
                    data: v,
                    dataFlag: 0,
                    colConfig: config.colConfig,
                    colWidth: config.colWidth,
                    selectCol: config.selectCol,
                    rowIndex: i
                };

                // if (i === 0 && isAdd) {
                //     rowConfig.colConfig[1] = {
                //         val: '<input type="text">'
                //     };
                // }

                newRows.push(<EasyGridRow rowConfig={rowConfig} key={"row-" + i} dataClick={this.rowClickCallback.bind(this, i, v)} checkedRow={this.state.checkedRowIndex} />);
            });
            this.setState({
                rows: newRows
            });
        }
    }

    componentWillMount() {
        this.checkConfig();
        this.setHeader();
    }

    render() {
        return (
            <div className="easy-grid-wrapper">
                <div className="easy-grid-tools">
                    <button onClick={this.addRow.bind(this)}>+Add</button>
                </div>
                <div className="easy-grid">
                    {/* 表格头 */}
                    {/* <div className="easy-grid-header"><EasyGridHeader headerData={headerData} /></div> */}
                    <div className="easy-grid-header">
                        <div className="easy-grid-row">{this.state.header}</div>
                    </div>
                    {/* 表格内容 */}
                    <div className="easy-grid-body">{this.state.rows}</div>
                    {/* 分页等 */}
                    <div className="easy-grid-footer"></div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.setRows();
        this.state.customHeaderMap.forEach((v, i) => {
            document.getElementById(v.key).innerHTML = v.val;
        });
        this.props.gridConfig.domCallback();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.gridConfig.data
        });
        this.setRows(nextProps.gridConfig.data);
        // console.log(nextProps);
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
}

export default EasyGrid;