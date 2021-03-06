import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({component : Component, ...rest}) => {

    const token =  localStorage.getItem("auth_token");
    const  role =  localStorage.getItem("auth_role");
  return (
    <Route {...rest}
        render={props => {
            if(token){
                return <Component {...props}/>
            }else {
                return(
                    <Redirect to={{
                        pathname : "/login",
                        state : {
                           from : props.location 
                        }
                    }}
                    />
                )
            }
        }}
    />
)};

export default ProtectedRoute;
