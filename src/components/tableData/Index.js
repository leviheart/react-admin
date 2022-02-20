import React, {
	Component, Fragment
} from "react";
import PropTypes from "prop-types";
import { message, Modal } from "antd";
import { TableList, TableDelete } from "@api/common";
//api
import requestUrl from "@api/requestUrl";
import TableBasic from "./Table";
import FormSearch from "../formSearch/Index";

class TableComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//请求参数
			pageNumber: 1,
			pageSize: 10,
			searchData: {},
			//数据
			data: [],
			loadingTable: false,
			//页码
			total: 0,
			// 复选框
			checkboxValue: [],
			// 确认弹窗
			modalVisible: false,
			modalconfirmLoading: false,
		}
	}
	componentDidMount() {
		this.loadData();
		// 返回子组件实例
		this.props.onRef(this); //子组件调用父组件方法，并把子组件实例传回给父组件
	}

	/**获取列表数据 */
	loadData = () => {
		const { pageNumber, pageSize, searchData } = this.state;
		const requestData = {
			url: requestUrl[this.props.config.url],
			method: "post",
			data: {
				pageNumber: pageNumber,
				pageSize: pageSize,
			}
		}
		//筛选项参数拼接
		if (Object.keys(searchData).length !== 0) {
			for (let key in searchData) {
				requestData.data[key] = searchData[key]
			}
		}
		// if (JSON.stringify(searchData) !== "{}") {
		// 	console.log(searchData)
		// }
		//请求接口
		TableList(requestData).then(response => {
			const responseData = response.data.data; //数组
			if (responseData.data) {//返回一个null
				this.setState({
					data: responseData.data,
					total: responseData.total
				})
			}
			this.setState({ loadingTable: false })
		}).catch(error => {
			console.log(error)
			this.setState({ loadingTable: false })
		})
	}

	/** 复选框 */
	onCheckebox = (checkboxValue) => {
		this.setState({
			checkboxValue
		})
	}

	onChangeCurrnePage = (value) => {
		//setState自带的异步回调函数 重点
		this.setState({
			pageNumber: value
		}, () => {
			this.loadData();
		})
	}

	// 下拉页码
	onChangeSizePage = (value, page) => {
		this.setState({
			pageNumber: 1,
			pageSize: page
		}, () => {
			this.loadData();
		})
	}

	/**确认弹窗*/
	modalThen = () => {
		// 判断是否有已经选择的数据
		if (this.state.checkboxValue.length === 0) {
			message.info("请选择需要删除的数据");
			return false;
		}
		this.setState({
			modalconfirmLoading: true
		})
		const id = this.state.checkboxValue.join();
		const requestData = {
			url: requestUrl[`${this.props.config.url}Delete`],
			data: {
				id
			}
		}
		TableDelete(requestData).then(response => {
			message.info(response.data.message);
			this.setState({
				modalVisible: false,
				id: "",
				modalconfirmLoading: false,
				selectedRowKeys: []
			})
			//重新加载数据
			this.loadData();
		})
	}

	search = (searchData) => {
		this.setState({
			pageNumber: 1,
			pageSize: 10,
			searchData
		}, () => {
			this.loadData();
		})
	}

	/**
	 * 删除
	 */
	onHandlerDelete = (id) => {
		this.setState({
			modalVisible: true,
		})
		if (id) {
			this.setState({
				checkboxValue: [id]
			})
		}
	}

	render() {
		const { loadingTable, data, total, searchData } = this.state;
		const { thead, checkbox, rowkey, formItem } = this.props.config;
		const rowSelection = {
			onChange: this.onCheckebox
		}
		return (
			//fragment包裹分页和table组件,vscode自动引入ant组件
			<Fragment>
				{/* 筛选 */}
				<FormSearch formItem={formItem} search={this.search}></FormSearch>
				{/* table UI组件 */}
				<div className="table-wrap">
					<TableBasic
						columns={thead}
						dataSource={data}
						total={total}
						changePageCurrent={this.onChangeCurrnePage}
						changePageSize={this.onChangeSizePage}
						handlerDelete={() => this.onHandlerDelete()}
						rowSelection={checkbox ? rowSelection : null}
						rowkey={rowkey}></TableBasic>
				</div>
				{/* 确认弹窗 */}
				<Modal
					title="提示"
					visible={this.state.modalVisible}
					onOk={this.modalThen}
					onCancel={() => { this.setState({ modalVisible: false }) }}
					okText="确认"
					cancelText="取消"
					confirmLoading={this.state.modalconfirmLoading}
				>
					<p className="text-center">确认删除此信息?<strong className="color-red">删除后将无法恢复</strong></p>
				</Modal>
			</Fragment>
		)
	}
}

// 校验数据类型
TableComponent.propTypes = {
	config: PropTypes.object
}
//默认值
TableComponent.defaultProps = {
	batchButton: false
}
export default TableComponent;
// 传递方式从this调用改成箭头函数传 函数要带() this指向问题
//致命的K的大小写
//容器组件,处理逻辑。UI组件负责显示