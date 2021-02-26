
module.exports = {
	dev: process.env.NODE_ENV !== 'production',
	head: {
		title: 'Welcome to Koeko where business owners save cost',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'user-scalable=no, initial-scale=1, maximum-scale=1' },
			{
				hid: 'Koeko_description',
				name: 'description',
				content: 'Learn fast and easy DO-IT-YOURSELF skills that will help your business reduce cost and increase profit.'
			},
			{
				hid:'og:image',
				name: 'og:image',
				content: 'https://res.cloudinary.com/cudua-images/image/upload/v1613919731/cudua_asset/koeko-logo-icon_grhnks.png'
			}
		],
	
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/apple-touch-icon.png' },
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&family=Poppins:wght@900&display=swap'
			}
		],
		script: [
			{src: '/js/popper.js'},
			{src: '/js/bootstrap.min.js'},
			{src: '/js/app.js'},
		]
	},
	css: [
		'@/assets/css/bootstrap.min.css',
		'@/assets/css/app.css'
	],
	plugins: [
		{src: '~/plugins/business/BusinessUIPlugin.client.js', ssr: false},
		{src: '~/plugins/customer/customerUIPlugin.client.js', ssr: false},
		{src: '~/plugins/utils.js', ssr: true},
		{src: '~/plugins/apollo.js', ssr: true},
		{src: '~/plugins/notification.client.js', ssr: false},
		{ src: '~/plugins/localStorage.js', ssr: false },
		{ src: '~/plugins/globalUI.client.js', ssr: false },
		{ src: '~/plugins/imagePlugin.js', ssr: true },
		{ src: '~/plugins/vue-paystack.client.vue', ssr: false },
		{ src: '~/plugins/vue-star-rating.client.vue', ssr: false },
		{ src: '~/plugins/scroll-to-top.client.vue', ssr: false },
		{ src: '~/plugins/pwa/custom-service-worker.js', ssr: false },
		{ src: '~/plugins/ga.client.js', ssr: false },
		{ src: '~/plugins/animate-scroll.client.js', ssr: false },
		{ src: '~/plugins/blogEditor.js', ssr: false }
	],
	
	modules: [
		'@nuxtjs/toast',
		'@nuxtjs/onesignal',
		'@nuxtjs/pwa',
		'@nuxtjs/apollo',
		'@nuxtjs/axios',
		'nuxt-facebook-pixel-module',
	],
	facebook: {
		/* module options */
		pixelId: '947417772730133',
		track: 'PageView',
		autoPageView: true,
		disabled: false
	},
	loading: false,
	pwa: {
		icon: {
			
		},
		meta: {
			viewport: 'user-scalable=no, initial-scale=1, maximum-scale=1',
			mobileApp: 'mobile-web-app-capable',
			mobileAppIOS: false,
			appleStatusBarStyle: 'default',
			name: "Koeko",
			author: "Koeko Inc.",
			description: "In 1 hour, you can learn a skill and never hire a professional",
			theme_color: '#fff',
			ogHost: "https://koeko.xyz",
			nativeUI: true,
		},
		manifest: {
			name: "Put your business ahead of the game.",
			lang: 'en',
			useWebmanifestExtension: false,
			short_name: "Koeko",
			display: 'standalone',
			background_color: "#fff",
			theme_color: '#fff',
		},
		workbox: {
			/* workbox options */
			workboxURL: 'https://cdn.jsdelivr.net/npm/workbox-cdn/workbox/workbox-sw.js',
			importScripts: [
				'custom-sw.js'
			],
			offlineAnalytics: true,
			autoRegister: false,
			offlinePage: '/offline.html',
			swURL: 'custom-sw.js',
			cachingExtensions: '@/plugins/pwa/workbox-range-request.js',
			runtimeCaching: [
				{
					urlPattern: 'https://fonts.googleapis.com/.*',
					handler: 'cacheFirst',
					method: 'GET',
					strategyOptions: {
						cacheName: 'kokeo-cache',
						cacheableResponse: {statuses: [0, 200]}
					},
					strategyPlugins: [{
						use: 'Expiration',
						config: {
						maxEntries: 10,
						maxAgeSeconds: 300
						}
					}]
				},
				{
					urlPattern: 'https://fonts.gstatic.com/.*',
					handler: 'cacheFirst',
					method: 'GET',
					strategyOptions: {cacheableResponse: {statuses: [0, 200]}, cacheName: 'koeko-cache',},
					strategyPlugins: [{
						use: 'Expiration',
						config: {
						maxEntries: 10,
						maxAgeSeconds: 300
						}
					}]
				},
			]
		}
	},
	buildModules: [
		'@nuxtjs/dotenv',
	],

	apollo: {
		clientConfigs: {
			default: '~/apollo/client-configs/default.js',
		}
	},
	env: {
		API_END_POINT: process.env.API_END_POINT,
		CLOUDINARY_FOLDER:process.env.CLOUDINARY_FOLDER,
		INSTAGRAM_APP_ID:process.env.INSTAGRAM_APP_ID,
		INSTAGRAM_APP_SECRET:process.env.INSTAGRAM_APP_SECRET
	},
	server: {
		port: 7777, // default: 3000
		host: '0.0.0.0' // default: localhost
	}

}