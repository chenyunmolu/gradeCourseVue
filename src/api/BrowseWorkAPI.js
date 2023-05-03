import axios from "../http/index.js";

const STUDENT_CURRENTPAGEBYCLASSID="/api/gradeCourse/teachers/getCurrentStudentByClassid"

function getCurrentStudentByClassid(pageNum,pageSize,classid,workid){
    return axios.get(STUDENT_CURRENTPAGEBYCLASSID,{
        params:{
            "page-num":pageNum,
            "page-size":pageSize,
            "classid":classid,
            "workid":workid
        }
    })
}

function getAllStudentsByClassid(classid,workid){
    return axios.get(STUDENT_CURRENTPAGEBYCLASSID,{
        params:{
            "page-num":1,
            "page-size":100,
            "classid":classid,
            "workid":workid
        }
    })
}


export{
    getCurrentStudentByClassid,getAllStudentsByClassid
}