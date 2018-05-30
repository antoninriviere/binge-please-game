import raf from 'raf'
import SceneObj from 'WebGLCore/scene'
import Config from 'WebGLConfig'
import camelcase from 'lodash.camelcase'

import Time from 'Utils/Time'
import Mouse from 'Utils/Mouse'

import MouseMoveRotate from './interactions/mouse-move-rotate'
import ThirteenReasonsWhy from './interactions/13-reasons-why'
import StrangerThings from './interactions/stranger-things'

class App
{
    constructor(container)
    {
        this.scene = new SceneObj({
            container: container,
            ...Config
        })

        this.container = container

        this.group = undefined
        this.interactionId = undefined

        this.time = new Time()
        this.time.start()

        this.mouse = new Mouse(window.innerWidth, window.innerHeight)

        this.update()
    }

    addGroup(id)
    {
        this.interactionId = id
        this.group = this.getInteractionGroup(id)
        this.scene.add(this.group)
    }

    getInteractionGroup(id)
    {
        switch(id)
        {
            case 'mouse-move-rotate':
                return new MouseMoveRotate({ scene: this.scene, mouse: this.mouse })
            case '13_reasons_why':
                return new ThirteenReasonsWhy({ scene: this.scene, mouse: this.mouse })
            case 'stranger-things':
                return new StrangerThings({ scene: this.scene, mouse: this.mouse })
        }
    }

    clearGroup()
    {
        const groupName = camelcase(this.interactionId)
        const group = this.scene.getObjectByName(groupName)
        group.clear()
        this.scene.remove(group)
        this.scene.renderer.dispose()
    }

    update = () =>
    {
        this.time.tick()

        if(this.group)
        {
            this.group.update(this.time)
            this.scene.render(this.time)
        }

        raf(this.update)
    }

    mouseMove = (event) =>
    {
        this.mouse.onMove(event)

        if(this.group) this.group.onMove(this.mouse)
    }

    resize = () =>
    {
        this.width = window.innerWidth
        this.height = window.innerHeight

        this.mouse.onResize(this.width, this.height)

        if(this.group) this.group.resize(this.mouse)

        this.scene.resize(this.width, this.height)
    }
}

export default App
