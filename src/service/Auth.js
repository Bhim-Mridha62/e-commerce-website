import axios from "axios"

export const HandelSignUp=(data)=>{
    const res=axios.post('/api/auth/Sign-up',data)
    return res;
}
export const HandelverifyOTP=(data)=>{
    const res=axios.post('/api/auth/Sign-up',data)
    return res;
}