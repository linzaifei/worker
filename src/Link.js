


var host = "http://47.97.100.29"//线网


export default {

    host,
    // 登录地址
    login: `${host}/account/login`,

    logout: `${host}/account/logout`,// 登出
    changePass: `${host}/account/changePass`,// 修改密码
    queryUserInfo: `${host}/app/user/queryUserInfo`,// 查询用户信息
    queryAllProvince: `${host}/common/queryAllProvince`,// 查询省份
    queryAreaByParentCode: `${host}/account/queryAreaByParentCode`,// 查询省份地区子集
    querySelectedJobType: `${host}/app/worker/querySelectedJobType`,// 工种树
    list: `${host}/app/worker/list`,// 人才信息列表



}