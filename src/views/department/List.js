import React, { Component, Fragment } from "react";
//link
import { Link } from "react-router-dom";
//antd
import { Button, Switch, message } from "antd";
//api
import { Status } from "@api/department";
//table组件
import TableComponent from "@c/tableData/Index.js";
class DepartmentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //id
            id: "",
            //flag
            flag: false,
            //请求参数
            pageNumber: 1,
            pageSize: 10,
            keyWork: "",
            //表头
            tableConfig: {
                url: "departmentList",
                checkbox: true,
                rowkey: "id",
                batchButton: false,
                thead: [
                    {
                        title: "部门名称",
                        dataIndex: "name",
                        key: "name",
                        render: (name, rowData) => {
                            return <a href={rowData.id}>{name}</a>
                        }
                    },
                    {
                        title: "禁启用",
                        dataIndex: "status",
                        key: "status",
                        render: (status, rowData) => {
                            return <Switch onChange={() => this.onHandlerSwitch(rowData)} loading={rowData.id === this.state.id} checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={status === "1" ? true : false}></Switch>
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
                                    <Button onClick={() => this.delete(rowData.id)}>删除</Button>
                                </div>
                            )
                        }
                    }
                ],
            },
            //表的数据
            data: []
        };
    }
    // 生命周期
    componentDidMount() {
    }

    //获取子组件实例-不定名
    getChildRef = (ref) => {
        //存储子组件
        this.tableComponent = ref;
    }


    /**禁启用*/
    onHandlerSwitch(data) {
        if (!data.status) { return false; }
        if (this.state.flag) { return false; }
        const requestData = {
            id: data.id,
            status: data.status === "1" ? false : true
        }
        //用组件本身异步
        this.setState({ id: data.id })
        Status(requestData).then(response => {
            message.info(response.data.message);
            this.setState({ id: "" })
        }).catch(error => {
            this.setState({ id: "" })
        })
    }

    // 删除
    delete = (id) => {
        this.tableComponent.onHandlerDelete(id)
    }

    render() {
        return (
            <Fragment>

                {/* 子组件 */}
                <TableComponent onRef={this.getChildRef} batchButton={true} config={this.state.tableConfig} />

            </Fragment>
        )
    }
}

export default DepartmentList;
// 19部门列表制作
//Table 19 9min columns表头相关信息 dataSources数据
//Modal 20 10min 确认接口 取消直接在方法里写
//22-3 39min 给文字加链接