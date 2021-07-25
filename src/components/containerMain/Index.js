import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// //组件
// import User from "../../views/user/List";
// import UserAdd from "../../views/user/Add";
// //部门
// import DepartmentList from "../../views/department/List";
// import DepartmentAdd from "../../views/department/Add";
//私有组件方法
import PrivateRouter from "../privateRouter/Index";
/**自动化工程 */
import Components from './components';


class ContainerMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Switch>
                {
                    Components.map(item => {
                        return <PrivateRouter exact key={item.path} path={item.path} component={item.component}></PrivateRouter>
                    })
                }
                {/* <PrivateRouter exact path="/index/user/list" component={User}></PrivateRouter>
                <PrivateRouter exact path="/index/user/add" component={UserAdd}></PrivateRouter>
                <PrivateRouter exact path="/index/department/list" component={DepartmentList}></PrivateRouter>
                <PrivateRouter exact path="/index/department/add" component={DepartmentAdd}></PrivateRouter> */}
            </Switch>
        )
    }
}

export default ContainerMain;
