import React, {
	Component, Fragment
} from "react";
import PropTypes from "prop-types";
import { Col, Pagination, Row, Table, Button, message, Modal } from "antd";
import { TableList, TableDelete } from "@api/common";
//api
import { Delete } from "@api/department";
import requestUrl from "@api/requestUrl";
class TableComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//请求参数
			pageNumber: 1,
			pageSize: 10,
			keyWork: "",
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
		this.props.onRef(this);
	}

	/**获取列表数据 */
	loadData = () => {
		const { pageNumber, pageSize } = this.state;
		const requestData = {
			url: requestUrl[this.props.config.url],
			method: "post",
			data: {
				pageNumber: pageNumber,
				pageSize: pageSize,
			}
		}
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
		const { loadingTable, data } = this.state;
		const { thead, checkbox, rowkey } = this.props.config;
		const rowSelection = {
			onChange: this.onCheckebox
		}
		return (
			//fragment包裹分页和table组件,vscode自动引入ant组件
			<Fragment>
				<Table
					pagination={false}
					loading={loadingTable}
					rowKey={rowkey || "id"} //致命的K的大小写
					rowSelection={checkbox ? rowSelection : null}
					columns={thead}
					dataSource={data}
					bordered />
				<div className="spacing-30"></div>
				<Row>
					<Col span={8}>
						{/* 函数判断 */}
						{this.props.batchButton && <Button onClick={() => this.onHandlerDelete()}>批量删除</Button>}
					</Col>
					<Col span={16}>
						<Pagination
							onChange={this.onChangeCurrnePage}
							onShowSizeChange={this.onChangeSizePage}
							className="pull-right"
							total={this.state.total}
							showSizeChanger
							showQuickJumper
							showTotal={total => `Total ${total} items`}
						/>
					</Col>
				</Row>
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