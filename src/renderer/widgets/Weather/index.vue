<template>
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
</template>

<style scoped>
.container {
  display: flex;
  font-size: 1rem;
  padding: 1em;
  color: #fff;
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
require("./assets/icons/css/weather-icons.css");

const weatherUrl = "http://api.openweathermap.org/data/2.5";
const secret = "b0bde8bf8aa4e497fdf94bd38939c7a5";
const location = "hong kong";
export default {
  name: "WeatherWidget",
  created: function() {
    this.getWeather();
  },
  computed: {},
  methods: {
    getWeather: function() {
      this.loading = true;
      const path = `${weatherUrl}/weather?q=${location}&appid=${secret}&units=metric`;
      this.$http(path).then(res => {
        this.current = res.data;
      });
    },
    getIconClass: function(icon) {
      const iconTable = {
        "01d": "wi-day-sunny",
        "02d": "wi-day-cloud",
        "03d": "wi-cloud",
        "04d": "wi-cloudy",
        "09d": "wi-day-showers",
        "10d": "wi-day-alt-rain-mix",
        "11d": "wi-day-thunderstorm",
        "13d": "wi-day-snow",
        "50d": "wi-day-haze",
        "01n": "wi-night-sunny",
        "02n": "wi-night-cloud",
        "03n": "wi-cloud",
        "04n": "wi-cloudy",
        "09n": "wi-night-alt-showers",
        "10n": "wi-night-alt-rain-mix",
        "11n": "wi-night-alt-thunderstorm",
        "13n": "wi-night-alt-snow",
        "50n": "wi-night-haze"
      };
      return iconTable[icon];
    }
  },
  data: function() {
    return {
      current: {},
      loading: false
    };
  }
};
</script>
