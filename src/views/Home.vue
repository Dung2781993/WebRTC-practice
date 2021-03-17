<template>
  <div>
    <h1>Home</h1>
    <p>Welcome {{ user }}</p>
  </div>
</template>
<script>
import db from '../db.js'
export default {
  name: 'home',
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
  }
}
</script>
