import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { getToken } from "../../utils/cookies";

const PrivateRouter = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={routeProps => (
            getToken() ? <Component {...routeProps} /> : <Redirect to="/" />
        )}
        ></Route>
    )
}

export default PrivateRouter;