<template>
  <div id="app">
    <h1>天气查询</h1>
    <section class="weather-input">
      <input type="text" v-model="query" placeholder="请输入想要查询的城市" @keyup.enter='showWeather'>
      <button :disabled="!query.length" @click="showWeather" >查询</button>
    </section>
    <section v-if="error" class="weather-error">
      未找到相应结果
    </section>
    <section v-if="query.length && City" class="weather-result">
      <h1>{{City}} ------ {{weather_data.date}}</h1>
      <div class="tips">
        <dl v-for="item in todayTips">
          <dt>{{item.tipt}}:</dt>
          <dd>{{item.des}}</dd>
        </dl>
      </div>
      <hr>
      <div class="detail">
        <img :src="weather_data.dayPictureUrl" alt="">
        <img :src="weather_data.nightPictureUrl" alt="">
        <p>今日温度： {{weather_data.temperature}}</p>
        <p>今日天气： {{weather_data.weather}}</p>
        <p>今日风速： {{weather_data.wind}}</p>
      </div>
    </section>
  </div>
</template>

<script>
// const API_KEY = 'cf13c71a52bad00d4b2c1f253e198b06'
import jsonp from '../jsonp/jsonp.js'
export default {
  name: 'my_electron',
  data () {
    return {
      query: '',
      error: false,
      City: '',
      todayTips: [],
      weather_data: {}
    }
  },
  watch: {
    query (val) {
      if (val === '') {
        this.City = ''
      }
    }
  },
  methods: {
    showWeather () {
      this.error = false
      this.City = ''
      this.todayTips = []
      this.weather_data = {}
      jsonp({
        url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(this.query) + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
      }).then(res => {
        if (res.status === 'success') {
          let data = res.results[0]
          this.City = data.currentCity
          this.todayTips = data.index
          this.weather_data = data.weather_data[0]
        } else {
          this.error = true
        }
      })
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  height: 100%;
}

#app {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  padding: 10px;
  background: rgb(212, 228, 239);
  background: -moz-radial-gradient(
    center,
    ellipse cover,
    rgba(212, 228, 239, 1) 0%,
    rgba(134, 174, 204, 1) 100%
  );
  background: -webkit-radial-gradient(
    center,
    ellipse cover,
    rgba(212, 228, 239, 1) 0%,
    rgba(134, 174, 204, 1) 100%
  );
  background: radial-gradient(
    ellipse at center,
    rgba(212, 228, 239, 1) 0%,
    rgba(134, 174, 204, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d4e4ef', endColorstr='#86aecc',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  h1{
    text-align: center;
  }
  .weather-input {
    display: flex;
    align-items: center;
    padding: 20px 0;
  }

  .weather-result {
    h1{
      text-align: center;
    }
    .tips{
      margin-bottom: 20px;
      dt{
        color: #a02b2b;
      }
      dd{
        text-indent: 24px;
      }
    }
    .detail{
      margin-top: 20px;
      text-align: center;
    }

  }

  .weather-error {
    color: red;
    font-weight: bold;
  }

  input {
    width: 75%;
    outline: none;
    height: 20px;
    font-size: 0.8rem;
  }

  button {
    display: block;
    width: 25%;
    height: 25px;
    outline: none;
    border-radius: 5px;
    white-space: nowrap;
    margin: 0 10px;
    font-size: 0.8rem;
  }
}
</style>
