<template>
  <div class="row q-pa-sm">
    <div class="col-md-4 col-xs-12 q-pa-sm">
      <q-card flat dark class="">
        <q-card-section class="text-center">
          <q-img
            v-ripple
            class="cursor-pointer"
            :src="info.avatar"
            style="max-width:280px;border-radius:50%"/>
        </q-card-section>
        <q-card-section class="q-px-md">
          <div class="text-h5 q-pt-md text-weight-bold">
            {{ info.username }}
          </div>
          <div class="text-h6 text-grey text-weight-light">
            #{{ info.uid }}
          </div>
          <div class="text-subtitle1 q-pt-md text-weight-medium">
            {{ info.motto }}
          </div>
        </q-card-section>
        <q-card-section class="q-px-md" v-if="verified">
          <q-btn
            class="full-width"
            @click="editProfile=true">
            {{ $t("profile.editProfile") }}
          </q-btn>
        </q-card-section>
      </q-card>
    </div>
    <q-dialog
      v-if="verified"
      v-model="editProfile"
      persistent
      transition-show="slide-right"
      transition-hide="slide-up">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ $t("profile.editProfile") }}</div>
          <q-space/>
          <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>

        <q-card-section class="row items-center justify-around q-pa-md">
          <div class="col-12">
            <vueCropper
              ref="cropper"
              autoCrop
              fixed
              centerBox
              infoTrue
              :fixedNumber="[1,1]"
              :maxImgSize="1024"
              :img="cropper.img"
              :outputSize="cropper.size"
              :outputType="cropper.outputType"
              @realTime="realTime"
              @imgLoad="imgLoad"
              :style="cropper.style"/>
          </div>
          <div class="row col-4 justify-start q-pa-sm">
            {{ $t("cropper.preview") }}
          </div>
          <div class="row col-8 justify-end q-pa-sm">
            <q-btn-group>
              <q-btn
                class="q-mx-sm"
                color="primary"
                icon-right="zoom_in"
                @click="$refs.cropper.changeScale(1)"/>
              <q-btn
                class="q-mx-sm"
                color="primary"
                icon-right="zoom_out"
                @click="$refs.cropper.changeScale(-1)"/>
              <q-btn
                class="q-mx-sm"
                color="primary"
                icon-right="rotate_left"
                @click="$refs.cropper.rotateLeft()"/>
              <q-btn
                class="q-mx-sm"
                color="primary"
                icon-right="rotate_right"
                @click="$refs.cropper.rotateRight()"/>
            </q-btn-group>
          </div>

          <div class="gt-sm col-8 q-ma-md" :style="previewSizes[256]">
            <q-img :src="realTimeData.url" :style="realTimeData.img"/>
          </div>
          <div class="gt-xs col-4 q-ma-md" :style="previewSizes[128]">
            <q-img :src="realTimeData.url" :style="realTimeData.img"/>
          </div>
          <div class="col-2 q-ma-md" :style="previewSizes[64]">
            <q-img :src="realTimeData.url" :style="realTimeData.img"/>
          </div>
          <div class="col-1 q-ma-md" :style="previewSizes[32]">
            <q-img :src="realTimeData.url" :style="realTimeData.img"/>
          </div>
        </q-card-section>

        <q-card-section class="row justify-center q-px-md">
          <q-file
            ref="imageUploader"
            accept="image/jpg,image/jpeg,image/webp,image/png,image/bmp"
            bottom-slots
            clearable
            counter
            outlined
            :label="$t('cropper.uploadImage')"
            :counter-label="getCounterLabel"
            v-model="cropper.file"
            @input="updateImage">
            <template v-slot:prepend>
              <q-icon name="cloud_upload" @click.stop/>
            </template>
            <template v-slot:hint>
              {{ $t('cropper.fileHint') }}
            </template>
          </q-file>
        </q-card-section>
        <q-card-section class="row justify-end q-px-md">
          <q-btn
            color="primary"
            @click="uploadImage">
            {{ $t('cropper.setAvatar') }}
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<!--suppress ES6CheckImport -->
<script>
import axios from "axios";
import {VueCropper} from 'vue-cropper'

