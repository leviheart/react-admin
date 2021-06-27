import React, { Component, Fragment } from "react";
//ANTD
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';

class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {};
    }

    onFinish = (values) => {
        console.log('Received values of form: ', values);
    }

    toggleForm = () => {
        //子级组件通过点击，触发此方法，然后调用父级方法，传回值
        this.props.switchForm("login")
    }

    render() {
        return (
            <Fragment>
                {/* 表头 */}
                <div className="form-header">
                    <h4 className="column">注册</h4>
                    <span onClick={this.toggleForm}>登录</span>
                </div>
                {/* 输入框 */}
                <div className="form-content">
                    <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={() => this.onFinish}>
                        {/* 用户名输入框 */}
                        <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        {/* 密码输入框 */}
                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                            <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>
                        {/* 重复密码输入框 */}
                        <Form.Item name="passwords" rules={[{ required: true, message: 'Please input your Passwords!' }]}>
                            <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Passwords" />
                        </Form.Item>
                        {/* 验证码输入框 分列*/}
                        <Form.Item>
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Code" />
                                </Col>
                                <Col span={9}>
                                    <Button type="danger">获取验证码</Button>
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