<template>
<div class="widget">
  <div class="container">
    <div class="icon">
      <i class="wi" :class="getIconClass(this.current.weather[0].icon)"></i>
    </div>
    <div class="content">
      <div class="stat">
        {{ this.current.main.temp }} ℃ | {{ this.current.main.humidity }} %
      </div>
      <div class="desc">
        {{ this.current.weather[0].description }}
      </div>

    </div>
  </div>
</div>
</template>

<style scoped>
  .widget {
    font-family: Arial;
    background: rgba(33, 33, 33, 0.7);
    -webkit-app-region: drag;
    -webkit-user-select: none;
  }

  .container {
    display: flex;
    font-size: 1rem;
    padding: 1em;
    color: #FFF;
  }
  .icon {
    flex: 1;
    font-size: 3.5em;
  }
  .content {
    flex: 3;
    padding: 0.5em;
    text-align: center;
  }
  .content > .stat {
    font-size: 1.5em;
  }
  .content > .desc {
    font-size: 0.8em;
  }
  .content > div {
    margin: 0.2em auto;
  }
</style>


<script>
require('./icons/css/weather-icons.css');

import { weatherToIcon } from './utils.js';

const weatherUrl = 'http://api.openweathermap.org/data/2.5';
const secret = 'b0bde8bf8aa4e497fdf94bd38939c7a5';
const location = 'hong kong';
export default {
  name: 'WeatherWidget',
  created: function() {
    this.getWeather();
  },
  computed: {
  },
  methods: {
    getWeather: function(){
      this.loading = true;
      const path = `${ weatherUrl }/weather?q=${ location }&appid=${ secret }&units=metric`;
      this.$http(path).then((res) => {
        this.current = res.data
      });
    },
    getIconClass: function(icon){
      return weatherToIcon(icon);
    }
  },
  data: function() {
    return {
      current: {},
      loading: false,
    }
  }
}
</script>
