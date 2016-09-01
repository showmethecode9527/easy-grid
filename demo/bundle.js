/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _reactDom = __webpack_require__(3);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _EasyGrid = __webpack_require__(1);
	
	var _EasyGrid2 = _interopRequireDefault(_EasyGrid);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// 测试数据
	var data = JSON.parse(localStorage.getItem('easy_grid_data'));
	
	var checkRow = function checkRow() {
	    document.getElementById('demo').getElementsByClassName('easy-grid-row');
	};
	
	// 更新行数据
	var updateRow = function updateRow(rowIndex, rowData) {
	    console.log('将要修改第' + rowIndex + '行');
	    console.log('将要修改的数据如下: ');
	    console.log(rowData);
	};
	
	// 删除行数据
	var deleteRow = function deleteRow(rowIndex, rowData) {
	    console.log('将要修改第' + rowIndex + '行');
	    console.log('将要删除的数据如下: ');
	    console.log(rowData);
	};
	
	var gridConfig = {
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
	    header: [{
	        text: '姓名'
	    }, {
	        text: '学籍短号'
	    }, {
	        text: '家长手机号'
	    }, {
	        text: '账号'
	    }, {
	        text: '操作'
	    }],
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
	    colConfig: [{
	        key: 'name'
	    }, {
	        key: 'studentID'
	    }, {
	        key: 'patriarchMobile'
	    }, {
	        key: 'account'
	    }, {
	        key: '',
	        val: '<button class="update">修改</button><button class="delete">删除</button>',
	        callback: function callback(data) {
	            console.log(data);
	        }
	    }],
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
	    getRow: function getRow(rowData) {
	        return rowData;
	    },
	    // dom操作的
	    // 将在组件mount后执行
	    domCallback: function domCallback() {
	        console.log('done');
	    }
	};
	
	setTimeout(function () {
	    data = JSON.parse(localStorage.getItem('easy_grid_data_sub'));
	    gridConfig.data = data;
	    _reactDom2.default.render(React.createElement(_EasyGrid2.default, { gridConfig: gridConfig }), document.getElementById('demo'));
	}, 3000);
	
	_reactDom2.default.render(React.createElement(_EasyGrid2.default, { gridConfig: gridConfig }), document.getElementById('demo'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _EasyGridRow = __webpack_require__(4);
	
	var _EasyGridRow2 = _interopRequireDefault(_EasyGridRow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var EasyGrid = function (_React$Component) {
	    _inherits(EasyGrid, _React$Component);
	
	    function EasyGrid(props) {
	        _classCallCheck(this, EasyGrid);
	
	        var _this = _possibleConstructorReturn(this, (EasyGrid.__proto__ || Object.getPrototypeOf(EasyGrid)).call(this, props));
	
	        _this.state = {
	            data: props.gridConfig.data,
	            header: [],
	            rows: [],
	            // 记录点击的行数
	            checkedRowIndex: [],
	            // 选中的行数据
	            checkedRowData: [],
	            customHeaderMap: []
	        };
	        return _this;
	    }
	
	    /**
	     * 检查元素是否在数组中
	     * @Author   wangk
	     * @DateTime 2016-08-29T18:53:31+0800
	     * @param    {[type]}   val [description]
	     * @param    {Array}    ary [description]
	     * @return   {Number}   如果val不在数组ary中, 返回-1, 否则, 返回val在ary中的索引   
	     */
	
	
	    _createClass(EasyGrid, [{
	        key: '_isInArray',
	        value: function _isInArray(val, ary) {
	            if (Array.isArray(ary)) {
	                var index = -1;
	                for (var i = 0; i < ary.length; i++) {
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
	
	    }, {
	        key: 'checkConfig',
	        value: function checkConfig() {
	            var config = this.props.gridConfig;
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
	    }, {
	        key: 'rowClickCallback',
	        value: function rowClickCallback(index, checkedRowData) {
	            // console.log(index, checkedRowData);
	
	            var gridConfig = this.props.gridConfig;
	
	            if (gridConfig.multiRow) {
	                var newRowIndex = this.state.checkedRowIndex;
	                var newRowData = this.state.checkedRowData;
	                if (typeof gridConfig.rowID === 'undefined' || gridConfig.rowID === '') {
	                    if (this._isInArray(index, newRowIndex) === -1) {
	                        newRowIndex.push(index);
	                        newRowData.push(checkedRowData);
	                    }
	                } else {
	                    // if ()
	                    var rowIsInState = false;
	                    for (var i = 0; i < newRowData.length; i++) {
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
	
	    }, {
	        key: 'setHeader',
	        value: function setHeader() {
	            var config = this.props.gridConfig;
	            var headerData = config.header;
	            var newHeader = [];
	            // 保存自定义表头的ID, 之后需要直接操作DOM
	            var headerMap = [];
	            var tempKey = void 0;
	
	            // showSelect: 是否配置了显示选择列
	            // selectCol: 选择列的配置详情
	            var showSelect = false,
	                selectCol = void 0;
	            // 读取用户选择列配置
	            var configSelectCol = config.selectCol;
	
	            if (typeof configSelectCol !== 'undefined') {
	                showSelect = typeof configSelectCol.show === 'undefined' ? false : configSelectCol.show;
	                selectCol = {
	                    show: showSelect,
	                    type: typeof configSelectCol.type === 'undefined' ? 'checkbox' : configSelectCol.type,
	                    width: typeof configSelectCol.width === 'undefined' ? '5%' : configSelectCol.width,
	                    location: typeof configSelectCol.location === 'undefined' ? 'start' : configSelectCol.location,
	                    checkedRowClass: typeof configSelectCol.checkedRowClass === 'undefined' ? 'checked' : configSelectCol.checkedRowClass
	                };
	            }
	
	            // 判断是否配置了选择列
	            if (showSelect && selectCol.location === 'start') {
	                newHeader.push(_react2.default.createElement(
	                    'div',
	                    { className: 'easy-grid-col select-col', key: 'header-select', style: { width: selectCol.width } },
	                    _react2.default.createElement('input', { type: 'checkbox' })
	                ));
	            }
	
	            headerData.forEach(function (v, i) {
	                tempKey = "header-col-" + i;
	                if (v.text === '' || typeof v.text === 'undefined') {
	                    headerMap.push({
	                        key: tempKey,
	                        val: v.tag
	                    });
	                    newHeader.push(_react2.default.createElement('div', { className: 'easy-grid-col', key: tempKey, id: tempKey, style: { width: config.colWidth[i] } }));
	                } else {
	                    newHeader.push(_react2.default.createElement(
	                        'div',
	                        { className: 'easy-grid-col', key: tempKey, style: { width: config.colWidth[i] } },
	                        v.text
	                    ));
	                }
	            });
	            this.setState({
	                header: newHeader,
	                customHeaderMap: headerMap
	            });
	        }
	    }, {
	        key: 'addRow',
	        value: function addRow() {
	            var currentData = this.state.data;
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
	    }, {
	        key: 'setRows',
	        value: function setRows() {
	            var _this2 = this;
	
	            var data = arguments.length <= 0 || arguments[0] === undefined ? this.state.data : arguments[0];
	
	            var config = this.props.gridConfig;
	            var newRows = [];
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
	                (function () {
	                    // ['name', 'studentID', 'patriarchMobile', 'account', '']
	
	                    var rowConfig = void 0;
	
	                    data.forEach(function (v, i) {
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
	
	                        newRows.push(_react2.default.createElement(_EasyGridRow2.default, { rowConfig: rowConfig, key: "row-" + i, dataClick: _this2.rowClickCallback.bind(_this2, i, v), checkedRow: _this2.state.checkedRowIndex }));
	                    });
	                    _this2.setState({
	                        rows: newRows
	                    });
	                })();
	            }
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            this.checkConfig();
	            this.setHeader();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'easy-grid-wrapper' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'easy-grid-tools' },
	                    _react2.default.createElement(
	                        'button',
	                        { onClick: this.addRow.bind(this) },
	                        '+Add'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'easy-grid' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'easy-grid-header' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'easy-grid-row' },
	                            this.state.header
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'easy-grid-body' },
	                        this.state.rows
	                    ),
	                    _react2.default.createElement('div', { className: 'easy-grid-footer' })
	                )
	            );
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.setRows();
	            this.state.customHeaderMap.forEach(function (v, i) {
	                document.getElementById(v.key).innerHTML = v.val;
	            });
	            this.props.gridConfig.domCallback();
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({
	                data: nextProps.gridConfig.data
	            });
	            this.setRows(nextProps.gridConfig.data);
	            // console.log(nextProps);
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            console.log('componentWillUnmount');
	        }
	    }]);
	
	    return EasyGrid;
	}(_react2.default.Component);
	
	exports.default = EasyGrid;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var EasyGridRow = function (_React$Component) {
	    _inherits(EasyGridRow, _React$Component);
	
	    function EasyGridRow(props) {
	        _classCallCheck(this, EasyGridRow);
	
	        var _this = _possibleConstructorReturn(this, (EasyGridRow.__proto__ || Object.getPrototypeOf(EasyGridRow)).call(this, props));
	
	        _this.state = {
	            cols: [],
	            // 
	            customMap: [],
	            className: 'easy-grid-row'
	        };
	        return _this;
	    }
	
	    _createClass(EasyGridRow, [{
	        key: 'setContent',
	        value: function setContent() {
	            var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
	
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
	            var config = props.rowConfig;
	            var data = config.data;
	            var newCols = [];
	            var newCustomMap = [];
	
	            // showSelect: 是否配置了显示选择列
	            // selectCol: 选择列的配置详情
	            var showSelect = false,
	                selectCol = void 0;
	            // 读取用户选择列配置
	            var configSelectCol = config.selectCol;
	
	            if (typeof configSelectCol !== 'undefined') {
	                showSelect = typeof configSelectCol.show === 'undefined' ? false : configSelectCol.show;
	                selectCol = {
	                    show: showSelect,
	                    type: typeof configSelectCol.type === 'undefined' ? 'checkbox' : configSelectCol.type,
	                    width: typeof configSelectCol.width === 'undefined' ? '5%' : configSelectCol.width,
	                    location: typeof configSelectCol.location === 'undefined' ? 'start' : configSelectCol.location,
	                    checkedRowClass: typeof configSelectCol.checkedRowClass === 'undefined' ? 'checked' : configSelectCol.checkedRowClass
	                };
	            }
	
	            if (config.dataFlag === 0) {
	                (function () {
	
	                    // colKey: ['name', 'studentID', 'patriarchMobile', 'account', '']
	                    // let colKey = config.colKey;
	                    var colConfig = config.colConfig;
	
	                    // 判断是否配置了选择列
	                    if (showSelect && selectCol.location === 'start') {
	                        newCols.push(_react2.default.createElement(
	                            'div',
	                            { className: 'easy-grid-col select-col', key: "select-" + config.rowIndex, style: { width: selectCol.width } },
	                            _react2.default.createElement('input', { type: 'checkbox' })
	                        ));
	                    }
	
	                    var tempKey = void 0;
	                    colConfig.forEach(function (v, i) {
	                        tempKey = "row-" + config.rowIndex + "-" + i;
	                        if (typeof v.key === 'undefined' || v.key === '') {
	                            newCustomMap.push({
	                                key: tempKey,
	                                val: v.val
	                            });
	
	                            newCols.push(_react2.default.createElement('div', { className: 'easy-grid-col', key: tempKey, id: tempKey, style: { width: config.colWidth[i] } }));
	
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
	                            newCols.push(_react2.default.createElement(
	                                'div',
	                                { className: 'easy-grid-col', key: tempKey, style: { width: config.colWidth[i] } },
	                                data[v.key]
	                            ));
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
	                })();
	            }
	            this.setState({
	                cols: newCols,
	                customMap: newCustomMap
	            });
	        }
	    }, {
	        key: 'rowClick',
	        value: function rowClick() {
	            if (this.state.className.indexOf('checked') === -1) {
	                this.setState({
	                    className: 'easy-grid-row checked'
	                });
	            }
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            this.setContent();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: this.state.className, onClick: this.props.dataClick },
	                this.state.cols
	            );
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var thisDOM = ReactDOM.findDOMNode(this);
	            // this.state.customMap.forEach((v, i) => {
	            //     document.getElementById(v.key).innerHTML = v.val;
	            // });
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            // console.log(nextProps);
	            this.setContent(nextProps);
	        }
	    }]);
	
	    return EasyGridRow;
	}(_react2.default.Component);
	
	exports.default = EasyGridRow;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map