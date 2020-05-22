export default {
  mode: 'spa',
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
    ],
    script: [
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'},
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/css/tablestyles.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~plugins/rich-editor', ssr: false},
    '~/plugins/fontawesome.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [],
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
    baseURL: 'http://localhost:5000/',
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
            withCredentials: true
          },
          user: {
            url: 'user/me',
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
        tokenRequired: false,
        tokenType: false
      }
    },
    cookie: {
      prefix: 'auth.',
      options: {
        httpOnly: true
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
