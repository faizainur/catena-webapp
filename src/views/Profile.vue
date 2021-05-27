<template>
    <h1 class="is-size-4 has-text-weight-semibold mb-2">Account Profile</h1>
    <div class="block mt-5">
        <div class="columns mb-0">
            <div class="column">
                <label for="" class="block mb-2">First Name</label>
                <input type="text" class="input " v-model="firstName">
            </div>
            <div class="column">
                <label for="" class="block mb-2">Last Name</label>
                <input type="text" class="input " v-model="lastName">
            </div>
        </div>
        <label for="" class="block mb-2">NIK</label>
        <input type="text" class="input mb-4" v-model="nik">
        <label for="" class="block mb-2">Birth Place</label>
        <input type="text" class="input mb-4" v-model="birthPlace">
        <label for="birthday" class="block mb-2">Birthday</label>
        <input type="date" id="birthday"  class="input mb-4" v-model="birthDay" @change="birthDayOnChange">
        <label for="" class="block mb-2">Address Line 1</label>
        <input type="text" class="input mb-4" v-model="addressLine1">
        <label for="" class="block mb-2">Address Line 2</label>
        <input type="text" class="input mb-4" v-model="addressLine2">
        <div class="columns mb-0">
            <div class="column">
                <label for="" class="block mb-2">City</label>
                <input type="text" class="input" v-model="city">
            </div>
            <div class="column">
                <label for="" class="block mb-2">Province</label>
                <input type="text" class="input" v-model="province">
            </div>
            <div class="column">
                <label for="" class="block mb-2">Postal Code</label>
                <input type="text" class="input" v-model="postalCode">
            </div>
        </div>
        <label for="" class="block mb-2">KTP</label>
        <div class="columns mb-0 ">
            <div class="column is-four-fifths">
                <input type="text" class="input" v-model="ktpFileNameInput">
            </div>
            <div class="column has-text-right">
                <button class="button" @click="showModalKTP">Browse File</button>
                <UploadModal :active="isUploadModalActiveKTP"  @onClose="onCloseModalKTP"/>
            </div>
        </div>
        <label for="" class="block mb-2">Business License</label>
        <div class="columns mb-0 ">
            <div class="column is-four-fifths">
                <input type="text" class="input" v-model="blFileNameInput">
            </div>
            <div class="column has-text-right">
                <button class="button" @click="showModalBL">Browse File</button>
                <UploadModal :active="isUploadModalActiveBL"  @onClose="onCloseModalBL"/>
            </div>
        </div>
        <div class="columns mt-5">
            <div class="column is-four-fifths"></div>
            <div class="column has-text-right mb-6">
                <button class="button is-link" @click="saveProfile">Save Profile</button>
            </div>
        </div>
    </div>
</template>

<script>
import UploadModal from '../components/UploadFileModal'
import { refreshToken } from '../utils/auth'
import axios from 'axios'
import fileDownload from 'js-file-download'

export default {
    components: {
        UploadModal
    },
    data() {
        return {
            isUploadModalActiveKTP: false,
            isUploadModalActiveBL: false,

            firstName: '',
            lastName: '',
            nik: '',
            birthPlace: '',
            birthDay: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            province: '',
            postalCode: '',

            ktpFileNameInput: '',
            ktpCIDInput: '',
            ktpSelectedFile: '',

            blFileNameInput: '',
            blCIDInput: '',
            blSelectedInput: '',
            
        }
    },
    methods: {
        showModalKTP() {
            this.isUploadModalActiveKTP = true
        },
        showModalBL() {
            this.isUploadModalActiveBL = true
        },
        onCloseModalKTP(e) {
            console.log(e)
            if (e !== null ) {
                this.ktpSelectedFile = e
                this.ktpFileNameInput = e.name
                this.ktpCIDInput = e.cid
            }
            this.isUploadModalActiveKTP = false
        },
        onCloseModalBL(e) {
            console.log(e)
            if (e !== null ) {
                this.blSelectedInput = e
                this.blFileNameInput = e.name
                this.blCIDInput = e.cid
            }
            this.isUploadModalActiveBL = false
        },
        birthDayOnChange(e) {
            console.log(this.birthDay)
        },
        saveProfile() {
            // var token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVkZW50aWFsVHlwZSI6ImJhc2ljIiwiZXhwIjoxNjIyMDk3MzI1LCJpYXQiOjE2MjIwOTY3MjUsImlzQWRtaW4iOmZhbHNlLCJpc3MiOiJDYW5ldGEgSURQIFNlcnZlciIsInN1YiI6ImZzLnJvZmlxQGdtYWlsLmNvbSIsInVzZXJVaWQiOiI4ZmJiMTNmYi1hZDc4LTQ3NDctOGJlYy1mN2QyYThkNzAyNWQifQ.P9HcHuPFsaJI4sqM4Jy2zu9H6sBhT7SaGvkSsEhgbLrdFJUftURf5ST9J6LCaK53hrE3KVUxDmu9fZ-ktJpSjveyDbv_WvBtOhg54ybjymUk0GTbfMs4mHXHmZV3E2IAberBUO6ESk-SydRica2vmdUrDFfJqkyzBcoNcGZo6W-NNsUvCGz3qIpFFP04wt3FiZOvqKIuO-ZyWtfxrpLAgoiOG5xF-g50piWKZrNXHaRUXmoG7ZgX4qNkUD7CjH3RHvF54z5NTlCD45QYoAd6h3gpcU2O2VBgO-bgIlWPgnO3vRQSwquT03WsV4aXnARsTA2mtRF2gQrdRqy7CHa6Mg'
            
            refreshToken().then((token) => {
                var authToken = 'Bearer ' + token

                // var userUid = '8fbb13fb-ad78-4747-8bec-f7d2a8d7025d' 
                var userUid = localStorage.getItem('user_uid')
                    
                // var data = {
                //     user_uid: userUid,
                //     first_name: this.firstName,
                //     last_name: this.lastName,
                //     address_line_1: this.addressLine1,
                //     address_line_2: this.addressLine2,
                //     city: this.city,
                //     province: this.province,
                //     postal_code: this.postalCode,
                //     ttl: this.birthPlace + ', ' + this.birthDay,
                //     nik: this.nik,
                //     id_card: this.ktpCIDInput,
                //     business_license: this.blCIDInput,
                // }

                const params = new URLSearchParams()
                params.append('user_uid', userUid)
                params.append('first_name', this.firstName)
                params.append('last_name', this.lastName)
                params.append('address_line_1', this.addressLine1)
                params.append('address_line_2', this.addressLine2)
                params.append('city', this.city)
                params.append('province', this.province)
                params.append('postal_code', this.postalCode)
                params.append('ttl', this.birthPlace + ', ' + this.birthDay)
                params.append('nik', this.nik)
                params.append('id_card', this.ktpCIDInput)
                params.append('business_license', this.blCIDInput)

                console.log(params)

               console.log("Saving profile")
               axios.post('https://api.catena.id/v1/fabric/users/register', params, 
               {
                    headers: {
                        'Authorization': authToken,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
               }).then((response) => {
                   console.log('Profile saved')
                   console.log(response.data)
               }).catch((error) => {
                   console.log('Failed saving profile')
                   console.log(error)
               })
            })
        }
    },
}
</script>

<style scoped>
.block {
    display: block;
}
</style>