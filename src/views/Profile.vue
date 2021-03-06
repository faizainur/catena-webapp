<template>
  <h1 class="is-size-4 has-text-weight-semibold mb-2">Account Profile</h1>
  <div class="block mt-5">
    <div
      class="notification is-info is-light p-3"
      v-show="fetchingProfileLoadingState"
    >
      <p>Loading your profile...</p>
    </div>
    <div class="notification is-success is-light p-3" v-show="isProfileSaved">
      <p>Your profile is saved</p>
    </div>
    <div class="notification is-danger is-light p-3" v-show="isError">
      {{ errorMessage }}
    </div>
    <div class="columns mb-0">
      <div class="column">
        <label for="" class="block mb-2">First Name</label>
        <input type="text" class="input" v-model="firstName" />
      </div>
      <div class="column">
        <label for="" class="block mb-2">Last Name</label>
        <input type="text" class="input" v-model="lastName" />
      </div>
    </div>
    <label for="" class="block mb-2">NIK</label>
    <input type="text" class="input mb-4" v-model="nik" />
    <label for="" class="block mb-2">Birth Place</label>
    <input type="text" class="input mb-4" v-model="birthPlace" />
    <label for="birthday" class="block mb-2">Birthday</label>
    <input
      type="date"
      id="birthday"
      class="input mb-4"
      v-model="birthDay"
      @change="birthDayOnChange"
    />
    <label for="" class="block mb-2">Address Line 1</label>
    <input type="text" class="input mb-4" v-model="addressLine1" />
    <label for="" class="block mb-2">Address Line 2</label>
    <input type="text" class="input mb-4" v-model="addressLine2" />
    <div class="columns mb-0">
      <div class="column">
        <label for="" class="block mb-2">City</label>
        <input type="text" class="input" v-model="city" />
      </div>
      <div class="column">
        <label for="" class="block mb-2">Province</label>
        <input type="text" class="input" v-model="province" />
      </div>
      <div class="column">
        <label for="" class="block mb-2">Postal Code</label>
        <input type="text" class="input" v-model="postalCode" />
      </div>
    </div>
    <label for="" class="block mb-2">Phone Number</label>
    <input type="text" class="input mb-4" v-model="phoneNumber" />
    <label for="" class="block mb-2">KTP</label>
    <div class="columns mb-0">
      <div class="column is-four-fifths">
        <input
          type="text"
          class="input"
          v-model="ktpFileNameInput"
          @click="ktpFileOnClick"
          readonly
        />
      </div>
      <div class="column has-text-right">
        <button class="button" @click="showModalKTP">Browse File</button>
        <UploadModal
          :active="isUploadModalActiveKTP"
          @onClose="onCloseModalKTP"
        />
      </div>
    </div>
    <label for="" class="block mb-2">Business License</label>
    <div class="columns mb-0">
      <div class="column is-four-fifths">
        <input
          type="text"
          class="input"
          v-model="blFileNameInput"
          @click="blFileOnClick"
          readonly
        />
        <!-- <label for="" class="has-text-link">Select file</label> -->
      </div>
      <div class="column has-text-right">
        <button class="button" @click="showModalBL">Browse File</button>
        <UploadModal
          :active="isUploadModalActiveBL"
          @onClose="onCloseModalBL"
        />
      </div>
    </div>
    <div class="columns mt-5">
      <div class="column is-four-fifths"></div>
      <div class="column has-text-right mb-6">
        <button
          class="button is-link"
          @click="saveProfile"
          :class="{ 'is-loading': savingLoadingState }"
        >
          Save Profile
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import UploadModal from "../components/UploadFileModal";
import { refreshToken } from "../utils/auth";
import axios from "axios";
import fileDownload from "js-file-download";

