// import { createContext, useContext, useState } from 'react'; 
 
// const AuthContext = createContext(); 
 
// export function AuthProvider({ children }) { 
//   const [user, setUser] = useState(null); 
 
//   // it's related to token for login and logout 
//   const login = (token) => { 
//     localStorage.setItem('token', token); 
//     setUser({ token }); 
//   }; 
 
//   const logout = () => { 
//     localStorage.removeItem('token'); 
//     setUser(null); 
//   }; 
 
//   return ( 
//     <AuthContext.Provider value={{ user, login, logout }}> 
//       {children} 
//     </AuthContext.Provider> 
//   ); 
// } 
// // usecontext use for that making centerlaized means global
// export const useAuth = () => useContext(AuthContext);