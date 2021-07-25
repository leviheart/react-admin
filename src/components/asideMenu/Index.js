import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
//icon
import { UserOutlined } from '@ant-design/icons';
//antd
import { Menu } from "antd";
//路由
import Router from '../../router/Index';

const { SubMenu } = Menu;

class AsideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: [],
            openKeys: []
        };
    }

    //生命周期,在这里多了一层接口请求,并过滤路由
    componentDidMount() {
        const pathname = this.props.location.pathname;
        const menuKey = pathname.split("/").slice(0, 3).join('/');
        // console.log(pathname.split("/"))//拆解
        // console.log(pathname.split("/").slice(0, 3))//截取
        // console.log(pathname.split("/").slice(0, 3).join('/'))//拼接
        const menuHigh = {
            selectedKeys: pathname,
            openKeys: menuKey
        }
        this.selectMenuHigh(menuHigh);
    }

    /**
     * 选择菜单
     */
    selectMenu = ({ item, key, keyPath, domEvent }) => {
        //因为这个对象的值要放进数组里，所以不需要加[]
        const menuHigh = {
            //选取-父级
            selectedKeys: key,
            //展开-子级
            openKeys: keyPath[keyPath.length - 1]//拿最后一项
        }
        this.selectMenuHigh(menuHigh);
    }

    openMenu = (openKeys) => {
        this.setState({
            openKeys: [openKeys[openKeys.length - 1]]
        })
    }

    /**菜单高光 */
    selectMenuHigh = ({ selectedKeys, openKeys }) => {
        this.setState({
            selectedKeys: [selectedKeys],
            openKeys: [openKeys]
        })
    }

    //无子级菜单处理
    renderMenu = ({ title, key }) => {
        return (
            <Menu.Item key={key}>
                <Link to={key}><span>{title}</span></Link>
            </Menu.Item>
        )
    }

    //子级菜单处理
    renderSubMenu = ({ title, key, child }) => {
        return (
            <SubMenu key={key} icon={<UserOutlined></UserOutlined>} title={title}>
                {
                    child && child.map(item => {
                        return item.child && item.child.length > 0 ? this.renderSubMenu(item) : this.renderMenu(item);
                    })
                }
            </SubMenu>
        )
    }

    render() {
        const { selectedKeys, openKeys } = this.state;
        return (
            <Fragment>
                <Menu
                    onOpenChange={this.openMenu}
                    onClick={this.selectMenu}
                    theme="dark"
                    mode="inline"
                    selectedKeys={selectedKeys}
                    openKeys={openKeys}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {
                        Router && Router.map(firstItem => {
                            return firstItem.child && firstItem.child.length > 0 ? this.renderSubMenu(firstItem) : this.renderMenu(firstItem);
                        })
                    }
                </Menu>
            </Fragment>
        )
    }
}

export default withRouter(AsideMenu);
// defaultSelectedKeys初始默认选中
// defaultOpenKeys初始默认打开,与router里的key相匹配
//selectedKeys当前选中
//openKeys当前展开的子菜单key
//使用withRouter传入history,location,mathch对象到props对象上
//selectedKeys,openKeys处理高光