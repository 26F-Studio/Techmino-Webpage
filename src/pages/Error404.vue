<template>
  <div class="fullscreen text-white text-center q-pa-md flex flex-center">
    <InterstellarTravel class="dimmed" :mino-base-amount="100"/>
    <DisplayGround class="dimmed"/>
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops. Nothing here...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import InterstellarTravel from "components/InterstellarTravel";
import DisplayGround from "components/DisplayGround";

export default {
  name: 'Error404',
  components: {
    InterstellarTravel,
    DisplayGround
  },
}
</script>
