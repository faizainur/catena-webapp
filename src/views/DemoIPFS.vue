<template>
    <h1 class="is-size-4 has-text-weight-semibold mb-2">Demo IPFS</h1>
    <div class="block mt-5">
        <label for="" class="block mb-2">Filename</label>
        <input type="text" class="input mb-4" v-model="fileNameInput">
        <label for="" class="block mb-2">CID</label>
        <input type="text" class="input mb-4" v-model="CIDInput">
        <div class="columns mt-6">
            <div class="column has-text-left">
                <button class="button" @click="showModal">Browse File</button>
                <UploadModal :active="isUploadModalActive"  @onClose="onCloseModal"/>
            </div>
            <div class="column has-text-right">
                <button class="button is-link" @click="downloadFile">Download File</button>
            </div>
        </div>
    </div>
</template>

<script>
import UploadModal from '../components/UploadFileModal'
import { refreshToken } from '../utils/auth'
import axios from 'axios'

export default {
    components: {
        UploadModal
    },
    data() {
        return {
            isUploadModalActive: false,
            fileNameInput: 'Hello',
            CIDInput: '2020',
            selectedFile: null
        }
    },
    methods: {
        showModal() {
            this.isUploadModalActive = true
        },
        onCloseModal(e) {
            console.log(e)
            if (e !== null ) {
                this.selectedFile = e
                this.fileNameInput = e.name
                this.CIDInput = e.cid
            }
            this.isUploadModalActive = false
        },
        downloadFile() {
            refreshToken().then((data) => {
                var authToken = 'Bearer ' + token
                console.log(token)
                console.log(authToken)
                const formData = new FormData()
                formData.append('file', this.file)

                console.log(formData)
                console.log('Upload file')

                console.log('Downloading data')
                axios.get('https://api.catena.id/v1/ipfs/user/fetch', {
                    params: {
                        cid: this.CIDInput
                    },
                    headers: {
                        'Authorization': authToken
                    },
                    withCredentials: true
                }).then((response) => {
                    console.log("Data Downloaded")
                    console.log(response)

                }).catch((err) => {
                    console.log("Failed downloading data")
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
.block {
    display: block;
}
</style>