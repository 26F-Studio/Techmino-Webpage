<template>
  <div class="row q-pa-sm">
    <div class="col-md-4 col-xs-12 q-pa-sm">
      <q-card flat dark class="">
        <q-card-section class="row justify-center">
          <q-responsive
            ref="avatarBox"
            class="col-6"
            :ratio="0.5">
            <q-btn
              round
              dense
              @click="expandAvatar=true"
              style="z-index: 0">
              <q-img :src="info.avatar" style="border-radius: 50%"/>
            </q-btn>
          </q-responsive>
          <div class="row col-12 absolute-top justify-center">
            <div class="row col-6 justify-end">
              <q-btn
                v-if="verified"
                icon="edit"
                color="primary"
                round
                push
                :size="editIconSize + 'px'"
                @click="editAvatar=true"
                :style="editIconStyle"/>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-px-md">
          <div v-if="!editProfile" class="text-h5 q-pt-md text-weight-bold">
            {{ info.username }}
          </div>
          <q-input
            v-if="editProfile"
            class="q-pt-md"
            clearable
            dense
            v-model="info.username"/>
          <div class="text-h6 text-grey text-weight-light">
            #{{ info.uid }}
          </div>
          <div v-if="!editProfile" class="text-subtitle1 q-pt-md text-weight-medium">
            {{ info.motto }}
          </div>
          <q-input
            v-if="editProfile"
            class="q-pt-md"
            clearable
            dense
            v-model="info.motto"/>
        </q-card-section>
        <q-card-section class="row q-px-md justify-between" v-if="verified">
          <q-btn
            v-if="!editProfile"
            class="col-12"
            :dense="$q.screen.lt.md"
            @click="editProfile=true">
            {{ $t("profile.editProfile") }}
          </q-btn>
          <q-btn
            v-if="editProfile"
            class="col-5 q-mx-sm"
            :dense="$q.screen.lt.md"
            @click="cancelProfile">
            {{ $t("profile.cancelEdit") }}
          </q-btn>
          <q-btn
            v-if="editProfile"
            class="col-5 q-mx-sm"
            color="primary"
            :dense="$q.screen.lt.md"
            :loading="infoLoading"
            @click="uploadProfile">
            {{ $t("profile.confirmEdit") }}
          </q-btn>
        </q-card-section>
      </q-card>
    </div>
    <q-dialog
      v-model="expandAvatar"
      transition-show="slide-down"
      transition-hide="slide-right">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ $t("profile.viewAvatar") }}</div>
          <q-space/>
          <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>

        <q-card-section class="row items-center justify-around q-pa-md">
          <q-img :src="info.avatar"/>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog
      v-if="verified"
      v-model="editAvatar"
      persistent
      transition-show="slide-right"
      transition-hide="slide-down">
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
                class="q-mx-md-sm q-ml-xs-xs"
                color="primary"
                icon-right="zoom_in"
                :dense="$q.screen.lt.md"
                @click="$refs.cropper.changeScale(1)"/>
              <q-btn
                class="q-mx-md-sm q-ml-xs-xs"
                color="primary"
                icon-right="zoom_out"
                :dense="$q.screen.lt.md"
                @click="$refs.cropper.changeScale(-1)"/>
              <q-btn
                class="q-mx-md-sm q-ml-xs-xs"
                color="primary"
                icon-right="rotate_left"
                :dense="$q.screen.lt.md"
                @click="$refs.cropper.rotateLeft()"/>
              <q-btn
                class="q-mx-md-sm q-ml-xs-xs"
                color="primary"
                icon-right="rotate_right"
                :dense="$q.screen.lt.md"
                @click="$refs.cropper.rotateRight()"/>
            </q-btn-group>
          </div>

          <div class="gt-sm col-8 q-ma-sm" :style="previewSizes[256]">
            <q-img :src="realTimeData.url" :style="realTimeData.img"/>
          </div>
          <div class="gt-xs col-4 q-ma-sm" :style="previewSizes[128]">
            <q-img :src="realTimeData.url" :style="realTimeData.img"/>
          </div>
          <div class="col-2 q-ma-sm" :style="previewSizes[64]">
            <q-img :src="realTimeData.url" :style="realTimeData.img"/>
          </div>
          <div class="col-1 q-ma-sm" :style="previewSizes[32]">
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
            :dense="$q.screen.lt.md"
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
            :dense="$q.screen.lt.md"
            :loading="avatarLoading"
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
      originalInfo: {
        username: this.$t("profile.fallback.username"),
        motto: this.$t("profile.fallback.motto"),
      },
      verified: true,
      editIconSize: 0,
      editIconStyle: {
        top: 0 + 'px',
        'z-index': 1
      },
      expandAvatar: false,
      editProfile: false,
      infoLoading: false,
      editAvatar: false,
      avatarLoading: false,
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
      this.editAvatar = false;
      this.resizeEditIcon();
    };
    let uid = parseInt(this.$route.query.uid.toString());
    let webToken = this.$route.query.webToken;
    this.getProfileInfo(uid, webToken).then((body) => {
      if (body.type === "Success") {
        this.getAvatar(uid).then((body) => {
          if (body.type === "Success") {
            if (body.data) {
              this.info.avatar = body.data.avatar;
              this.$q.localStorage.set("avatar", body.data.avatar);
              this.$q.localStorage.set("avatarHash", body.data.hash);
            } else {
              this.info.avatar = this.$q.localStorage.getItem("avatar");
            }
            this.cropper.img = this.info.avatar;
          }
        }).catch((body) => {
          console.log(body);
        });
        this.originalInfo.uid = body.data.uid;
        this.originalInfo.username = body.data.username;

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
    }).catch((body) => {
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
  mounted() {
    this.resizeEditIcon();
  },
  methods: {
    resizeEditIcon() {
      this.editIconSize = this.$refs.avatarBox.$el.getBoundingClientRect().height * 0.1;
      this.editIconStyle.top = this.$refs.avatarBox.$el.getBoundingClientRect().height * 0.8 + "px";
    },
    getProfileInfo(uid, webToken) {
      return new Promise((resolve, reject) => {
        axios.post('/tech/api/v1/user/profile/info', {
          uid: uid,
          webToken: webToken,
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
    cancelProfile() {
      this.info.username = this.originalInfo.username;
      this.info.motto = this.originalInfo.motto;
      this.editProfile = false;
    },
    uploadProfile() {
      this.infoLoading = true;
      let uid = parseInt(this.$route.query.uid.toString());
      let webToken = this.$route.query.webToken;
      axios.put('/tech/api/v1/user/profile/info', {
        uid: uid,
        webToken: webToken,
        username: this.info.username,
        motto: this.info.motto,
      }).then((response) => {
        let data = response.data;
        if (data.type === "Success") {
          this.$q.notify({
            color: 'green',
            textColor: 'white',
            icon: 'cloud_done',
            message: this.$t("notification.submitSuccess").toString()
          });
          this.editProfile = false;
        } else {
          this.$q.notify({
            color: 'red',
            textColor: 'white',
            icon: 'fas fa-bug',
            message: this.$t("notification.unknownError").toString()
          });
        }
        this.infoLoading = false;
      }).catch((error) => {
        let data = error.response.data;
        if (data.type === "Error") {
          this.$q.notify({
            color: 'amber',
            textColor: 'white',
            icon: 'warning',
            message: data.reason
          });
          this.cancelProfile();
        } else {
          this.$q.notify({
            color: 'red',
            textColor: 'white',
            icon: 'fas fa-bug',
            message: this.$t("notification.unknownError").toString()
          });
        }
        this.infoLoading = false;
      });
    },
    uploadImage() {
      this.avatarLoading = true;
      this.$refs.cropper.getCropData(croppedAvatar => {
        let uid = parseInt(this.$route.query.uid.toString());
        let webToken = this.$route.query.webToken;
        axios.put('/tech/api/v1/user/profile/avatar', {
          uid: uid,
          webToken: webToken,
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
            this.editAvatar = false;
          } else {
            this.$q.notify({
              color: 'red',
              textColor: 'white',
              icon: 'fas fa-bug',
              message: this.$t("notification.unknownError").toString()
            });
          }
          this.avatarLoading = false;
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
          this.avatarLoading = false;
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
