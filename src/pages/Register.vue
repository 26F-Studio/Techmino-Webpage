<template>
  <q-page id="mainContainer" class="flex flex-center">
    <InterstellarTravel class="dimmed" :mino-base-amount="300" />

    <q-card v-if="showResult" class="q-pa-lg text-white fixed-center"
            style="background: radial-gradient(ellipse, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)">
      <q-card-section>
        <div class="column items-center">
          <q-icon v-bind:name="resultIcon" v-bind:class="resultColor" class="items-center" style="font-size: 6rem;"/>
          <div class="text-h4">{{ resultMessage }}</div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>

</template>

<script>
import InterstellarTravel from "components/InterstellarTravel";
import axios from 'axios'
import {QSpinnerCube} from "quasar";

export default {
  name: "Register",
  components: {
    InterstellarTravel
  },
  data: function () {
    return {
      showResult: false,
      resultIcon: "",
      resultColor: "",
      resultMessage: ""
    }
  },
  created: function () {
    this.$q.loading.show({
      spinner: QSpinnerCube,
      spinnerColor: 'yellow-14',
      spinnerSize: 140,
      message: `Try <b>validating</b> your account.<br/><span class="text-primary">Please stand by...</span>`
    })
    let tempID = this.$route.query.id;
    let tempCode = this.$route.query.code;
    console.log("tempID: " + tempID);
    console.log("tempCode: " + tempCode);

    this.timer = setTimeout(() => {
      this.$q.loading.hide();
      this.timer = void 0;
      axios.post('/tech/api/v1/user/register', {
          id: tempID,
          code: tempCode
      }).then((response) => {
        let data = response.data;
        console.log(response.data);
        this.showResult = true;
        if (data.type === "Success") {
          this.resultIcon = "check_circle";
          this.resultColor = "text-green";
          this.resultMessage = data.reason;
        } else {
          this.resultIcon = "dangerous";
          this.resultColor = "text-red";
          this.resultMessage = this.$t("notification.unknownError");
        }
      }).catch((error) => {
        let data = error.response.data;
        console.log(error.response);
        this.showResult = true;
        if (data.type === "Error") {
          this.resultIcon = "warning";
          this.resultColor = "text-amber";
          this.resultMessage = data.reason;
        } else {
          this.resultIcon = "dangerous";
          this.resultColor = "text-red";
          this.resultMessage = this.$t("notification.unknownError");
        }
      });
    }, 3000)
  },
  methods:{},
  beforeDestroy() {
    if (this.timer !== void 0) {
      clearTimeout(this.timer)
      this.$q.loading.hide()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
