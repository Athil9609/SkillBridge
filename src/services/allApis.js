import baseUrl from "./baseUrl";
import commonApi from "./commonApi";

export const login=async(data)=>{
    return await commonApi(`${baseUrl}/login`,'POST','',data)
}

export const addCategories=async(header,data)=>{
    return await commonApi(`${baseUrl}/addskillcategory`,'POST',header,data)
}

export const viewCategories=async(header)=>{
    return await commonApi(`${baseUrl}/viewskillcategory`,'GET',header,'')
}
export const deleteCategory=async(id)=>{
    return await commonApi(`${baseUrl}/deleteskillcategory/${id}`,'POST','',{})
}
export const editCategory=async(id,data)=>{
    return await commonApi(`${baseUrl}/editskillcategory/${id}`,'POST','',data)
}

export const userList=async()=>{
    return await commonApi(`${baseUrl}/userlist`,'GET','','')
}
export const skillListing=async()=>{
    return await commonApi(`${baseUrl}/skillListing`,'GET','','')
}
export const updateUserStatus = async (id, data) => {
    return await commonApi(`${baseUrl}/updateuserstatus/${id}`,'PUT','',data);
};

//user routes

export const userRegisteration=async(data,header)=>{
    return await commonApi(`${baseUrl}/userreg`,'POST',header,data)
}

export const userDetailsApi=async(header)=>{
    return await commonApi(`${baseUrl}/userdetails`,'GET',header,'')
}

export const updateUserDetails=async(header,data)=>{
    return await commonApi(`${baseUrl}/updateuserdetails`,'POST',header,data)
}

export const postSkillApi=async(header,data)=>{
    return await commonApi(`${baseUrl}/postSkill`,'POST',header,data)
}

export const viewMySkill=async(header)=>{
    return await commonApi(`${baseUrl}/viewMySkill`,'GET',header,'')
}
export const editMySkill=async(header,data)=>{
    return await commonApi(`${baseUrl}/editMySkill`,'POST',header,data)
}
export const deleteMySkill=async(id)=>{
    return await commonApi(`${baseUrl}/deleteMySkill/${id}`,'POST','',{})
}

export const viewSkills=async(id)=>{
    return await commonApi(`${baseUrl}/viewSkills/${id}`,'GET','','')
}

export const getUsersBySkill=async(skillname)=>{
    return await commonApi(`${baseUrl}/getUsersBySkill/${skillname}`,'GET','','')
}

export const getSpecificUserDetails=async(userId)=>{
    return await commonApi(`${baseUrl}/getSpecificUserDetails/${userId}`,'GET','','')
}
export const addRatingAndFeedback=async(data,header)=>{
    return await commonApi(`${baseUrl}/addRatingAndFeedback`,'POST',header,data)
}
export const updateRatingAndFeedback=async(data,header,id)=>{
    return await commonApi(`${baseUrl}/updateRatingAndFeedback/${id}`,'PUT',header,data)
}
export const deleteRatingAndFeedback=async(id,header)=>{
    return await commonApi(`${baseUrl}/deleteRatingAndFeedback/${id}`,'DELETE',header,{})
}
export const getMyRatings=async(header)=>{
    return await commonApi(`${baseUrl}/getMyRatings`,'GET',header,'')
}

export const addBooking=async(header,data)=>{
    return await commonApi(`${baseUrl}/addBooking`,'POST',header,data)
}

export const getMyBookings=async(header)=>{
    return await commonApi(`${baseUrl}/getMyBookings`,'GET',header,'')
}
export const getOthersBookings=async(header)=>{
    return await commonApi(`${baseUrl}/getOthersBookings`,'GET',header,'')
}
export const updateBookingStatus=async(header,data)=>{
    return await commonApi(`${baseUrl}/updateBookingStatus`,'PUT',header,data)
}
export const getSpecificBookingDetails=async(header,id)=>{
    return await commonApi(`${baseUrl}/getSpecificBookingDetails/${id}`,'GET',header,'')
}
export const addTransactionDetails=async(header,data)=>{
    return await commonApi(`${baseUrl}/addTransactionDetails`,'POST',header,data)
}
export const viewAllTransactions=async(header)=>{
    return await commonApi(`${baseUrl}/allTransactions`,'GET',header,'')
}
export const transactionHistory=async(header)=>{
    return await commonApi(`${baseUrl}/transactionHistory`,'GET',header,'')
}

export const addComplaintOrFeedback = async (header,data) => {
    return await commonApi(`${baseUrl}/addComplaintOrFeedback`, 'POST', header, data);
};

export const getComplaintsAndFeedback = async (header,data) => {
    return await commonApi(`${baseUrl}/getComplaintsAndFeedback`, 'POST', header, data);
};

export const addAdminResponse = async ( header,id, data) => {
    return await commonApi(`${baseUrl}/addAdminResponse/${id}`, 'POST', header, data);
};
export const purchaseTime = async(data,header) => {
    return await commonApi(`${baseUrl}/purchaseTime`, 'POST', header,data);
};
export const updateCurrency = async(data) => {
    return await commonApi(`${baseUrl}/updateCurrency`, 'POST',"",data);
};
