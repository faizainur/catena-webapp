<template>
    <h1 class="is-size-2">Dashboard</h1>
</template>

<script>
import axios from 'axios'
import FormData from 'form-data'

export default {
    data() {
        return {
            jwtToken: ''
        }
    },
    created() {
        this.refreshToken()
    },
    methods: {
        refreshToken() {
            var email = localStorage.getItem('email')
            var userUid = localStorage.getItem('user_uid')

            console.log( email + userUid)

            const formData = new FormData()
            formData.append('user_uid', userUid)
            formData.append('email', email)

            axios.post('https://api.catena.id/v1/auth/refresh_token', formData, {headers: {'content-type': 'application/x-www-form-urlencoded'}})
            .then((resposne) => {
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
                this.$router.push('/login')
            })
        }
    },
}
</script>