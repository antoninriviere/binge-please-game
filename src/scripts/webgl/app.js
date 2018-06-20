import eventHub from 'Application/event-hub'

import SceneObj from 'WebGLCore/scene'
import Config from 'WebGLConfig'

import Time from 'Utils/Time'
import Mouse from 'Utils/Mouse'

import ThirteenReasonsWhy from './interactions/13-reasons-why'
import StrangerThings from './interactions/stranger-things'
import OrangeIsTheNewBlack from './interactions/orange-is-the-new-black'
import Narcos from './interactions/narcos'

import FinishScreen from './interactions/finish'

class App
{
    constructor(container)
    {
        this.scene = new SceneObj({
            container,
            ...Config
        })

        this.container = container

        this.group = undefined
        this.interactionId = undefined

        this.time = new Time()
        this.time.start()

        this.mouse = new Mouse(window.innerWidth, window.innerHeight)

        this.interactionConfig = { scene: this.scene, mouse: this.mouse }

        this.windowObj = {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    addGroup(id)
    {
        this.interactionId = id
        this.group = this.getInteractionGroup(id)
        this.scene.add(this.group)
        eventHub.$on('application:enterframe', this.update)
    }

    getInteractionGroup(id)
    {
        switch(id)
        {
            case '13_reasons_why':
                return new ThirteenReasonsWhy(this.interactionConfig)
            case 'stranger-things':
                return new StrangerThings({ ...this.interactionConfig, windowObj: this.windowObj })
            case 'orange-is-the-new-black':
                return new OrangeIsTheNewBlack(this.interactionConfig)
            case 'narcos':
                return new Narcos({ ...this.interactionConfig, windowObj: this.windowObj })
            case 'finish-screen':
                return new FinishScreen(this.interactionConfig)
        }
    }

    clearGroup()
    {
        this.group.clear()
        this.scene.remove(this.group)
        this.group = undefined
        // this.scene.renderer.dispose()
        this.scene.renderer.clear()
        eventHub.$off('application:enterframe', this.update)
    }

    update = () =>
    {
        this.time.tick()

        if(this.group)
            this.group.update(this.time)
        this.scene.render(this.time)
    }

    mouseMove = (event) =>
    {
        this.mouse.onMove(event)

        if(this.group)
            this.group.onMouseMove(this.mouse)
    }

    resize = () =>
    {
        this.width = window.innerWidth
        this.height = window.innerHeight

        this.mouse.onResize(this.width, this.height)

        this.windowObj.width = this.width
        this.windowObj.height = this.height

        if(this.group)
            this.group.resize(this.mouse, this.windowObj)

        this.scene.resize(this.width, this.height)
    }
}

export default App
