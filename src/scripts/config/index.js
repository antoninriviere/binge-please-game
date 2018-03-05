import Support from 'Utils/global/Support'

const support = new Support()

/* eslint-disable no-undef */
export default {
    environment: 'dev',
    baseApiUrl: 'http://api.grain-de-sel.imm-g-prod.com',
    apiUrls: {
        home: '/wp/wp-json/acf/v3/options/home',
        about: '/wp/wp-json/acf/v3/options/about',
        projects: '/wp/wp-json/acf/v3/projects'
    },
    isTouchDevice: support.touch,
    smoothScroll: {
        active: true
    }
}
/* eslint-enable no-undef */
