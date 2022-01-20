import React, {
	Component, Fragment
} from "react";
import PropTypes from "prop-types";
import { Col, Pagination, Row, Table, Button } from "antd";
import { TableList } from "@api/common";
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
		}
	}
	componentDidMount() {
		this.loadData();
	}

	/**获取列表数据 */
	loadData = () => {
		console.log(this.props.config);
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
	onCheckebox = (value) => {
		console.log(value);
	}

	onChangeCurrnePage = (value) => {
		//setState自带的异步回调函数 重点
		this.setState({
			pageNumber: value
		}, () => {
			this.loadData();
		})
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
					rowkey={rowkey || "id"}
					rowSelection={checkbox ? rowSelection : null}
					columns={thead}
					dataSource={data}
					bordered />
				<Row>
					<Col span={8}>
						{/* 函数判断 */}
						{this.props.batchButton && <Button>批量删除</Button>}
					</Col>
					<Col span={16}>
						<Pagination
							onChange={this.onChangeCurrnePage}
							className="pull-right"
							total={this.state.total}
							showSizeChanger
							showQuickJumper
							showTotal={total => `Total ${total} items`}
						/>
					</Col>
				</Row>
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
