import React, { Component } from "react";
//ANTD
import { Form, Input, Button, InputNumber, Radio, message } from "antd";
//API
import { DepartmentAddApi } from "../../api/department";

class DepartmentAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            formLayout: {
                labelCol: { span: 2 },
                wrapperCol: { span: 22 }
            }
        };
    }

    onSubmit = (value) => {
        if (!value.name) {
            message.error("部门名称不能为空");
            return false;
        }
        if (!value.number || value.number === 0) {
            message.error("人员数量不能为0");
            return false;
        }
        if (!value.content) {
            message.error("描述不能为空");
            return false;
        }
        this.setState({
            loading: true,
        })
        console.log(value)
        DepartmentAddApi(value).then(response => {
            const data = response.data;
            message.info(data.message);
            this.setState({
                loading: false,
            })
            //重置表单
            this.refs.form.resetFields();
        }).catch(error => {
            this.setState({
                loading: false,
            })
        })
    }

    render() {
        return (
            <Form ref="form" onFinish={this.onSubmit} {...this.state.formLayout}>
                <Form.Item label="部门名称" name="name">
                    <Input></Input>
                </Form.Item>
                <Form.Item label="人员数量" name="number">
                    <InputNumber defaultValue={0} min={0} max={100}></InputNumber>
                </Form.Item>
                <Form.Item label="禁启用" name="status">
                    <Radio.Group defaultValue={true}>
                        <Radio value={false}>禁用</Radio>
                        <Radio value={true}>启用</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="描述" name="content">
                    <Input.TextArea></Input.TextArea>
                </Form.Item>
                <Form.Item>
                    <Button loading={this.state.loading} type="primary" htmlType="submit">确认</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default DepartmentAdd;

//form菜单，引入组件，设置label，接口key值，循环创建input，描述多行，顶级form标签内用labelCol设置布局
//按钮触发submit方法,es6 ... 扩展就是属性名里的所有都解析加进去,api文件夹下新建department.js文件
//传的值的类型
//17 10min labelCol表格栅格布局
//17-1 20min 按钮添加loading