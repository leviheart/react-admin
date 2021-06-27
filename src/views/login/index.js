import React, { Component } from "react";
// css
import "./index.scss";

//组件
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

class Login extends Component {
	constructor() {
		super();
		this.state = {
			formType: "login"
		};
	}

	switchForm = (value) => {
		// 父级方法接受子级传回的value，通过setState改变状态，组件里绑定属性
		this.setState({
			formType: value
		})
	}

	render() {
		return (
			<div className="form-wrap">
				{/* 登录注册 */}
				<div>
					{
						this.state.formType === 'login' ?
							<LoginForm switchForm={this.switchForm}></LoginForm> :
							<RegisterForm switchForm={this.switchForm}></RegisterForm>
					}
				</div>
			</div>
		)
	}
}

export default Login;