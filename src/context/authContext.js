import React, { createContext, useContext, useEffect, useState } from 'react';
const authContext = createContext();
export const CartProvider=({children})=>{
    const [cart, setCart] = useState(20);
    return (
        <authContext.Provider value={{cart}}>
            {children}
        </authContext.Provider>
    )
}
export const UserData = () => useContext(authContext);