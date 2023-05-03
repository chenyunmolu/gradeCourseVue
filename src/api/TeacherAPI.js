import axios from "../http/index.js";

const TEACHER_LIST_API="/api/gradeCourse/teachers";
const TEACHER_ADD_API="/api/gradeCourse/teachers/saveTeacher"
const TEACHER_DELETE_API="/api/gradeCourse/teachers/deleteTeacher"
const TEACHER_UPDATE_API="/api/gradeCourse/teachers/updateTeacher"
const TEACHER_PURE_API="/api/gradeCourse/teachers/pureTeachers"
const TEACHER_SEARCH_API="/api/gradeCourse/teachers/searchTeacher"
const TAECHER_PROFILE_API="/api/gradeCourse/teachers/getTeacherProfile"
const TEACHER_UPLOADAVATAR_API="/api/gradeCourse/teachers/uploadAvatar"
const TEACHER_UPDATEPROFILE_API="/api/gradeCourse/teachers/updateTeacherProfile"
const TAECHER_UPDATETEACHERPWD_API="/api/gradeCourse/teachers/updateTeacherPwd"

function updateTeacherPwd(oldPwd,newPwd,tid){
    return axios.get(TAECHER_UPDATETEACHERPWD_API,{
        params:{
            "oldPwd":oldPwd,
            "newPwd":newPwd,
            "tid":tid
        }
    })
}


function updateTeacherProfile(teacher){
    return axios.post(TEACHER_UPDATEPROFILE_API,teacher)
}


function uploadAvatar(data,tid){
    return axios.post(TEACHER_UPLOADAVATAR_API+"?tid="+tid,data)
}

function getTeacherProfile(tid){
    return axios.get(TAECHER_PROFILE_API+"?tid="+tid)
}

function getAllTeachers(pageNum,pageSize){
    return axios.get(TEACHER_LIST_API,{
        params:{
            "page-num":pageNum,
            "page-size":pageSize
        }
    })
}

function getAllPureTeachers(){
    return axios.get(TEACHER_PURE_API)
}
function saveTeacher(teacher){
    return axios.post(TEACHER_ADD_API,teacher)
}
function deleteTeacher(teacher){
    return axios.post(TEACHER_DELETE_API,teacher)
}

function updateTeacher(teacher,rawid){
    return axios.post(TEACHER_UPDATE_API+"?rawid="+rawid,teacher)
}
function searchTeacher(keyword,pageNum,pageSize){
    return axios.get(TEACHER_SEARCH_API,{
        params:{
            "keyword":keyword,
            "page-num":pageNum,
            "page-size":pageSize
        }
    })
}
export{
    getAllTeachers,saveTeacher,deleteTeacher,updateTeacher,getAllPureTeachers,searchTeacher,
    getTeacherProfile,uploadAvatar,updateTeacherProfile,updateTeacherPwd
}