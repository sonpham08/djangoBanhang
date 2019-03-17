export const getTeacherByFragment = (data) => {
    var newData=data.teacher[0];
    var result={
        id: newData.id,
        username: newData.name,
        fullname: newData.fullname,
        user_field: newData.user_field,
    }
    return result;
}

export const getSubjectByFragment = (data) => {
    var newData=data.teacher[0].student_register[0];
    var result={
        id: newData.id,
        name: newData.name,
        register_at: newData.register_at
    }
    return result;
}

export const getStudentByFragment = (data) => {
    var newData= data.teacher[0].student_register[0].choose_by[0];
    var result= {
        id: newData.id,
        username: newData.username,
        fullname: newData.fullname,
        email: newData.email,
        mssv: newData.mssv,
        grade: newData.grade,
        status: newData.status,
        user_field:newData.user_field,
        deadline_at: newData.deadline_at
    }
    return result;
}

export const compareDateTime = (register, deadline) => {
    console.log(typeof(register));
    console.log(typeof(deadline));
    if(register>deadline){
        console.log(0);
    }else{
        if(register<deadline){
            console.log(1);
        }
    }
}

export const makeNewListTeacher = (list) => {
    var newList= Object.assign([], list.data.teachers)
    var i=0;
    var newListChangeObject= newList.map(l => {
        if(l.user_field === 'Công nghệ phần mềm'){
            i = 3
        }else{
            if(l.user_field === 'Mạng máy tính'){
                i = 2
            }else{
                if(l.user_field === 'Hệ thống thông tin'){
                    i = 1
                }else{
                    if(l.user_field === 'Thương mại điện tử'){
                        i=4
                    }
                }
            }
        }
        return {
            id:l.id,
            username: l.username,
            index: i
        }
    })
    return newListChangeObject;
}