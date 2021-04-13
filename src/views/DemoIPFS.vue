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
                <button class="button is-link">Download File</button>
            </div>
        </div>
    </div>
</template>

<script>
import UploadModal from '../components/UploadFileModal'
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
            this.selectedFile = e
            this.fileNameInput = e.name
            this.CIDInput = e.cid
            this.isUploadModalActive = false
        }
    }
}
</script>

<style scoped>
.block {
    display: block;
}
</style>