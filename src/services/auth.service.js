import API_URL from './config.js'

export const AuthService = {
    async login(user) { // payload = user (username + password)
        const response = await fetch(`${API_URL}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password
            })
        });
        if (response.ok) {
            const data = await response.json();
            // console.log("LOGIN SERVICE OK")
            // console.log(data)
            if (data.accessToken)
                localStorage.setItem('user', JSON.stringify(data));
            return data;
        } else {
            throw Error(handleResponses(response.status));
        }
    },

    async logout() {
        localStorage.removeItem('user');
    },

    async register(user) {
        console.log(user)
        const response = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                // username: user.name,
                // email: user.email,
                // password: user.password
                nome: user.nome,
                email: user.email,
                password:  user.password,
                id_tipo_user: user.selected,
                cv: user.cv,
                foto: user.img
            })
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log(Error)
            throw Error(handleResponses(response.status));
        }
    }
}


function handleResponses(code) {
    let message = "";
    switch (code) {
        case 400:
            message = "Username already exists.";
            break;
        case 401:
            message = "Wrong credentials";
            break;
        case 404:
            message = "User not found";
            break;
        default:
            message = "Unkown message";
            break;
    }
    return message;
}

export default AuthService;