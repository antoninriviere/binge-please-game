import eventHub from 'Application/event-hub'

import { TweenMax } from 'gsap'

export default
{
    name: 'game-type-manager',

    components:
    {

    },

    data()
    {
        return {
            isActive: false,
            isTypeable: false,
            currentType: '',
            answer: '',
            currentPage: ''
        }
    },

    created()
    {
        window.addEventListener('keydown', this.onKeyBoardEnter)
        eventHub.$on('application:route-change', this.onRouteChange)
        this.errorSound = this.$root.audioManager.create({
            url: '../static/sounds/wrong_answer.mp3',
            autoplay: false,
            loop: false
        })
    },

    mounted()
    {
        this.$app = document.querySelector('#app')
        this.keyCodeLetters =
        [
            { code: 48 , letter: '0' },
            { code: 49 , letter: '1' },
            { code: 50 , letter: '2' },
            { code: 51 , letter: '3' },
            { code: 52 , letter: '4' },
            { code: 53 , letter: '5' },
            { code: 54 , letter: '6' },
            { code: 55 , letter: '7' },
            { code: 56 , letter: '8' },
            { code: 57 , letter: '9' },
            { code: 65 , letter: 'a' },
            { code: 66 , letter: 'b' },
            { code: 67 , letter: 'c' },
            { code: 68 , letter: 'd' },
            { code: 69 , letter: 'e' },
            { code: 70 , letter: 'f' },
            { code: 71 , letter: 'g' },
            { code: 72 , letter: 'h' },
            { code: 73 , letter: 'i' },
            { code: 74 , letter: 'j' },
            { code: 75 , letter: 'k' },
            { code: 76 , letter: 'l' },
            { code: 77 , letter: 'm' },
            { code: 78 , letter: 'n' },
            { code: 79 , letter: 'o' },
            { code: 80 , letter: 'p' },
            { code: 81 , letter: 'q' },
            { code: 82 , letter: 'r' },
            { code: 83 , letter: 's' },
            { code: 84 , letter: 't' },
            { code: 85 , letter: 'u' },
            { code: 86 , letter: 'v' },
            { code: 87 , letter: 'w' },
            { code: 88 , letter: 'x' },
            { code: 89 , letter: 'y' },
            { code: 90 , letter: 'z' }
        ]
    },

    destroyed()
    {
        window.removeEventListener('keydown', this.onKeyBoardEnter)
    },

    methods:
    {
        onRouteChange(newRoute)
        {
            if(newRoute.name === 'quiz' && this.currentPage !== 'quiz')
            {
                if(this.$refs.text.classList.contains('is-tuto'))
                    this.$refs.text.classList.remove('is-tuto')
                this.$store.watch(this.$store.getters.getSkippedQuestions, this.onSkipQuestion)
                this.$store.watch(this.$store.getters.getTypeErrors, this.onTypeError)
            }
            if(newRoute.name === 'tuto' && this.currentPage !== 'tuto')
                this.$refs.text.classList.add('is-tuto')
            this.currentPage = newRoute.name
        },
        onSkipQuestion()
        {
            this.isTypeable = false
        },
        onTypeError()
        {
            this.errorSound.play()
            this.playFailedTransition()
        },
        onKeyBoardEnter(ev)
        {
            const entry = ev.keyCode || ev.which

            if(entry === 39)
                eventHub.$emit('application:skip')

            if(!this.isTypeable)
                return

            if(!this.isActive)
            {
                for(let i = 0; i < this.keyCodeLetters.length; i++)
                {
                    if(entry === this.keyCodeLetters[i].code)
                    {
                        this.isActive = true
                        this.currentType += this.keyCodeLetters[i].letter
                    }
                }
            }
            else
            {
                switch(entry)
                {
                    // Enter
                    case 13 :
                        if(this.currentPage === 'quiz')
                            this.$store.dispatch('submitAnswer', { answer: this.currentType.toLowerCase(), time: this.$root.time.currentTime })
                        else if(this.currentPage === 'tuto')
                            this.testPlayType()
                        else
                            break
                        break
                    // Backspace
                    case 8 :
                        this.currentType = this.currentType.substring(0, this.currentType.length - 1)
                        break
                    // Space
                    case 32 :
                        this.currentType += ' '
                        break
                    // Default
                    default :
                        for(let i = 0; i < this.keyCodeLetters.length; i++)
                        {
                            if(entry === this.keyCodeLetters[i].code)
                                this.currentType += this.keyCodeLetters[i].letter
                        }
                        break
                }
            }
        },
        testPlayType()
        {
            if(this.currentType.toLowerCase() === 'play')
            {
                eventHub.$emit('game:start')
                this.currentType = ''
            }
            else
            {
                this.currentType = ''
            }
        },
        transitionOut(questionState)
        {
            if(questionState === 'success')
                return this.playSuccessTransition()
            else
                return this.playFailedTransition()
        },
        playSuccessTransition()
        {
            const bounds = this.$refs.text.getBoundingClientRect()
            const xEnd = Math.ceil(bounds.x + bounds.width) * 2
            TweenMax.set(this.$refs.text, { skewX: '0deg', transformOrigin: '50% 50%' })
            return new Promise((resolve) =>
            {
                TweenMax.to(this.$refs.text, 0.7, {
                    x: -xEnd,
                    skewX: '-18deg',
                    letterSpacing: '7.5vw',
                    ease: Power3.easeOut,
                    clearProps: 'all',
                    onComplete: () =>
                    {
                        this.currentType = ''
                        this.isActive = false
                        resolve()
                    }
                })
            })
        },
        playFailedTransition()
        {
            return new Promise((resolve) =>
            {
                const tl = new TimelineMax({
                    onComplete: () =>
                    {
                        this.currentType = ''
                        this.isActive = false
                        resolve()
                    }
                })
                tl.to(this.$refs.text, 0.3, {
                    color: '#F73E39',
                    ease: Power3.easeOut,
                    clearProps: 'all'
                }, 0)
                tl.fromTo(this.$app, 0.05, {
                    rotation: '-2deg'
                }, {
                    rotation: '2deg',
                    repeat: 2,
                    yoyo: true,
                    clearProps: 'all'
                }, 0)
            })
        }
    }
}
