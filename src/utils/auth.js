export const refreshToken = () => {
    return new Promise((resolve, reject) => {

        var email = localStorage.getItem('email')
        var userUid = localStorage.getItem('user_uid')

        console.log( email + userUid)

        const formData = new FormData()
        formData.append('user_uid', userUid)
        formData.append('email', email)

        axios.post('https://api.catena.id/v1/auth/refresh_token', formData, {headers: {'content-type': 'application/x-www-form-urlencoded'}, withCredentials: true})
        .then((response) => {
            console.log(response)
            resolve(response.data.jwt_token)
        })
        .catch((err) => {
            reject(err)
        })
    })
}