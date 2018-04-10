import Support from 'Utils/global/Support'

const support = new Support()

export default {
    environment: 'dev',
    isTouchDevice: support.touch
}
