import React, { Component, Fragment } from "react";
//ANTD
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
//验证
import { validate_password } from "../../utils/validate"
//API
import { Login } from "../../api/account";
//组件
import Code from "../../components/code/index"

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            username: ""
        };
    }
    //登录
    onFinish = (values) => {
        Login().then(response => {
            console.log("成功调用接口")
        }).catch(error => {

        })
        console.log('Received values of form: ', values);
    }

    /**
    * input输入处理,e里面的target属性，就是输入框当前值,可以打印出来看是否接收到
    */
    inputChange = (e) => {
        let value = e.target.value;
        this.setState({
            username: value
        })
    }

    toggleForm = () => {
        //子级组件通过点击，触发此方法，然后调用父级方法，传回值
        this.props.switchForm("register")
    }

    render() {
        const { username } = this.state;
        return (
            <Fragment>
                {/* 表头 */}
                <div className="form-header">
                    <h4 className="column">登录</h4>
                    <span onClick={this.toggleForm}>账号注册</span>
                </div>
                {/* 输入框 */}
                <div className="form-content">
                    <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={this.onFinish}>
                        {/* 用户名输入框 */}
                        <Form.Item name="username" rules={
                            [
                                { required: true, message: '邮箱不能为空' },
                                { type: "email", message: "邮箱格式不正确" }
                            ]
                        }>
                            <Input value={username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                        </Form.Item>
                        {/* 密码输入框 */}
                        <Form.Item name="password" rules={
                            [
                                { required: true, message: '密码不能为空' },
                                // ({ getFieldValue }) => ({
                                //     validator(rule, value) {
                                //         if (value.length < 6) {
                                //             return Promise.reject('不能小于6位');
                                //         }
                                //         else {
                                //             return Promise.resolve();
                                //         }
                                //     },
                                // }),
                                // { min: 6, message: "不能小于6位" },
                                // { max: 20, message: "不能大于20位" },
                                { pattern: validate_password, message: "请输入大于6位小于20位数字+字母" },
                            ]
                        }>
                            <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>
                        {/* 验证码输入框 分列*/}
                        <Form.Item name="code" rules={
                            [
                                { required: true, message: '验证码不能为空' },
                                { len: 6, message: "请输入长度为6位的验证码" }
                            ]
                        }
                        >
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Code" />
                                </Col>
                                <Col span={9}>
                                    <Code username={username}></Code>
                                </Col>
                            </Row>
                        </Form.Item>
                        {/* 登录按钮 */}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block>登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment >
        )
    }
}

export default LoginForm;