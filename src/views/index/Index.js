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

        };
    }

    render() {
        return (
            <Layout className="layout-wrap">
                <Header className="layout-header"><LayoutHeader></LayoutHeader></Header>
                <Layout>
                    <Sider width="250px"><LayoutAside></LayoutAside></Sider>
                    <Content className="layout-main">
                        <ContainerMain></ContainerMain>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Index;