export default {
  name: "Profile",
  components: {
    VueCropper,
  },
  data() {
    return {
      info: {
        uid: this.$t("profile.fallback.uid"),
        username: this.$t("profile.fallback.username"),
        motto: this.$t("profile.fallback.motto"),
        avatar: this.$t("profile.fallback.avatar"),
      },
      verified: false,
      editProfile: false,
      cropper: {
        file: null,
        style: {
          height: "30vh",
          maxHeight: "800px",
        },
        img: null,
        size: 100,
        outputType: "png",
      },
      realTimeData: {},
      previewSizes: {
        256: {},
        128: {},
        64: {},
        32: {},
      },
    }
  },
  created() {
    this.cropper.img = this.info.avatar;
    window.onresize = () => {
      this.editProfile = false;
    };
  },
  mounted() {
    let uid = parseInt(this.$route.query.uid.toString());
    let authToken = this.$route.query.authToken;
    this.getProfileInfo(uid, authToken).then((body)=>{
      if (body.type === "Success") {
        this.getAvatar(uid).then((body)=>{
          if (body.type === "Success") {
            if (body.data) {
              this.info.avatar = body.data.avatar;
              this.$q.localStorage.set("avatar", body.data.avatar);
              this.$q.localStorage.set("avatarHash", body.data.hash);
            } else {
              this.info.avatar = this.$q.localStorage.getItem("avatar");
            }
          }
        }).catch((body)=>{
          console.log(body);
        });
        this.info.uid = body.data.uid;
        this.info.username = body.data.username;
        this.info.motto = body.data.motto;
        this.verified = body.data.verified;
      } else {
        this.$q.notify({
          color: 'red',
          textColor: 'white',
          icon: 'fas fa-bug',
          message: this.$t("notification.unknownError").toString()
        });
      }
    }).catch((body)=>{
      if (body.type === "Error") {
        this.$q.notify({
          color: 'amber',
          textColor: 'white',
          icon: 'warning',
          message: body.reason
        });
      } else {
        this.$q.notify({
          color: 'red',
          textColor: 'white',
          icon: 'fas fa-bug',
          message: this.$t("notification.unknownError").toString()
        });
      }
    });
  },
  methods: {
    getProfileInfo(uid, authToken) {
      return new Promise((resolve, reject) => {
        axios.post('/tech/api/v1/user/profile/info', {
          uid: uid,
          authToken: authToken,
        }).then((res) => {
          resolve(res.data);
        }).catch((err) => {
          reject(err.response.data);
        });
      });
    },
    getAvatar(uid) {
      return new Promise((resolve, reject) => {
        axios.post('/tech/api/v1/user/profile/avatar', {
          uid: uid,
          hash: this.$q.localStorage.getItem("avatarHash") || ""
        }).then((res) => {
          resolve(res.data);
        }).catch((err) => {
          reject(err.response.data);
        });
      });
    },
    getCounterLabel({totalSize}) {
      return this.$t("cropper.fileSize") + totalSize;
    },
    realTime(data) {
      this.realTimeData = data;
      for (let size in this.previewSizes) {
        this.previewSizes[size] = {
          width: this.realTimeData.w + "px",
          height: this.realTimeData.h + "px",
          overflow: "hidden",
          zoom: size / this.realTimeData.w > 1 ? 1 : size / this.realTimeData.w
        }
      }
    },
    imgLoad(msg) {
      if (msg !== "success") {
        this.$q.notify({
          color: 'amber',
          textColor: 'white',
          icon: 'warning',
          message: this.$t("cropper.uploadFailed").toString()
        });
      }
    },
    updateImage() {
      if (this.cropper.file === null) {
        this.cropper.img = this.info.avatar;
        return;
      }
      const reader = new FileReader();
      reader.onload = event => {
        let imageData;
        if (typeof event.target.result === "object") {
          imageData = window.URL.createObjectURL(new Blob([event.target.result]));
        } else {
          imageData = event.target.result;
        }
        this.cropper.img = imageData;
      };
      // reader.readAsDataURL(file)
      reader.readAsArrayBuffer(this.cropper.file);
    },
    uploadImage() {
      this.$refs.cropper.getCropData(croppedAvatar => {
        let uid = parseInt(this.$route.query.uid.toString());
        let authToken = this.$route.query.authToken;
        axios.put('/tech/api/v1/user/profile/avatar', {
          uid: uid,
          authToken: authToken,
          avatar: croppedAvatar
        }).then((response) => {
          let data = response.data;
          if (data.type === "Success") {
            this.$q.notify({
              color: 'green',
              textColor: 'white',
              icon: 'cloud_done',
              message: this.$t("notification.submitSuccess").toString()
            });
            this.info.avatar = croppedAvatar;
            this.cropper.img = croppedAvatar;
            this.$q.localStorage.set("avatar", croppedAvatar);
            this.$q.localStorage.set("avatarHash", data.data.hash);
            this.editProfile = false;
          } else {
            this.$q.notify({
              color: 'red',
              textColor: 'white',
              icon: 'fas fa-bug',
              message: this.$t("notification.unknownError").toString()
            });
          }
        }).catch((error) => {
          let data = error.response.data;
          if (data.type === "Error") {
            this.$q.notify({
              color: 'amber',
              textColor: 'white',
              icon: 'warning',
              message: data.reason
            });
          } else {
            this.$q.notify({
              color: 'red',
              textColor: 'white',
              icon: 'fas fa-bug',
              message: this.$t("notification.unknownError").toString()
            });
          }
        });
      });
    }
  },
  beforeDestroy() {
    window.onresize = () => {
    };
  }
}
</script>

<style scoped>

</style>
