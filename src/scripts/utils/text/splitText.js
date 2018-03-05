/* eslint-disable */
const splitText = {

    toLetters(elem, name, secondName)  {
        const html = elem.innerHTML

        this.letters = html.replace('&amp;', '&').split('')

        let result = ''

        this.letters.forEach((letter, i) => {
            if (secondName != undefined) {
                this.letters[i] = '<span class="' + secondName + ' ' + name + '-' + i + '"><span class="' + name + '__mask">' + letter + '</span></span>'
            }
            else {
                this.letters[i] = '<span class="' + name + '-' + i + '"><span class="' + name + '__mask">' + letter + '</span></span>'
            }
            result += this.letters[i]
        })

        return elem.innerHTML = result
    }
}

export default splitText
/* eslint-enable */
