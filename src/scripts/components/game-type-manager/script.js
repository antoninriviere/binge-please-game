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
    },

    mounted()
    {
        this.keyCodeLetters =
        [
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
                let win

                switch(entry)
                {
                    // Enter
                    case 13 :
                        win = this.$root.gameManager.submitAnswer(this.currentType.toLowerCase())
                        this.eventHub.$emit('game:submit-answer', win)
                        this.currentType = ''
                        break
                    // Backspace
                    case 8 :
                        this.currentType = this.currentType.substring(0, this.currentType.length - 1)
                        break
                    // Space
                    case 22 :
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
        }
    }
}
