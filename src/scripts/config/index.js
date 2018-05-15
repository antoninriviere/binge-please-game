import Support from 'Utils/global/Support'

const support = new Support()

export default {
    environment: 'dev',
    isTouchDevice: support.touch,
    firebase: {
        apiKey: 'AIzaSyAE3y4YTuYee0EKxv8c0kH98x7ln-GWv3A',
        authDomain: 'binge-please-tests.firebaseapp.com',
        databaseURL: 'https://binge-please-tests.firebaseio.com',
        projectId: 'binge-please-tests',
        storageBucket: 'binge-please-tests.appspot.com',
        messagingSenderId: '195688918590'
    }
}
