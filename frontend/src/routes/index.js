import Vue from 'vue'
import Router from 'vue-router'
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import UserList from "../components/UserList";
import boardNotice from "../components/boardNotice";
import boardWrite from "../components/boardWrite";
import boardDetail from "../components/boardDetail";

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/signUp',
            name: 'SignUp',
            component: SignUp
        },
        {
            path: '/userList',
            name: 'UserList',
            component: UserList
        },
        {
            path: '/boardNotice',
            name: 'boardNotice',
            component: boardNotice
        },
        {
            path: '/boardWrite',
            name: 'boardWrite',
            component: boardWrite
        },
        {
            path: '/boardDetail',
            name: 'boardDetail',
            component: boardDetail,
            props: true
        },
    ]
})