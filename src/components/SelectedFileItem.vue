<template>
<div class="mt-1 mx-1">
    <progress class="progress is-xsmall is-link pb-0" max="100" :value="progressValue"></progress>
    <div class="item-container columns m-0">
        <div class="column is-2 grid center-item">
            <i class="fas fa-file" style="font-size: 2.5em; color: gray"></i>
        </div>
        <div class="column flex-container">
            <label for="" class="block mb-0 filename has-text-weight-semibold">{{ file.name }}</label>
            <label for="" class="block mb-1 is-size-7">{{ file.size }}</label>
            <!-- <label for="" class="block mb-1 is-size-7 has-text-weight-light"><i>QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u</i></label> -->
        </div>
        <!-- <div class="column has-text-right pr-5 flex-container">
            <label for="" class="block mb-0 is-size-6">Size</label>
        </div> -->
    </div>
</div>
</template>

<script>
export default {
    props: {
        file: File,
        progressValue: Number,
    },
    data() {
        return {
            // progressValue: null
        }
    },
}
</script>

<style scoped>
.block {
    display: block;
}

.item-container {
    border: 0px;
    border-style: solid;
    /* border-radius: 10px; */
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    min-height: 30%;
    /* background-color: #d8e3e771; */
    background-color:  #e0e0e036;
}

.grid {
    display: grid;
}

.grid.center-item {
   place-items: center; 
}

.flex-container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.filename {
    font-size: 1em;
}

.progress.is-xsmall {
    height: 0.4em;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    margin: 0;
}
</style>