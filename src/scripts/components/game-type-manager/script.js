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
            currentType: '',
            answer: ''
        }
    },

    created()
    {
        window.addEventListener('keydown', this.onKeyBoardEnter)
        this.$store.watch(this.$store.getters.getSkippedQuestions, this.onSkipQuestion)
    },

    mounted()
    {
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
        onSkipQuestion()
        {
            // this.currentType = ''
            // this.isActive = false
        },
        onKeyBoardEnter(ev)
        {
            const entry = ev.keyCode || ev.which

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
                        this.$store.dispatch('submitAnswer', { answer: this.currentType.toLowerCase(), time: this.$root.time.currentTime })
                        // this.currentType = ''
                        // this.isActive = false
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
        transitionOut()
        {
            const bounds = this.$refs.text.getBoundingClientRect()
            const xEnd = Math.ceil(bounds.x + bounds.width) * 1.5
            TweenMax.set(this.$refs.text, { skewX: '0deg', transformOrigin: '50% 50%' })
            return new Promise((resolve) =>
            {
                TweenMax.to(this.$refs.text, 0.6, {
                    x: -xEnd,
                    skewX: '-18deg',
                    letterSpacing: '3.5vw',
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
        }
    }
}
