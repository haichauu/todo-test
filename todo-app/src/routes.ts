// pages
import Todo from "./pages/Todo";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

// other
import {FC} from "react";

// interface
interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC<{}>
}

export const routes: Array<Route> = [
    {
        key: 'signin-route',
        title: 'Home',
        path: '/',
        enabled: true,
        component: SignIn
    },
    {
        key: 'signup-route',
        title: 'Sign Up',
        path: '/signup',
        enabled: true,
        component: SignUp
    },
    {
        key: 'todo-route',
        title: 'Todo',
        path: '/todo',
        enabled: true,
        component: Todo
    }
]
