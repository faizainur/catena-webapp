<template>
    <div class="modal" :class="{'is-active': active}">
        <div class="modal-background"></div>
        <div class="modal-content">
         <div class="box">
             <h1 class="is-size-5 has-text-weight-bold">Upload File</h1>
             <div class="upload-container my-4 p-2" :class="{'center-item': !fileSelected}">
                 <div class="file">
                    <label class="file-label">
                        <input class="file-input" type="file" name="resume" @change="onFileSelected">
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
             </div>
             <div class="has-text-right">
                <button class="button is-link" @click="closeModal">Close</button>
             </div>
         </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fileSelected: false,
            isOpened: false,
        }
    },
    methods: {
        onFileSelected() {
            this.fileSelected = true
            console.log('FIle selected')
        },
        closeModal() {
            this.fileSelected = false
            this.$emit('onClose')
        }
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
    min-height: 15em;
}

.upload-container.center-item {
    place-items: center;
}
</style>