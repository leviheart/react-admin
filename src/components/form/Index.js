import React, { Component } from "react";
import { Form, Input, Button, Select, InputNumber, Radio, message } from "antd";
import requestUrl from "../../api/requestUrl";
import { requestData } from "../../api/common";

const { Option } = Select;
class FormCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mesPreix: {
                "Input": "请输入",
                "Radio": "请选择",
                "Select": "请选择"
            },
            loading: false
        }
    }

    componentWillReceiveProps({ formConfig }) {
        this.refs.form.setFieldsValue(formConfig.setFieldValue)
    }

    rules = (item) => {
        const { mesPreix } = this.state;
        let rules = [];
        //是否必填
        if (item.required) {
            let message = item.message || `${mesPreix[item.type]}${item.label}`;
            rules.push({ required: true, message })
        }
        if (item.rules && item.rules.length > 0) {
            rules = rules.concat(item.rules);//concat数组的拼接
        }
        return rules;
    }

    //input
    inputElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Input style={item.style} placeholder={item.placeholder}></Input>
            </Form.Item>
        )
    }

    //select
    selectElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Select style={item.style} placeholder={item.placeholder}>
                    {
                        item.options && item.options.map(elem => {
                            return <Option value={elem.value} key={elem.value}>{elem.label}</Option>
                        })
                    }
                </Select>
            </Form.Item>
        )
    }

    //inputNumber
    inputNumberElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <InputNumber defaultValue={0} min={item.min} max={item.max}></InputNumber>
            </Form.Item>
        )
    }

    //radio
    radioElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Radio.Group defaultValue={true}>
                    {
                        item.options && item.options.map(elem => {
                            return <Radio value={elem.value} key={elem.value}>{elem.label}</Radio>
                        })
                    }
                </Radio.Group>
            </Form.Item>
        )
    }

    //初始化
    initFormItem = () => {
        const { formItem } = this.props;
        //检测是否存在 formItem
        if (!formItem || (formItem && formItem.length === 0)) { return false; }
        //循环处理
        const formList = []
        formItem.map(item => {
            if (item.type === "Input") {
                formList.push(this.inputElem(item));
            }
            if (item.type === "Select") {
                formList.push(this.selectElem(item));
            }
            if (item.type === "InputNumber") {
                formList.push(this.inputNumberElem(item));
            }
            if (item.type === "Radio") {
                formList.push(this.radioElem(item));
            }
        })

        return formList;
    }

    onSubmit = (value) => { //添加、修改
        //传入的submit
        if (this.props.submit) {
            this.props.submit(value);
            return false;
        }
        const data = {
            url: requestUrl[this.props.formConfig.url],
            data: value
        }
        this.setState({ loading: true })
        requestData(data).then(response => {
            const responseData = response.data;
            //提示
            message.info(responseData.message)
            //取消按钮加载
            this.setState({ loading: false })
        }).catch(error => {
            this.setState({ loading: false })
        })
    }

    render() {
        return (
            <Form ref="form" onFinish={this.onSubmit} initialValues={this.props.formConfig.initValue} {...this.props.formLayout}>
                {this.initFormItem()}
                <Form.Item>
                    <Button loading={this.state.loading} type="primary" htmlType="submit">确认</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default FormCom;