const files = require.context('.', true, /.*.(vue|json)/);
const templates = {}
const configs = {}
const templateRegex = /(\.\/|\/index\.vue)/g;
const configRegex = /(\.\/|\/raito\.json)/g;
files.keys().forEach(key => {
  if(key.match(/.*\/index\.vue/)) {
    templates[key.replace(templateRegex, '')] = files(key).default 
    return
  }else if(key.match(/.*\/raito\.json/)) {
    configs[key.replace(configRegex, '')] = files(key) 
    return
  }
})

export { templates, configs }