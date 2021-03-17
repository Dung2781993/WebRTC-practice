<template>
  <div id="nav">
    <Navigation :user="user" />
    <router-view :user="user" />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import db from './db.js'
export default {
  name: 'App',
  data: function() {
    return {
      user: null
    }
  },
  mounted() {
    db.collection('users')
      .doc('6micHQopYd1Ha4YC1UAy')
      .get()
      .then(snapshot => {
        this.user = snapshot.data().name
      })
  },
  components: {
    Navigation
  }
}
</script>
<style lang="scss">
$primary: #5f2882;
@import 'node_modules/bootstrap/scss/bootstrap';
</style>