export default {
  components: {
    UploadModal,
  },
  data() {
    return {
      isUploadModalActiveKTP: false,
      isUploadModalActiveBL: false,
      savingLoadingState: false,
      isProfileSaved: false,
      isError: false,
      fetchingProfileLoadingState: false,

      errorMessage: null,

      firstName: "",
      lastName: "",
      nik: "",
      birthPlace: "",
      birthDay: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      province: "",
      postalCode: "",
      phoneNumber: "",

      ktpFileNameInput: "",
      ktpCIDInput: "",
      ktpSelectedFile: "",

      blFileNameInput: "",
      blCIDInput: "",
      blSelectedInput: "",
    };
  },
  mounted() {
    if (localStorage.getItem("is_profile_exist") === "true") {
      this.fetchingProfileLoadingState = true;
      refreshToken().then((token) => {
        var authToken = "Bearer " + token;
        var userUid = localStorage.getItem("user_uid");
        axios
          .get("https://api.catena.id/v1/fabric/users/get", {
            params: {
              user_uid: userUid,
            },
            headers: {
              Authorization: authToken,
            },
          })
          .then((response) => {
            this.firstName = response.data.first_name;
            this.lastName = response.data.last_name;
            this.addressLine1 = response.data.address_line_1;
            this.addressLine2 = response.data.address_line_2;
            this.city = response.data.city;
            this.province = response.data.province;
            this.postalCode = response.data.postal_code;
            this.phoneNumber = response.data.phone_number;

            var ttl = response.data.ttl;
            var splittedTtl = ttl.split(", ");

            this.birthPlace = splittedTtl[0];
            this.birthDay = splittedTtl[1];

            this.nik = response.data.nik;

            var idCard = response.data.idcard;
            var splittedIdCard = idCard.split(".%.");

            this.ktpCIDInput = splittedIdCard[1];
            this.ktpFileNameInput = splittedIdCard[0];

            var businessLicense = response.data.business_license;
            var splittedBl = businessLicense.split(".%.");

            this.blCIDInput = splittedBl[1];
            this.blFileNameInput = splittedBl[0];

            this.fetchingProfileLoadingState = false;
          })
          .catch((error) => {
            this.fetchingProfileLoadingState = false;
            this.isError = true;
            this.errorMessage = error;
            console.log(error);
          });
      });
    } else {
      this.isError = true;
      this.errorMessage = "Please complete your profile";
    }
  },
  unmounted() {
    console.log("unmounted");
  },
  methods: {
    showModalKTP() {
      this.isUploadModalActiveKTP = true;
    },
    showModalBL() {
      this.isUploadModalActiveBL = true;
    },
    onCloseModalKTP(e) {
      console.log(e);
      if (e !== null) {
        this.ktpSelectedFile = e;
        this.ktpFileNameInput = e.name;
        this.ktpCIDInput = e.cid;
      }
      this.isUploadModalActiveKTP = false;
    },
    onCloseModalBL(e) {
      console.log(e);
      if (e !== null) {
        this.blSelectedInput = e;
        this.blFileNameInput = e.name;
        this.blCIDInput = e.cid;
      }
      this.isUploadModalActiveBL = false;
    },
    birthDayOnChange(e) {
      console.log(this.birthDay);
    },
    ktpFileOnClick() {
      if (this.ktpCIDInput !== "" && this.ktpFileNameInput !== "") {
        console.log("ktp text clicked");
        this.downloadFile(this.ktpCIDInput, this.ktpFileNameInput);
      }
    },
    blFileOnClick() {
      if (this.blCIDInput !== "" && this.blFileNameInput !== "") {
        console.log("text clicked");
        this.downloadFile(this.blCIDInput, this.blFileNameInput);
      }
    },
    saveProfile() {
      this.savingLoadingState = true;
      refreshToken()
        .then((token) => {
          var authToken = "Bearer " + token;
          var userUid = localStorage.getItem("user_uid");
          var email = localStorage.getItem("email");

          const params = new URLSearchParams();
          params.append("user_uid", userUid);
          params.append("email", email);
          params.append("first_name", this.firstName);
          params.append("last_name", this.lastName);
          params.append("address_line_1", this.addressLine1);
          params.append("address_line_2", this.addressLine2);
          params.append("phone_number", this.phoneNumber);
          params.append("city", this.city);
          params.append("province", this.province);
          params.append("postal_code", this.postalCode);
          params.append("ttl", this.birthPlace + ", " + this.birthDay);
          params.append("nik", this.nik);
          params.append(
            "id_card",
            this.ktpFileNameInput + ".%." + this.ktpCIDInput
          );
          params.append(
            "business_license",
            this.blFileNameInput + ".%." + this.blCIDInput
          );

          var url;
          if (localStorage.getItem("is_profile_exist") === "true") {
            url = "https://api.catena.id/v1/fabric/users/update";
          } else {
            url = "https://api.catena.id/v1/fabric/users/register";
          }

          console.log("Saving profile");
          axios
            .post(url, params, {
              headers: {
                Authorization: authToken,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            })
            .then((response) => {
              this.savingLoadingState = false;
              this.isProfileSaved = true;
              this.isError = false;
              localStorage.setItem("is_profile_exist", "true");
              console.log("Profile saved");
              console.log(response.data);
            })
            .catch((error) => {
              this.isError = true;
              this.errorMessage = error.name + " : " + error.message;
              this.savingLoadingState = false;
              console.log("Failed saving profile");
              console.log(error);
            });
        })
        .catch((error) => {
          this.isError = true;
          this.errorMessage = error.name + " : " + error.message;
          this.savingLoadingState = false;
          console.log(error);
        });
    },
    downloadFile(cid, fileName) {
      console.log(cid);
      console.log(fileName);
      refreshToken()
        .then((token) => {
          var authToken = "Bearer " + token;
          console.log(token);
          console.log(authToken);

          console.log("Downloading data");
          axios
            .get("https://api.catena.id/v1/ipfs/user/fetch", {
              params: {
                cid: cid,
              },
              headers: {
                Authorization: authToken,
              },
              withCredentials: true,
              responseType: "blob",
            })
            .then((response) => {
              console.log("Data Downloaded");
              console.log(response);
              fileDownload(response.data, fileName);
            })
            .catch((err) => {
              this.isError = true;
              this.errorMessage = "Failed downloading " + fileName;
              console.log(err);
              console.log(this.errorMessage);
            });
        })
        .catch((err) => {
          this.isError = true;
          this.errorMessage = err;
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.block {
  display: block;
}
</style>
