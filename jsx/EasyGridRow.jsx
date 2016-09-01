import React from 'react';

class EasyGridRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cols: [],
            // 
            customMap: [],
            className: 'easy-grid-row'
        };
    }
    
    setContent(props = this.props) {
        /*
         * {
         *     data:     {
         *                  name: '郭靖',
         *                  studentID: '2016001',
         *                  patriarchMobile: '18600000000',
         *                  account: '18900000000'
         *               },
         *     dataFlag: 0,
         *     colKey:   ['name', 'studentID', 'patriarchMobile', 'account', ''],
         *     colWidth: ['20%', '20%', '20%', '20%', '20%'],
         *     rowIndex: 0
         * }
         */
        let config = props.rowConfig;
        let data = config.data;
        let newCols = [];
        let newCustomMap = [];

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

        if (config.dataFlag === 0) {
            
            // colKey: ['name', 'studentID', 'patriarchMobile', 'account', '']
            // let colKey = config.colKey;
            let colConfig = config.colConfig;

            // 判断是否配置了选择列
            if (showSelect && selectCol.location === 'start') {
                newCols.push(
                    <div className="easy-grid-col select-col" key={"select-" + config.rowIndex} style={{width: selectCol.width}}>
                        <input type="checkbox" />
                    </div>
                );
            }
            
            let tempKey;
            colConfig.forEach((v, i) => {
                tempKey = "row-" + config.rowIndex + "-" + i;
                if (typeof v.key === 'undefined' || v.key === '') {
                    newCustomMap.push({
                        key: tempKey,
                        val: v.val
                    });

                    newCols.push(
                        <div className="easy-grid-col" key={tempKey} id={tempKey} style={{width: config.colWidth[i]}}>
                        </div>
                    );

                    // if (typeof v.callback === 'function') {
                    //     newCols.push(
                    //         <div className="easy-grid-col" onClick={v.callback.bind(this, config.data)} key={tempKey} id={tempKey}>
                    //         </div>
                    //     );
                    // } else {
                    //     newCols.push(
                    //         <div className="easy-grid-col" key={tempKey} id={tempKey}>
                    //         </div>
                    //     );
                    // }
                } else {
                    newCols.push(
                        <div className="easy-grid-col" key={tempKey} style={{width: config.colWidth[i]}}>
                            {data[v.key]}
                        </div>
                    );
                    // if (typeof v.callback === 'function') {
                    //     newCols.push(
                    //         <div className="easy-grid-col" onClick={v.callback.bind(this, config.data)} key={tempKey} style={{width: config.colWidth[i]}}>
                    //             {data[v.key]}
                    //         </div>
                    //     );
                    // } else {
                    //     newCols.push(
                    //         <div className="easy-grid-col" key={tempKey} style={{width: config.colWidth[i]}}>
                    //             {data[v.key]}
                    //         </div>
                    //     );
                    // }
                }
            });
        }
        this.setState({
            cols: newCols,
            customMap: newCustomMap
        });
    }

    rowClick() {
        if (this.state.className.indexOf('checked') === -1) {
            this.setState({
                className: 'easy-grid-row checked'
            });
        }
    }

    componentWillMount() {
        this.setContent();
    }

    render() {
        return (
            <div className={this.state.className} onClick={this.props.dataClick}>{this.state.cols}</div>
        );
    }

    componentDidMount() {
        let thisDOM = ReactDOM.findDOMNode(this);
        // this.state.customMap.forEach((v, i) => {
        //     document.getElementById(v.key).innerHTML = v.val;
        // });
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        this.setContent(nextProps);
    }
}

export default EasyGridRow;