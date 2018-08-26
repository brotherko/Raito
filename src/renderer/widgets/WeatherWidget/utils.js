export function weatherToIcon(icon) {
  const iconTable = {
    '01d': 'wi-day-sunny',
    '02d': 'wi-day-cloud',
    '03d': 'wi-cloud',
    '04d': 'wi-cloudy',
    '09d': 'wi-day-showers',
    '10d': 'wi-day-alt-rain-mix',
    '11d': 'wi-day-thunderstorm',
    '13d': 'wi-day-snow',
    '50d': 'wi-day-haze',
    '01n': 'wi-night-sunny',
    '02n': 'wi-night-cloud',
    '03n': 'wi-cloud',
    '04n': 'wi-cloudy',
    '09n': 'wi-night-alt-showers',
    '10n': 'wi-night-alt-rain-mix',
    '11n': 'wi-night-alt-thunderstorm',
    '13n': 'wi-night-alt-snow',
    '50n': 'wi-night-haze',
  }
  return iconTable[icon]
}
