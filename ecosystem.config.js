module.exports = {
  apps : [{
    script: './node_modules/nuxt/bin/nuxt.js',
    watch: '.',
    name: "koeko",
    exec_mode: "cluster",
    instances: 'max',
    args: 'start',
    ignore_watch : ["node_modules", "static/"],
    env: {
      "NODE_ENV": "production",
      "PORT": 7777,
    }
  }],

  
};
