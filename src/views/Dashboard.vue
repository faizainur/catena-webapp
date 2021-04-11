<template>
    <h1 class="is-size-4 has-text-weight-semibold">Dashboard</h1>
    <div class="file mt-5">
        <label class="file-label">
            <input class="file-input" type="file" name="file" @change="uploadFile">
            <span class="file-cta">
                <span class="file-label">
                    Choose a file
                </span>
            </span>
        </label>
    </div>
</template>

<script>
import axios from 'axios'
import FormData from 'form-data'
import jwt_decode from "jwt-decode";

export default {
    props: {
        title: String,
    },
    data() {
        return {
            // jwtToken: '',
            jwtToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVkZW50aWFsVHlwZSI6ImJhc2ljIiwiZXhwIjoxNjE4MDg0MTUyLCJpYXQiOjE2MTgwODM4NTIsImlzQWRtaW4iOmZhbHNlLCJpc3MiOiJDYW5ldGEgSURQIFNlcnZlciIsInN1YiI6ImZzLnJvZmlxQGdtYWlsLmNvbSIsInVzZXJVaWQiOiI4ZmJiMTNmYi1hZDc4LTQ3NDctOGJlYy1mN2QyYThkNzAyNWQifQ.G_X9Y2aIu4JYZysYW0l79HDyIBFs1GmohUvJqTRhSwh42Ngt1aD1IwKJ6AohNKxueSz-o0RFz6WS9Ub1khEMYNQjdWMSSD4nfzuOlb7pBVAuyoIvucjnPD6wYti-UwLZF2Puap87fNC9kdQKJ8xcuwerVFo9GuxIJ3-8tE0oClcsOdnqlaqlVSHHrWdQVe6XiOFPzmNSL0vZWuUvfetIMXgbT-MMdRNEXLbcmtHmy4JCwwzMow7es7TZWvVReeOIIxgDZTI_Y2x4qKM1Bkbzs-9UxNJy5O8w4Yuq8UN_slNe1AzaW0aLG4FMktWGVWu0SMJM-4oJ9cwEFYoNw8ac8A',
            fileName: 'Please choose a file',
            fileCid: ''
        }
    },
    created() {
        // this.refreshToken()
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
        uploadFile(event) {
            var files = event.target.files
            if (!files.length){
                return;
            }

            var file = files[0]

            if (!this.isJwtValid(this.jwtToken)) {
                console.log('Generating token')
                this.refreshToken
            }

            var authToken = 'Bearer ' + this.jwtToken

            const formData = new FormData()
            formData.append('file', file)

            console.log(formData)
            console.log('Upload file')
            axios.post('https://api.catena.id/v1/ipfs/user/upload', formData, {headers: {'content-type': 'application/form-data', 'Authorization': authToken}, withCredentials: true})
                .then((response) => {
                    console.log(response)
                })
                .catch((err) => {
                    console.log(err.response)
                })
            // console.log(file)
        },
        isJwtValid(token) {
            var decoded = jwt_decode(token)
            var date = new Date()
            var timeNowUnix = Math.floor(date.getTime() / 1000)

            if (timeNowUnix > decoded.exp) {
                return false 
            }

            return true
        }
    },
}
</script>