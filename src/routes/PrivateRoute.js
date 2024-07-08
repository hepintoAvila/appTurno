import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { APICore } from '../helpers/api/apiCore';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = APICore.isUserAuthenticated(); // Aquí debes verificar tu método de autenticación
console.log('isAuthenticated',isAuthenticated);
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/account/logout', state: { from: props.location } }} />
                )
            }
        />
    );
};

export default PrivateRoute;
