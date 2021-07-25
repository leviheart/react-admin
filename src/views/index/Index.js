import React, { Component } from "react";
//antd
import { Layout } from "antd";
//样式
import "./layout.scss"
//layout组件
import LayoutAside from "./components/Aside";
import LayoutHeader from "./components/Header";
import ContainerMain from "../../components/containerMain/Index";

const { Sider, Header, Content } = Layout;
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        };
    }

    componentDidMount() {
        const collapsed = JSON.parse(sessionStorage.getItem("collapsed"));
        this.setState({ collapsed });
    }

    toggleCollapsed = () => {
        const collapsed = !this.state.collapsed
        this.setState({ collapsed });
        sessionStorage.setItem("collapsed", collapsed);
    }

    render() {
        return (
            <Layout className="layout-wrap">
                <Header className="layout-header"><LayoutHeader toggle={this.toggleCollapsed} collapsed={this.state.collapsed}></LayoutHeader></Header>
                <Layout>
                    <Sider width="250px" collapsed={this.state.collapsed}><LayoutAside></LayoutAside></Sider>
                    <Content className="layout-main">
                        <ContainerMain></ContainerMain>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Index;