import axios from "../http/index.js";

const STUDENT_LIST_API="/api/gradeCourse/students"
const STUDENT_CURRENTPAGE_API="/api/gradeCourse/students/currentPageStudent"
const STUDENT_SAVE_API="/api/gradeCourse/students/saveStudent"
const STUDENT_UPDATE_API="/api/gradeCourse/students/updateStudent"
const STUDENT_DELETE_API="/api/gradeCourse/students/deleteStudent"
const STUDENT_SEARCH_API="/api/gradeCourse/students/searchStudent"
const STUDENT_EXPORT_API="/api/gradeCourse/students/exportStudent"
const STUDENT_TEMPLATE_API="/api/gradeCourse/students/importTemplate"
const STUDENT_PROFILE_API="/api/gradeCourse/students/getStudentProfile"
const STUDET_UPLOADAVATR_API="/api/gradeCourse/students/uploadAvatar"
const STUDENT_UPDATEPROFILE_API="/api/gradeCourse/students/updateStudentProfile"
const STUDENT_UPDATEUSERPWD_API="/api/gradeCourse/students/updateStudentPwd"
const STUDENY_GETMYWORK_API="/api/gradeCourse/students/getMyWork"

function getMyWork(stuid){
    return axios.get(STUDENY_GETMYWORK_API+"?stuid="+stuid);
}

function updateUserPwd(oldPwd,newPwd,stuid){
    return axios.get(STUDENT_UPDATEUSERPWD_API,{
        params:{
            "oldPwd":oldPwd,
            "newPwd":newPwd,
            "stuid":stuid
        }
    })
}

function updateUserProfile(student){
    return axios.post(STUDENT_UPDATEPROFILE_API,student)
}

function uploadAvatar(data,stuid){
    return axios.post(STUDET_UPLOADAVATR_API+"?stuid="+stuid,data)
}


function getUserProfile(stuid){
    return axios.get(STUDENT_PROFILE_API+"?stuid="+stuid);

}

function getAllStudents(){
    return axios.get(STUDENT_LIST_API);
}

function getCurrentPageStudent(pageNum,pageSize){
    return axios.get(STUDENT_CURRENTPAGE_API,{
        params:{
            "page-num":pageNum,
            "page-size":pageSize
        }
    })
}

function saveStudent(student){
    return axios.post(STUDENT_SAVE_API,student);
}

function updateStudent(student,stuid){
    return axios.post(STUDENT_UPDATE_API+"?stuid="+stuid,student)
}

function deleteStudent(student){
    return axios.post(STUDENT_DELETE_API,student)
}

function searchStudent(keyword,pageNum,pageSize){
    return axios.get(STUDENT_SEARCH_API,{
        params:{
            "keyword":keyword,
            "page-num":pageNum,
            "page-size":pageSize
        }
    })
}

function exportStudent(){
    return axios.get(STUDENT_EXPORT_API,{
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        responseType: 'blob'
      })
}

function importTemplate(){
    return axios.get(STUDENT_TEMPLATE_API,{
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        responseType: 'blob'
      })
}

export{getAllStudents,getCurrentPageStudent,saveStudent,updateStudent,deleteStudent,
    searchStudent,exportStudent,importTemplate,
    getUserProfile,uploadAvatar,updateUserProfile,updateUserPwd,
    getMyWork}