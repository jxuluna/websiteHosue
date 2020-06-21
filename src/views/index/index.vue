<template>
    <div class="index_page">
        <hihomeHead/>
        <router-view></router-view>
        <HihomeFooter/>
    </div>
</template>

<script>
  import hihomeHead from '../layout/hihomeHead';
  import HihomeFooter from '../layout/hihomeFooter';

  export default {
    components: {
      hihomeHead,
      HihomeFooter,
    },
  }
</script>

<style lang="scss">
</style>
