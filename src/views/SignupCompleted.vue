<template>
    <div class="section">
        <div class="container box-custom">
            <div class="my-6 has-text-centered">
                <h2 class="is-size-3 has-text-weight-bold has-text-success">Thank you for registering!</h2>
                <p class="is-size-5 mt-4">Your account is ready</p>
                <p class="is-size-5">Use your account to login to dashboard</p>
                <button class="button mt-5" @click="continueLogin">Continue to Login</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Signup Completed',
    component: {
    },
    methods: {
        continueLogin() {
            window.location = '/login'
        }
    },
}
</script>

<style scoped>
.box-custom {
    border: 1px;
    border-style: solid;
    border-color: #e0e0e0;
    border-radius: 10px;
    width: 40%;
}
</style>