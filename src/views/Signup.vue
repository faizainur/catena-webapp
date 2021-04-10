<template>
  <div class="register">
    <section class="section">
      <div class="container">
        <div class="columns is-vcentered is-centered">
          <div class="column is-4">
            <p
              class="is-size-4 mt-6 mb-5 pb-4 has-text-centered has-text-weight-light"
            >
              Sign up to <span class="has-text-weight-medium">Catena</span>
            </p>
            <div id="checkEmailPassword" v-show="checkEmailPassword">
              <div class="notification p-3 mx-5 mb-3 is-danger is-light">
                <p style="font-size: smaller">Check your email and password</p>
              </div>
            </div>
            <div class="notification px-5 mx-5 pt-5">
              <form id="oauthLogin">
                <label class="label has-text-weight-light">Email address</label>
                <div class="field">
                  <div class="control my-2">
                    <input
                      class="input"
                      type="email"
                      name="email"
                     v-model="emailAddress"
                     @input="emailInputEventHandler"
                     :class="{'is-danger': emptyEmail}"
                      @keyup.enter="loginClick"
                    />
                    <p
                      class="help is-danger" v-show="emptyEmail"
                    >
                      This field is required
                    </p>
                  </div>
                </div>
                <label class="label has-text-weight-light">Password</label>
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="password"
                      name="password"
                      v-model="password"
                      @input="passwordInputEventHandler"
                     :class="{'is-danger': emptyPassword}"
                      @keyup.enter="loginClick"
                    />
                    <p
                      class="help is-danger" v-show="emptyPassword"
                    >
                      {{ passwordErrorMessage }}
                    </p>
                  </div>
                </div>
                <label class="label has-text-weight-light">Confirm Password</label>
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="password"
                      name="password"
                      v-model="confirmPassword"
                      @input="confirmPasswordInputEventHandler"
                     :class="{'is-danger': errorConfirmPassword}"
                      @keyup.enter="loginClick"
                    />
                    <p
                      class="help is-danger" v-show="errorConfirmPassword"
                    >
                      {{ confirmPasswordErrorMessage }}
                    </p>
                  </div>
                </div>
              </form>
                <div class="field mt-5 pt-3 mb-2">
                  <div class="control">
                    <button
                      class="button is-link is-fullwidth"
                      :class="{'is-loading': loginLoadingState}"
                      @click="loginClick"
                    >Sign up</button>
                  </div>
                </div>
            </div>
            <div class="notification is-white pt-0 px-5" style="border: 2px">
              <a
                class="button is-fullwidth is-medium"
                href="/login"
                style="color: #3273dc; cursor: pointer; text-decoration: none"
                ><span class="is-size-6">Already have an account? Log in</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import FormData from 'form-data'
export default {
  name: 'Home',
  data() {
    return {
      emptyPassword: false,
      emptyEmail: false,
      checkEmailPassword: false,
      loginLoadingState: false,
      errorConfirmPassword: false,

      emailAddress: '',
      password: '',
      confirmPassword: '',
      confirmPasswordErrorMessage: '',
      passwordErrorMessage: ''

    }
  },
  methods: {
    loginClick () {
      if (this.emailAddress === '' || this.password === '') {
        this.checkEmailPassword = true
      } else if (this.password !== this.confirmPassword) {
        this.errorConfirmPassword = true

        this.confirmPasswordErrorMessage = 'Password must be the same'
      } else {
        const formData = new FormData();
        formData.append('email', this.emailAddress)
        formData.append('password', this.password)
        console.log(formData.get('email'))

        this.loginLoadingState = true
        axios.post('https://api.catena.id/v1/auth/register', formData, {headers: {'content-type': 'application/x-www-form-urlencoded'}})
        .then((response) => {
          this.loginLoadingState = false
          // console.log(response.data)
          window.location = '/signup_completed'
        })
        .catch((err) => {
          this.loginLoadingState = false
          this.checkEmailPassword = true
          console.log(err)
        })
         
      }
    },
    passwordInputEventHandler() {
      if (this.password === '') {
        this.emptyPassword = true
        this.passwordErrorMessage = 'This field is required'
      } else {
        this.emptyPassword = false
      }
    }, 
    confirmPasswordInputEventHandler() {
      if (this.confirmPassword === '') {
        this.errorConfirmPassword = true
        this.confirmPasswordErrorMessage = 'This field is required'
      } else {
        this.errorConfirmPassword = false
      }
    }, 
    emailInputEventHandler() {
      if (this.emailAddress === '') {
        this.emptyEmail = true
      } else {
        this.emptyEmail = false
      }
    }
  },
}
</script>

<style>
html, body {
  height: 100vh;
}
</style>

<style scoped>
.login {
  /* display: grid;
  place-items: center; */
  height: 100vh;
}
</style>
