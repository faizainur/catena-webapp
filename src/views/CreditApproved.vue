<template>
  <table class="table is-fullwidth no-border mb-5">
    <thead class="thead-custom">
      <tr>
        <th
          class="has-text-weight-light has-text-grey is-size-7 start-thead-item"
        >
          APPLICATION ID
        </th>
        <th class="has-text-weight-light is-size-7 has-text-grey thead-item">
          CREDIT TYPE
        </th>
        <th class="has-text-weight-light is-size-7 has-text-grey thead-item">
          BANK NAME
        </th>
        <th class="has-text-weight-light is-size-7 has-text-grey thead-item">
          AMOUNT
        </th>
        <th
          class="has-text-weight-light is-size-7 has-text-grey end-thead-item"
        >
          STATUS
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="has-text-grey tbody-item" v-for="item in list" :key="item">
        <td>
          <!-- <router-link to="/?id={{item.record_id}}"
              >{{ item.record_id }}
            </router-link>V -->
          <a :href="item.link">{{ item.record_id }}</a>
        </td>
        <td>{{ item.credit_type }}</td>
        <td>{{ item.bank_name }}</td>
        <td>Rp. {{ item.amount }}</td>
        <td>
          {{ item.status.charAt(0).toUpperCase() + item.status.slice(1) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      list: [],
    };
  },
  async mounted() {
    this.list = [];
    var index = 0;
    console.log("mounted");
    // var userUid = "84ae14f9-a95c-432a-a188-f12f3b4d671c";
    var userUid = localStorage.getItem("user_uid");
    try {
      var response = await axios.get(
        "https://api.catena.id/v1/fabric/credit/search",
        {
          params: {
            user_uid: userUid,
          },
        }
      );

      response.data.forEach((element) => {
        // console.log(element);
        if (element.status === "approved") {
          console.log(element);
          console.log(index);
          this.list[index] = element;
        }
      });
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.thead-custom {
  background-color: whitesmoke;
  border: 0px;
}

.no-border {
  border: 0px;
  border-style: none;
}

.table th {
  border: 0px;
  padding: 1em;
}

.thead-item {
  border: 0px;
}

.tbody-item {
  font-size: 1em;
}

.end-thead-item {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.start-thead-item {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
</style>
