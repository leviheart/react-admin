import React, { Component } from "react";
//ANTD
import { message } from "antd";
//API
import { Detailed, Edit } from "../../api/department";
//组件
import FormCom from "../../components/form/Index";

class DepartmentAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            id: "",
            formConfig: {
                url: "departmentAdd"
            },
            formLayout: {
                labelCol: { span: 2 },
                wrapperCol: { span: 22 }
            },
            formItem: [
                {
                    type: "Input",
                    label: "部门名称",
                    name: "name",
                    required: true,
                    style: { width: "200px" },
                    placeholder: "请输入部门名称"
                },
                {
                    type: "InputNumber",
                    label: "人员数量",
                    name: "number",
                    required: true,
                    min: 0,
                    max: 100,
                    style: { width: "200px" },
                    placeholder: "请输入人员数量"
                },
                {
                    type: "Radio",
                    label: "禁启用",
                    name: "state",
                    required: true,
                    options: [
                        { label: "禁用", value: false },
                        { label: "启用", value: true }
                    ]
                },
            ]
        };
    }

    componentWillMount() {
        if (this.props.location.state) {
            this.setState({
                id: this.props.location.state.id
            })
        }
    }

    componentDidMount() {
        this.getDetailed();
    }

    getDetailed = () => {
        if (!this.props.location.state) { return false }
        //进入模块时,获取name之类的数据
        Detailed({ id: this.state.id }).then(response => {
            // const data = response.data.data;
            // this.refs.form.setFieldsValue({
            //     content: "",
            //     name: "",
            //     number: "",
            //     status: true
            // })
            this.refs.form.setFieldsValue(response.data.data);
        })
    }

    /**编辑信息 */
    onHandlerEdit = (value) => {
        const requestData = value;
        requestData.id = this.state.id;
        Edit(requestData).then(response => {
            const data = response.data;
            message.info(data.message)
            this.setState({
                loading: false
            })
        }).catch(error => {
            this.setState({
                loading: false
            })
        })
    }


    render() {
        const { formItem, formLayout, formConfig } = this.state
        return (
            <>
                <FormCom formItem={formItem} formLayout={formLayout} onSubmit={this.onSubmit} formConfig={formConfig}></FormCom>
            </>
        )
    }
}

export default DepartmentAdd;

//form菜单，引入组件，设置label，接口key值，循环创建input，描述多行，顶级form标签内用labelCol设置布局
//按钮触发submit方法,es6 ... 扩展就是属性名里的所有都解析加进去,api文件夹下新建department.js文件
//传的值的类型
//17 10min labelCol表格栅格布局
//17-1 20min 按钮添加loading