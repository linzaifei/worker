


var host = "http://47.97.100.29"//线网


export default {

    host,
    // 登录地址
    login: `${host}/account/login`,

    logout: `${host}/account/logout`,// 登出
    changePass: `${host}/account/app/changePass`,// 修改密码
    queryUserInfo: `${host}/app/user/queryUserInfo`,// 查询用户信息
    queryAllProvince: `${host}/common/queryAllProvince`,// 查询省份
    queryAreaByParentCode: `${host}/common/queryAreaByParentCode`,// 查询省份地区子集
    querySelectedJobType: `${host}/app/worker/querySelectedJobType`,// 工种树
    queryDicByType: `${host}/common/queryDicByType`,// 查询字典【根据传入的type】
    addWorker: `${host}/app/worker/addWorker`,// 新增人才信息
    list: `${host}/app/worker/list`,// 人才信息列表



}