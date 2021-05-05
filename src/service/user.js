import axios from '../utils/axios'  //导入二次封装的axios

// 获取用户信息
export function getUserInfo() {
    return axios.get('/user/info');
}

// 更改用户信息
export function EditUserInfo(params) {
    return axios.put('/user/info', params);
}

// 登录
export function login(params) {
    return axios.post('/user/login', params);
}

// 登出
export function logout() {
    return axios.post('/user/logout')
}

// 注册
export function register(params) {
    return axios.post('/user/register', params);
}
