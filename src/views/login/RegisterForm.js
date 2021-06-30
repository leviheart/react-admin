import React, { Component, Fragment } from "react";
//ANTD
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
//验证
import { validate_pass } from "../../utils/validate";
//组件
import Code from "../../components/code/index"
//接口
import { Register } from "../../api/account";
//加密
import CryptoJs from 'crypto-js';

class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            code: "",
            module: "register"
        };
    }

    onFinish = (values) => {
        const requestData = {
            username: this.state.username,
            password: CryptoJs.MD5(this.state.password).toString(),
            code: this.state.code
        }
        Register(requestData).then(response => {
            const data = response.data;
            message.success(data.message)
            if (data.resCode === 0) {
                this.toggleForm();
            }
        }).catch(error => {

        })
    }
    /**
     * input输入保存
     */
    inputChangeUsername = (e) => {
        let value = e.target.value;
        this.setState({
            username: value
        })
    }

    /**
     * input输入处理
     */
    inputChangePassword = (e) => {
        let value = e.target.value;
        this.setState({
            password: value
        })
    }

    /**
     * input输入处理
     */
    inputChangeCode = (e) => {
        let value = e.target.value;
        this.setState({
            code: value
        })
    }

    toggleForm = () => {
        //子级组件通过点击，触发此方法，然后调用父级方法，传回值
        this.props.switchForm("login")
    }

    render() {
        const { username, module } = this.state;
        return (
            <Fragment>
                {/* 表头 */}
                <div className="form-header">
                    <h4 className="column">注册</h4>
                    <span onClick={this.toggleForm}>登录</span>
                </div>
                {/* 输入框 */}
                <div className="form-content">
                    <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={this.onFinish}>
                        {/* 用户名输入框 */}
                        <Form.Item name="username" rules={[
                            { required: true, message: '邮箱不能为空!' },
                            { type: "email", message: "邮箱格式不正确" }
                        ]}>
                            <Input onChange={this.inputChangeUsername} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" />
                        </Form.Item>
                        {/* 密码输入框 */}
                        <Form.Item name="password" rules={[
                            { required: true, message: '密码不能为空!' },
                            ({ getFieldValue }) => ({
                                validator(role, value) {
                                    if (!validate_pass(value)) {
                                        return Promise.reject("请输入大于6位小于20位的数字和字母!!")
                                    }
                                    return Promise.resolve();
                                }
                            })
                        ]}>
                            <Input onChange={this.inputChangePassword} type="password" prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="请输入密码" />
                        </Form.Item>
                        {/* 重复密码输入框 */}
                        <Form.Item name="passwords" rules={[
                            { required: true, message: '再次输入密码不能为空!' },
                            ({ getFieldValue }) => ({
                                validator(role, value) {
                                    if (value !== getFieldValue("password")) {
                                        return Promise.reject("两次密码不一致!!")
                                    }
                                    return Promise.resolve();
                                }
                            })
                        ]}>
                            <Input type="password" prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="请再次输入密码" />
                        </Form.Item>
                        {/* 验证码输入框 分列*/}
                        <Form.Item name="code" rules={[
                            { required: true, message: "请输入验证码", len: 6 }
                        ]}>
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input onChange={this.inputChangeCode} prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="请输入验证码" />
                                </Col>
                                <Col span={9}>
                                    <Code username={username} module={module}></Code>
                                </Col>
                            </Row>
                        </Form.Item>
                        {/* 登录按钮 */}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block>注册</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        )
    }
}

export default RegisterForm;