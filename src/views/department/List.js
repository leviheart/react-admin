import React, { Component, Fragment } from "react";
//link
import { Link } from "react-router-dom";
//antd
import { Form, Input, Button, Table, Switch, message, Modal } from "antd";
//api
import { GetList, Delete, Status } from "@api/department";
class DepartmentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //请求参数
            pageNumber: 1,
            pageSize: 10,
            keyWork: "",
            //复选框数据
            selectedRowKeys: [],
            //警告弹窗
            visible: false,
            //弹窗确定按钮 loading
            confirmLoading: false,
            //id
            id: "",
            //表头
            columns: [
                { title: "部门名称", dataIndex: "name", key: "name" },
                {
                    title: "禁启用",
                    dataIndex: "status",
                    key: "status",
                    render: (text, rowData) => {
                        return <Switch onChange={() => this.onHandlerSwitch(rowData)} checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={rowData.status === "1" ? true : false}></Switch>
                    }
                },
                { title: "人员数量", dataIndex: "number", key: "number" },
                {
                    title: "操作",
                    dataIndex: "operation",
                    key: "operation",
                    width: "225px",
                    render: (text, rowData) => {
                        return (
                            <div className="inline-button">
                                <Button type="primary">
                                    <Link to={{ pathname: '/index/department/add', state: { id: rowData.id } }}>编辑</Link>
                                </Button>
                                <Button onClick={() => this.onHandlerDelete(rowData.id)}>删除</Button>
                            </div>
                        )
                    }
                }
            ],
            //表的数据
            data: []
        };
    }

    /**
     * 生命周期挂载完成
     */
    componentDidMount() {
        this.loadData();
    }

    /**获取列表数据 */
    loadData = () => {
        const { pageNumber, pageSize, keyWork } = this.state;
        const requestData = {
            pageNumber: pageNumber,
            pageSize: pageSize,
        }
        if (keyWork) {
            requestData.name = keyWork;
        }
        GetList(requestData).then(response => {
            const responseData = response.data.data; //数组
            if (responseData) {//返回一个null
                this.setState({
                    data: responseData.data
                })
            }
        }).catch(error => {
            console.log(error)
        })
    }

    /**搜索*/
    onFinish = (value) => {
        this.setState({
            keyWork: value.name,
            pageNumberL: 1,
            pageSize: 10,
        })
        //请求数据
        this.loadData();
    }

    /**
     * 删除
     */
    onHandlerDelete(id) {
        if (!id) { return false; }
        this.setState({
            visible: true,
            id
        })
    }

    /**禁启用*/
    onHandlerSwitch(data) {
        if (!data.status) { return false; }
        const requestData = {
            id: data.id,
            status: data.status === "1" ? false : true
        }
        Status(requestData).then(response => {
            message.info(response.data.message);
        })
    }

    /**复选框 */
    onCheckebox = (selectedRowKeys) => {
        this.setState({ selectedRowKeys })
    }

    /**弹窗*/
    modalThen = () => {
        this.setState({
            confirmLoading: true
        })
        Delete({ id: this.state.id }).then(response => {
            message.info(response.data.message);
            this.setState({
                visible: false,
                id: "",
                confirmLoading: false
            })
            //刷新页面，即再请求一次数据
            this.loadData();
        })
    }

    render() {
        const { columns, data } = this.state;
        const rowSelection = {
            onChange: this.onCheckebox
        }
        return (
            <Fragment>
                <Form layout="inline" onFinish={this.onFinish}>
                    <Form.Item label="部门名称" name="name">
                        <Input placeholder="请输入部门名称"></Input>
                    </Form.Item>
                    <Form.Item shouldUpdate={true}>
                        <Button type="primary" htmlType="submit">搜索</Button>
                    </Form.Item>
                </Form>
                <div className="table-wrap">
                    <Table rowSelection={rowSelection} rowKey="id" columns={columns} dataSource={data} bordered></Table>
                </div>
                <Modal
                    title="提示"
                    visible={this.state.visible}
                    onOk={this.modalThen}
                    onCancel={() => { this.setState({ visible: false }) }}
                    okText="确认"
                    cancelText="取消"
                    confirmLoading={this.confirmLoading}
                >
                    <p className="text-center">确认删除此信息?<strong className="color-red">删除后将无法恢复</strong></p>
                </Modal>
            </Fragment>
        )
    }
}

export default DepartmentList;
// 19部门列表制作
//Table 19 9min columns表头相关信息 dataSources数据
//Modal 20 10min 确认接口 取消直接在方法里写