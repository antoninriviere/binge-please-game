import ControlKit from 'controlkit'

class GUI extends ControlKit
{
    constructor(options)
    {
        super(options)

        this.panel = this.addPanel()
        const dom = document.querySelector('#controlKit')
        dom.addEventListener('mousedown', (e) =>
        {
            e.stopPropagation()
        }, false)
    }

    addPanel(options = {})
    {
        return super.addPanel({
            align: 'left',
            position: [100, 0],
            width: 275,
            ratio: 20,
            fixed: false,
            ...options
        })
    }
}

export default new GUI()
