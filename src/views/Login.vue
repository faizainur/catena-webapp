<template>
  <div class="login">
    <section class="section">
      <div class="container">
        <div class="columns is-vcentered is-centered">
          <div class="column is-4">
            <p
              class="is-size-4 mt-6 mb-5 pb-4 has-text-centered has-text-weight-light"
            >
              Login to <span class="has-text-weight-medium">Catena</span>
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
                      This field is required
                    </p>
                  </div>
                </div>
                <p class="has-text-right">
                  <a
                    href=""
                    class="is-size-7"
                    style="
                      color: #3273dc;
                      cursor: pointer;
                      text-decoration: none;
                    "
                    >Forgot password?</a
                  >
                </p>
              </form>
                <div class="field mt-5 pt-3 mb-2">
                  <div class="control">
                    <button
                      class="button is-link is-fullwidth"
                      :class="{'is-loading': loginLoadingState}"
                      @click="loginClick"
                    >Login</button>
                  </div>
                </div>
            </div>
            <div class="notification is-white pt-0 px-5" style="border: 2px">
              <a
                class="button is-fullwidth is-medium"
                href="/signup"
                style="color: #3273dc; cursor: pointer; text-decoration: none"
                ><span class="is-size-6">Create an account</span></a
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

      emailAddress: '',
      password: '',
    }
  },
  methods: {
    loginClick () {
      if (this.emailAddress === '' || this.password === '') {
        this.checkEmailPassword = true
      } else {
        const formData = new FormData();
        formData.append('email', this.emailAddress)
        formData.append('password', this.password)
        // console.log(formData.get('email'))

        this.loginLoadingState = true
        axios.post('https://api.catena.id/v1/auth/login', formData, {headers: {'content-type': 'application/x-www-form-urlencoded'}})
        .then((response) => {
          this.loginLoadingState = false
          // console.log(response.data.jwt_token)
          // console.log(response.data.data.user_uid)
          localStorage.setItem('user_uid', response.data.data.user_uid)
          localStorage.setItem('email', response.data.data.email)
          localStorage.setItem('credential_type', response.data.data.credential_type)

          this.$router.push('/')
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
      } else {
        this.emptyPassword = false
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
