export const BASE_URL = 'https://mesto.owlsu.space/api';
export const register = (email, password) => {
    return fetch (`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then ((response) => {
            try {
                if (response.status === 201) {
                    return response.json ();
                }
            } catch (e) {
                return (e)
            }
        })
        .then ((res) => {
            return res;
        })
        .catch ((err) => console.log(err));
}

export const authorize = (email, password) => {
    return fetch (`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then ((response) => {
            if (response.status === 200) {
                return response.json ();
            }
        })
        .then ((data) => {
            console.log(data.token);
            localStorage.setItem ('token', data.token);
            return data;
        })
        .catch ((err) => console.log(err));
}

export const getContent = (token) => {
    return fetch (`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then ((response) => {
            if (response.status === 200) {
                return response.json ();
            }
        })
        .catch ((err) => console.log(err));
}