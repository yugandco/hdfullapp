<template>
    <div class='test'>
        <h1>Submit Smth</h1>
        <input name='phoneNumber' class='form-control' type="text" v-model='phoneNumber' placeholder="Write smth">
        <input class='form-control' v-model='password' type="text" name="password" id="password" placeholder="password">
        <button class='btn btn-primary btn-block' @click='submitText'>Click</button>
        <br>
        <br>
        <ul>
            <li>{{ User.phoneNumber }}</li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Test',
  data () {
    return {
      phoneNumber: '',
      password: '',
      data: null,
      User: {}
    }
  },
  mounted () {
    axios.get('/api/test')
      .then(res => {
        console.log(res)
        this.User = res.data.users[0]
      })
  },
  methods: {
    submitText () {
      const user = {
        phoneNumber: this.phoneNumber,
        password: this.password
      }
      console.log(user)
      axios.post('/api/test', user)
        .then(res => console.log(res.status))
        .catch(error => console.log(error))
    }
  }
}
</script>
