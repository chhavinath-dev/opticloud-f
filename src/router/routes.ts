import React from "react";

import { PARENT_ROUTES } from "../utils/constants";
import { ROUTES } from "../utils/constants/routes";

const Login = React.lazy(() => import("../pages/auth/login"));
const SignUp = React.lazy(() => import("../pages/auth/signup"))
const ForgotPassword = React.lazy(()=> import("../pages/auth/forgotpass"))
const routes = [
	{ path: ROUTES.LOGIN, name: "Login", component: Login, childOf: PARENT_ROUTES.AUTH },
	{ path: ROUTES.SIGNUP, name: "SignUp", component: SignUp, childOf: PARENT_ROUTES.AUTH },
	{ path: ROUTES.FORGOT_PASSWORD, name: "ForgetPassword", component: ForgotPassword, childOf: PARENT_ROUTES.AUTH },
];

export default routes;
