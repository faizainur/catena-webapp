<template>
    <h1 class="is-size-2">Dashboard</h1>
    <button class="button" @click="logout">Logout</button>
</template>

<script>
import axios from 'axios'
import FormData from 'form-data'
import jwt_decode from "jwt-decode";

export default {
    data() {
        return {
            jwtToken: ''
            // jwtToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVkZW50aWFsVHlwZSI6ImJhc2ljIiwiZXhwIjoxNjE4MDg0MTUyLCJpYXQiOjE2MTgwODM4NTIsImlzQWRtaW4iOmZhbHNlLCJpc3MiOiJDYW5ldGEgSURQIFNlcnZlciIsInN1YiI6ImZzLnJvZmlxQGdtYWlsLmNvbSIsInVzZXJVaWQiOiI4ZmJiMTNmYi1hZDc4LTQ3NDctOGJlYy1mN2QyYThkNzAyNWQifQ.G_X9Y2aIu4JYZysYW0l79HDyIBFs1GmohUvJqTRhSwh42Ngt1aD1IwKJ6AohNKxueSz-o0RFz6WS9Ub1khEMYNQjdWMSSD4nfzuOlb7pBVAuyoIvucjnPD6wYti-UwLZF2Puap87fNC9kdQKJ8xcuwerVFo9GuxIJ3-8tE0oClcsOdnqlaqlVSHHrWdQVe6XiOFPzmNSL0vZWuUvfetIMXgbT-MMdRNEXLbcmtHmy4JCwwzMow7es7TZWvVReeOIIxgDZTI_Y2x4qKM1Bkbzs-9UxNJy5O8w4Yuq8UN_slNe1AzaW0aLG4FMktWGVWu0SMJM-4oJ9cwEFYoNw8ac8A'
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

            axios.post('https://api.catena.id/v1/auth/refresh_token', formData, {headers: {'content-type': 'application/x-www-form-urlencoded'}, withCredentials: true})
            .then((response) => {
                this.jwtToken = response.data.jwt_token
                console.log(this.jwtToken)
            })
            .catch((err) => {
                console.log(err)
                this.$router.push('/login')
            })
        }, 
        logout() {
            var authToken = 'Bearer ' + this.jwtToken

            var decoded = jwt_decode(this.jwtToken)

            var date = new Date()
            var timeNowUnix = Math.floor(date.getTime() / 1000)

            // console.log(unixFormat)
            // console.log(this.jwtToken)
            // console.log(decoded)
            // console.log(decoded.exp)

            if (timeNowUnix > decoded.exp) {
                console.log('expired token')
                this.refreshToken()
            }

            axios.post('https://api.catena.id/v1/auth/logout',{}, {headers: {'Authorization': authToken}, withCredentials: true})
            .then((response) => {
                console.log("Logged out")
                this.$router.push('/login')
            })
            .catch((err) => {
                console.log(err.response)
            })
        }
    },
}
</script>