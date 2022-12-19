class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    getToken() {
        return `Bearer ${localStorage.getItem('token')}`
    }

    getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: this.getToken(),
            }}
        )
            .then((res) =>
            this.getResponseData(res)
            )
    }

    getProfileInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: this.getToken(),
            }
        })
            .then((res) =>
                this.getResponseData(res)
            )
    }

    updateProfileInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: this.getToken(),
              },
            method: 'PATCH',
            body: JSON.stringify(data)
        })
            .then((res) =>
                this.getResponseData (res)
            )
    }

    createNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
            'Content-Type': 'application/json',
            authorization: this.getToken(),
          },
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then((res) =>
                this.getResponseData (res)
            )
    }

    deleteCard(data, cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: this.getToken(),
              },
            method: 'DELETE',
            body: JSON.stringify(data)
        })
            .then((res) =>
                this.getResponseData (res)
            )
    }

    updateProfileAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            headers: {
            'Content-Type': 'application/json',
            authorization: this.getToken(),
          },
            method: 'PATCH',
            body: JSON.stringify(data)
        })
            .then((res) =>
                this.getResponseData (res)
            )
    }

    likeCard(data, cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            headers: {
            'Content-Type': 'application/json',
            authorization: this.getToken(),
          },
            method: 'PUT',
            body: JSON.stringify(data)
        })
            .then((res) =>
                this.getResponseData (res)
            )
    }

    dislikeCard(data, cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            headers: {
            'Content-Type': 'application/json',
            authorization: this.getToken(),
          },
            method: 'DELETE',
            body: JSON.stringify(data)
        })
            .then((res) =>
                this.getResponseData (res)
            )
    }
}

const api = new Api({
    baseUrl: 'https://mesto.owlsu.space/api'
});

export default api;