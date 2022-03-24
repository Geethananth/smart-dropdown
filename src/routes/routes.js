import React, { Suspense }  from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import NetworkError from '../Core/Components/Errors/NetworkError';
import Loader from '../Core/Components/Loader/Loader';





const routes = () => {
    return (
        <BrowserRouter>
        <NetworkError>
        <Suspense fallback={Loader()}>
            <Switch>
                <Route path="/" exact component ={React.lazy(() => import('../Modules/Auth/LoginScreen'))}></Route>
                <Route path="/home" exact component ={React.lazy(() => import('../Modules/Home'))}></Route>
           </Switch>
           </Suspense>
           </NetworkError>
        </BrowserRouter>

    );
}

export default routes;