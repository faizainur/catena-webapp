<template>
    <div class="container main-box" v-show="isDashboard">
      <!-- <h1 class="is-size-2">App View</h1> -->
      <div class="columns my-0 mx-0" style="height: 100vh">
        <div class="column is-2 px-5">
          <h1 class="is-size-4 has-text-weight-bold">Catena</h1>
          <aside class="menu mt-5 px-0">
            <p class="menu-label">General</p>
            <ul class="menu-list">
              <!-- <li><a class="is-active">Dashboard</a></li> -->
              <li><router-link to="/" :class="{'is-active': activeMenu ===''}">Dashboard</router-link></li>
              <li><router-link to="/profile" :class="{'is-active': activeMenu === 'profile'}">Profile</router-link></li>
            </ul>
            <p class="menu-label">Credit</p>
            <ul class="menu-list">
              <li><a>Applied</a></li>
              <li><a>Pending</a></li>
            </ul>
            <p class="menu-label">Account</p>
            <ul class="menu-list">
              <li><a href="">Authorized Access</a></li>
            </ul>
          </aside>
          <div class="footer-box my-4">
            <!-- <strong>Copyright 2021</strong><br> -->
            <span class="is-size-6 has-text-weight-bold">By Faiz Ainur Rofiq</span>
          </div>
          
        </div>
        <div class="column is-10">
          <!-- <h1>World</h1> -->
          <div class="columns mb-0">
            <div class="column is-10">
              <nav class="breadcrumb  py-2">
                <ul>
                  <li><router-link to="/" >Dashboard</router-link></li>
                  <li v-show="activeMenu !== ''"><router-link :to="'/' + activeMenu">{{ activeMenu }}</router-link></li>
                </ul>
              </nav>
                <!-- <h1 class="is-size-4 has-text-weight-bold">Right</h1> -->
            </div>
            <div class="column is-2">
              <button class="button">Logout</button>
            </div>
          </div>
          <div class="mt-0 pt-0">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
    <div v-show="!isDashboard">
      <router-view></router-view>
    </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      isDashboard: false, // default value

      activeMenu: ''
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        if (to.path !== '/login' || to.path !== '/signup' || to.path !== '/signup_completed') {
            this.isDashboard =true  
            this.activeMenu = to.path.substr(1)
        }
        document.title = to.meta.title || 'Catena : Decentralized KYC'
      }
    }
  }
}
</script>

<style>
html, body {
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
}

</style>