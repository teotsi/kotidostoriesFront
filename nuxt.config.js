export default {
  ssr: false,
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/fonts.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/css/tablestyles.scss',
    '@/assets/css/btnstyles.scss',
    '@/assets/css/main.scss',
    '@/assets/css/storyForm.scss',

  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/fontawesome.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/color-mode'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    'nuxt-fontawesome',

  ],
  axios: {
    baseURL: process.platform==='win32'? 'http://localhost:5000/':'http://ec2-34-201-242-135.compute-1.amazonaws.com:5000/',
    withCredentials: true
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'login/',
            method: 'post',
            propertyName:'token',
            withCredentials: true
          },
          user: {
            url: 'user/me/',
            method: 'get',
            withCredentials: true,
            propertyName: 'user'
          },
          logout: {
            url: 'logout/',
            method: 'get',
            withCredentials: true
          }
        },
      }
    }
  },
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-regular-svg-icons',
        icons: ['far']
      },
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab']
      }
    ],
  }
}
