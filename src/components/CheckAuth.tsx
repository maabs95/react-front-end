import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { validation } from "./api/auth";

export function CheckAuth(children: JSX.IntrinsicAttributes){
    // let status;
    // const v = validate();
    // console.log(v);

    // v.then(function(result) {
    //     status = result;
    // });

    // return status === 200? children: <Navigate to="/login" replace />;
}
