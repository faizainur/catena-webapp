<template>
  <div class="container is-max-widescreen  main-box" v-if="isDashboard">
    <div class="columns my-0 mx-0" style="height: 100vh">
      <div class="column is-3 px-5">
        <!-- <h1 class="is-size-4 has-text-weight-bold">Catena</h1> -->
        <h1 class="is-size-4 has-text-weight-bold">Catena</h1>
        <aside class="menu mt-5 px-0 sidebar pr-2">
          <p class="menu-label">General</p>
          <ul class="menu-list">
            <!-- <li><a class="is-active">Dashboard</a></li> -->
            <li>
              <router-link to="/" :class="{ 'is-active': activeMenu === '' }"
                >Home</router-link
              >
            </li>
            <!-- <li><router-link to="/demo-ipfs" :class="{'is-active': activeMenu === 'demo-ipfs'}">Demo IPFS</router-link></li> -->
          </ul>
          <p class="menu-label">Account</p>
          <ul class="menu-list">
            <li>
              <router-link
                to="/profile"
                :class="{ 'is-active': activeMenu === 'profile' }"
                >Account Profile</router-link
              >
            </li>
            <!-- <li>
              <router-link
                to="/authorized"
                :class="{ 'is-active': activeMenu === 'authorized' }"
                >Authorized Access</router-link
              >
            </li> -->
            <!-- <li><a href="">Authorized Access</a></li> -->
          </ul>
          <p class="menu-label">Credit</p>
          <ul class="menu-list">
            <li>
              <router-link
                to="/pending"
                :class="{ 'is-active': activeMenu === 'pending' }"
                >Pending</router-link
              >
            </li>
            <li>
              <router-link
                to="/approved"
                :class="{ 'is-active': activeMenu === 'approved' }"
                >Approved</router-link
              >
            </li>
            <li>
              <router-link
                to="/rejected"
                :class="{ 'is-active': activeMenu === 'rejected' }"
                >Rejected</router-link
              >
            </li>
          </ul>
        </aside>
        <div class="footer-box my-4">
          <!-- <strong>Copyright 2021</strong><br> -->
          <!-- <span class="is-size-6 has-text-weight-bold">By Faiz Ainur Rofiq</span> -->
        </div>
      </div>
      <div class="column is-8">
        <!-- <h1>World</h1> -->
        <div class="columns mb-0">
          <div class="column is-10">
            <!-- <nav class="breadcrumb  py-2">
                <ul>
                  <li><router-link to="/" >Dashboard</router-link></li>
                  <li v-show="activeMenu !== ''"><router-link :to="'/' + activeMenu">{{ activeMenu }}</router-link></li>
                </ul>
              </nav> -->
            <!-- <h1 class="is-size-4 has-text-weight-bold">Right</h1> -->
          </div>
          <div class="column is-2 has-text-right">
            <button
              @click="logout"
              class="button"
              :class="{ 'is-loading': isLoadingLogoutProcess }"
            >
              Logout
            </button>
          </div>
        </div>
        <div class="mt-0 pt-0">
          <!-- <nav class="breadcrumb mb-0 is-small">
                <ul>
                  <li><router-link to="/" >Home</router-link></li>
                  <li v-show="activeMenu !== ''"><router-link :to="'/' + activeMenu">{{ activeMenu }}</router-link></li>
                </ul>
              </nav> -->
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <router-view></router-view>
  </div>
</template>
<script>
import axios from "axios";
import FormData from "form-data";
import jwt_decode from "jwt-decode";
import { refreshToken } from "../utils/auth";

export default {
  name: "App",
  data() {
    return {
      // jwtToken: '',
      jwtToken:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVkZW50aWFsVHlwZSI6ImJhc2ljIiwiZXhwIjoxNjE4MDg0MTUyLCJpYXQiOjE2MTgwODM4NTIsImlzQWRtaW4iOmZhbHNlLCJpc3MiOiJDYW5ldGEgSURQIFNlcnZlciIsInN1YiI6ImZzLnJvZmlxQGdtYWlsLmNvbSIsInVzZXJVaWQiOiI4ZmJiMTNmYi1hZDc4LTQ3NDctOGJlYy1mN2QyYThkNzAyNWQifQ.G_X9Y2aIu4JYZysYW0l79HDyIBFs1GmohUvJqTRhSwh42Ngt1aD1IwKJ6AohNKxueSz-o0RFz6WS9Ub1khEMYNQjdWMSSD4nfzuOlb7pBVAuyoIvucjnPD6wYti-UwLZF2Puap87fNC9kdQKJ8xcuwerVFo9GuxIJ3-8tE0oClcsOdnqlaqlVSHHrWdQVe6XiOFPzmNSL0vZWuUvfetIMXgbT-MMdRNEXLbcmtHmy4JCwwzMow7es7TZWvVReeOIIxgDZTI_Y2x4qKM1Bkbzs-9UxNJy5O8w4Yuq8UN_slNe1AzaW0aLG4FMktWGVWu0SMJM-4oJ9cwEFYoNw8ac8A",

      isDashboard: false, // default value

      activeMenu: "",
      isLoadingLogoutProcess: false,
      isCreated: false,
    };
  },
  methods: {
    refreshToken() {
      var email = localStorage.getItem("email");
      var userUid = localStorage.getItem("user_uid");

      const formData = new FormData();
      formData.append("user_uid", userUid);
      formData.append("email", email);

      axios
        .post("https://api.catena.id/v1/auth/refresh_token", formData, {
          headers: { "content-type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        })
        .then((response) => {
          this.jwtToken = response.data.jwt_token;
          console.log(this.jwtToken);
        })
        .catch((err) => {
          console.log(err);
          this.$router.push("/login");
        });
    },
    logout() {
      this.isLoadingLogoutProcess = true;
      refreshToken()
        .then((token) => {
          var authToken = "Bearer " + token;

          axios
            .post("https://api.catena.id/v1/auth/logout", null, {
              headers: {
                "content-type": "application/x-www-form-urlencoded",
                Authorization: authToken,
              },
              withCredentials: true,
            })
            .then((response) => {
              this.isLoadingLogoutProcess = false;
              console.log("Logged out");
              localStorage.clear();
              this.$router.push("/login");
            })
            .catch((err) => {
              console.log(err.response);
              this.isLoadingLogoutProcess = false;
            });
        })
        .catch((error) => {
          this.isLoadingLogoutProcess = false;
          console.log(error);
          localStorage.clear();
          this.$router.push("/login");
          // window.location = '/login'
        });
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        if (
          to.path !== "/login" &&
          to.path !== "/signup" &&
          to.path !== "/signup_completed"
        ) {
          this.isDashboard = true;
          this.activeMenu = to.path.substr(1);
        } else {
          this.isDashboard = false;
        }
        document.title = to.meta.title || "Catena : Decentralized KYC";
      },
    },
  },
};
</script>

<style>
html,
body {
  height: 100vh;
}

#app {
  height: 100vh;
}

.main-box {
  height: 100vh;
}

.footer-box {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.sidebar {
  border-right: 1px;
  border-right-width: 1px;
  border-right-color: #e0e0e0;
  border-left: 0px;
  border-top: 0px;
  border-bottom: 0px;
  border-style: solid;
  height: 90%;
  padding-bottom: 7em;
  /* background-color: aqua; */
  /* padding: 1e; */
}
</style>
