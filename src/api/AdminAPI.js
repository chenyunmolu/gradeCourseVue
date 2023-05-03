import axios from "../http/index.js";

const ADMIN_PROFILE_API="/api/gradeCourse/admins/getAdminProfile"
const ADMIN_UPLOADAVATAR_API="/api/gradeCourse/admins/uploadAvatar"
const AMDIN_UPDATEPROFILE_API="/api/gradeCourse/admins/updateAdminProfile"
const ADMIN_UPDATEPWD_API="/api/gradeCourse/admins/updateAdminPwd"

function updateAdminPwd(oldPwd,newPwd,adminid){
    return axios.get(ADMIN_UPDATEPWD_API,{
        params:{
            "oldPwd":oldPwd,
            "newPwd":newPwd,
            "adminid":adminid
        }
    })
}

function updateAdminProfile(admin){
    return axios.post(AMDIN_UPDATEPROFILE_API,admin)
}

function uploadAvatar(data,adminid){
    return axios.post(ADMIN_UPLOADAVATAR_API+"?adminid="+adminid,data)
}

function getAdminProfile(adminid){
    return axios.get(ADMIN_PROFILE_API+"?adminid="+adminid)
}

export{
    getAdminProfile,uploadAvatar,updateAdminProfile,updateAdminPwd
}