import React, { Component } from "react";
//antd
import { Button, message } from "antd";
//接口
import { GetCode } from "../../api/account";
//验证
import { validate_email } from "../../utils/validate"
//定时器
let timer = null;
//class组件
class Code extends Component {
    constructor(props) {
        //初始化默认值props
        super(props);
        this.state = {
            username: props.username,
            code_button_loading: false,
            code_button_disabled: false,
            code_button_text: "获取验证码",
            module: props.module
        }
    }
    //每次都会去获取 this.props.username
    componentWillReceiveProps({ username }) {
        this.setState({
            username
        })
    }
    //销毁组件
    componentWillUnmount() {
        clearInterval(timer);
    }
    //获取验证码
    getCode = () => {
        const username = this.state.username
        if (!username) {
            message.warning('用户名不能为空!!', 1);
            return false;
        }
        if (!validate_email(username)) {
            message.warning('邮箱格式不正确', 1);
            return false;
        }
        this.setState({
            code_button_loading: true,
            code_button_text: "发送中"
        })
        const requestData = {
            username,
            module: this.state.module
        }
        GetCode(requestData).then(response => {
            //验证码信息弹出提示
            message.success(response.data.message);
            //执行倒计时
            this.countDown();
        }).catch(error => {
            this.setState({
                code_button_loading: false,
                code_button_text: "重新获取"
            })
        })
    }

    /**
     * 倒计时方法
     */
    countDown = () => {
        //倒计时时间
        let sec = 60;
        //修改状态
        this.setState({
            code_button_loading: false,
            code_button_disabled: true,
            code_button_text: `${sec}S`
        })
        timer = setInterval(() => {
            sec--;
            if (sec <= 0) {
                this.setState({
                    code_button_disabled: false,
                    code_button_text: "重新获取"
                })
                clearInterval(timer);
                return false;
            }
            this.setState({
                code_button_text: `${sec}S`
            })
        }, 1000)
    }

    render() {
        return <Button type="danger" disabled={this.state.code_button_disabled} loading={this.state.code_button_loading} block onClick={this.getCode}>{this.state.code_button_text}</Button>
    }
}

export default Code;