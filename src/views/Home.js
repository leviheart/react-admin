import React, { Component, Fragment } from 'react';
import "./aaa.scss";
import { Button } from "antd";

class Home extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <Fragment>
                Home
                <Button>按钮</Button>
            </Fragment>
        )
    }
}
export default Home;