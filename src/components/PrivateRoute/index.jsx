import { Route, Redirect } from "react-router-dom";

function isAuth() {
    var user = localStorage.getItem('user');
    if (!user)
        return false;

    return true;
}


export default function PrivateRoute ({ component: Component, ...rest }) {
    return (

        <Route {...rest} render={props => (
            isAuth() ?
                <Component {...props} />
                : <Redirect to="/" />
        )} />
    );
};