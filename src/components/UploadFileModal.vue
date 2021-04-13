<template>
    <div class="modal" :class="{'is-active': active}">
        <div class="modal-background"></div>
        <div class="modal-content">
         <div class="box">
             <h1 class="is-size-5 has-text-weight-bold">Upload File</h1>
             <div class="upload-container my-3 p-2" :class="{'center-item': !fileSelected}">
                 <div class="file" v-show="!fileSelected">
                    <label class="file-label">
                        <input class="file-input" accept="image/*, application/pdf" type="file" name="resume" @change="onFileSelected">
                        <span class="file-cta">
                        <span class="file-icon">
                            <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">
                            Choose a file…
                        </span>
                        </span>
                    </label>
                </div>
                <Item v-show="fileSelected" :file="file" :progressValue="progressValue"/>
             </div>
             <div class="has-text-right">
                <button class="button is-link" @click="closeModal">Close</button>
             </div>
         </div>
        </div>
    </div>
</template>

<script>
import Item from './SelectedFileItem'
import axios from 'axios'
import FormData from 'form-data'
export default {
    components: {
        Item
    },
    data() {
        return {
            fileSelected: false,
            isOpened: false,

            file: File,
            returnObject: null,
            progressValue: 0,
            jwtToken: ''
        }
    },
    methods: {
        onFileSelected() {
            console.log('FIle selected')

            var files = event.target.files
            if (!files.length) {
               this.fileSelected = false 
                return;
            }
            this.fileSelected = true

            var file = files[0]
            // this.fileName = file.name
            console.log(file)
            this.file = file

            this.uploadFile()
        },
        closeModal() {
            this.fileSelected = false
            this.$emit('onClose', this.fileObj)
        },
        refreshToken() {
            return new Promise((resolve, reject) => {

                var email = localStorage.getItem('email')
                var userUid = localStorage.getItem('user_uid')

                console.log( email + userUid)

                const formData = new FormData()
                formData.append('user_uid', userUid)
                formData.append('email', email)

                axios.post('https://api.catena.id/v1/auth/refresh_token', formData, {headers: {'content-type': 'application/x-www-form-urlencoded'}, withCredentials: true})
                .then((response) => {
                    resolve(response.data.jwt_token)
                })
                .catch((err) => {
                    reject(err)
                })
            })
        },
        uploadFile() {
            this.refreshToken()
                .then((token) => this.jwtToken = token)
                .catch((error) => this.$router.push('/login'))
                
            var authToken = 'Bearer ' + this.jwtToken

            const formData = new FormData()
            formData.append('file', this.file)

            console.log(formData)
            console.log('Upload file')

            this.progressValue = null
            axios.post('https://api.catena.id/v1/ipfs/user/upload', formData, {headers: {'content-type': 'application/form-data', 'Authorization': authToken}, withCredentials: true})
                .then((response) => {
                    this.progressValue = 0
                    this.fileUploadStatus = 'File Uploaded'
                    this.fileCid = response.data.cid

                    this.fileObj = {
                        name: this.file.name,
                        cid: response.data.cid
                    }

                    console.log(response)
                    console.log(this.fileObj)
                })
                .catch((err) => {
                    this.progressValue = 0
                    this.fileUploadStatus = 'Failed'
                    this.fileName = 'Try to choose a different file'
                    console.log(err.response)
                })
            // console.log(file)
        },
    },
    props: {
        active: Boolean
    }
}
</script>

<style scoped>
.upload-container {
    display: grid;
    border: 1px;
    border-radius: 8px;
    border-color:  #e0e0e0;
    border-style: solid;
    min-height: 20em;
}

.upload-title {
    border-bottom: 1px;
    border-right: 0px;
    border-left: 0px;
    border-top: 0px;
    border-style: solid;
    border-color:  #e0e0e0;
}

.upload-container.center-item {
    place-items: center;
}
</style>