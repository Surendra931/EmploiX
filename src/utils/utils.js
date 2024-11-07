export const savetoLocalStorage=(key,value)=>{
    localStorage.setItem(key,value)
    
}

export const getFromLocalStorage=(key)=>{
    return localStorage.getItem(key)
}

export const removeFromLocalStorage=(key)=>{
    localStorage.removeItem(key)
}