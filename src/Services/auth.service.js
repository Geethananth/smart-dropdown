export const isLoggedIn = ()=> {
    const auth = localStorage.getItem('auth_token');
    return auth !== ""
}

/**
 * Authenticate the user
 * @param {String} email 
 * @param {String} password 
 * @returns 
 */

export const authenticate = async (email, password)=> {
    if (!isNaN(password)) {
        const total = password.split("").reduce((total, el) =>  total + Math.floor(el), 0);
        return total === 10;
    }
    

}