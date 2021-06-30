import React, { Component } from "react";
//antd
import { Layout } from "antd";
//样式
import "./layout.scss"
//layout组件
import LayoutAside from "./components/aside";
import LayoutHeader from "./components/header";

const { Sider, Header, Content } = Layout;
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Layout className="layout-wrap">
                <Header className="layout-header"><LayoutHeader></LayoutHeader></Header>
                <Layout>
                    <Sider width="250px"><LayoutAside></LayoutAside></Sider>
                    <Content className="layout-main">内容区</Content>
                </Layout>
            </Layout>
        )
    }
}

export default Index;