import ReactDOM from 'react-dom';

import EasyGrid from '../jsx/EasyGrid.jsx';

// 测试数据
let data = JSON.parse(localStorage.getItem('easy_grid_data'));

const checkRow = () => {
    document.getElementById('demo').getElementsByClassName('easy-grid-row')
};

// 更新行数据
const updateRow = (rowIndex, rowData) => {
    console.log('将要修改第' + rowIndex + '行');
    console.log('将要修改的数据如下: ');
    console.log(rowData);
};

// 删除行数据
const deleteRow = (rowIndex, rowData) => {
    console.log('将要修改第' + rowIndex + '行');
    console.log('将要删除的数据如下: ');
    console.log(rowData);
};

let gridConfig = {
    // 是否显示基本的功能按钮(暂时只支持"增"、"删"、"改")
    showTools: true,
    // 是否显示表头, 默认为false
    showHeader: true,
    // 表头标题名, 当 showHeader 为 false 时无效
    headers: ['姓名', '学籍短号', '家长手机号', '账号', '操作'],
    // 表头配置项
    // 如果只是普通文本, 直接配置在text属性中
    // 如果表头含html标签, 需要配置在tag中, 同时需将text项设置为''或不设置该项
    // 注: 除非有必要, 否则不要配置tag(配置tag后会直接操作DOM)
    header: [
                {
                    text: '姓名',
                },
                {
                    text: '学籍短号'
                },
                {
                    text: '家长手机号'
                },
                {
                    text: '账号'
                },
                {
                    text: '操作'
                }
            ],
    // 是否显示排序, 0(默认值): 不排序, 1: 排序,
    // 当类型为Array时, 将与列一一对应
    // 如: [0, 1, 0, 0, 0], 表示第2列显示排序
    sort: 0,
    // 各列的宽, 可缺省(如果不配置, 需要自己在样式表中设置)
    colWidth: ['15%', '20%', '20%', '20%', '20%'],
    // 数据源的格式, 目前只支持两种
    // 0: 对象数组, 1: 二维数组, 可缺省, 默认值为 0
    dataFlag: 0,
    // 填充数据时, 将根据该配置项来填充数据
    // 当 dataFlag 是 1(即数据源是二维数组) 时无效
    // 如果某列需要添加自定义内容(如html按钮元素),
    //     则不需要配置key或者将key配置为'', 并将html字符串加到'val'字段下
    colConfig:  [
                    {
                        key: 'name'
                    },
                    {
                        key: 'studentID'
                    },
                    {
                        key: 'patriarchMobile'
                    },
                    {
                        key: 'account'
                    },
                    {
                        key: '',
                        val: '<button class="update">修改</button><button class="delete">删除</button>',
                        callback: function (data) {
                            console.log(data);
                        }
                    }
                ],
    // 可选参数, 指定行数据中某1列的主键(建议配置该项)
    // 注意: 如果指定, 则该字段的值必须具有唯一性, 否则不要配置该参数
    rowID: 'studentID',
    // 选择列
    selectCol: {
        // {boolean}是否显示标记列
        show: true,
        // [{string}]可选值: 'checkbox'(默认值, 将显示复选按钮) / 'radio'
        type: 'checkbox',
        // 列宽, 该百分比值与colWidth中的各值之和应该为100%)
        // 可缺省(如果不配置, 需要在样式表张设置)
        width: '5%',
        // [{string}]可选值: 'start'(默认值, 第1列) / 'end'(最后1列)
        location: 'start',
        // [{string}]选中后, 该行的类名(方便自定义样式), 默认值'checked'
        checkedRowClass: 'checked'
    },
    // 表格数据, 对象数组或二维数组
    data: data,
    // 
    callback: [updateRow, deleteRow],
    // 是否可以选中多行
    multiRow: true,
    getRow: function (rowData) {
        return rowData;
    },
    // dom操作的
    // 将在组件mount后执行
    domCallback: function () {
        console.log('done');
    }
};

setTimeout(() => {
    data = JSON.parse(localStorage.getItem('easy_grid_data_sub'));
    gridConfig.data = data;
    ReactDOM.render(<EasyGrid gridConfig={gridConfig} />, document.getElementById('demo'));
}, 3000);

ReactDOM.render(<EasyGrid gridConfig={gridConfig} />, document.getElementById('demo'));