import { BloomPass } from 'postprocessing'
// import WavesPass from '../passes/Waves'
import FXAAPass from '../passes/FXAA'
export default {
    debug: {
        stats: false,
        orbitControls: false,
        axes: false
    },
    postProcessing: {
        active: false,
        gui: false,
        passes: [
            {
                name: 'BloomPass',
                active: true,
                gui: false,
                constructor: () =>
                {
                    return new BloomPass({
                        resolutionScale: 0.5,
                        intensity: 0.5,
                        distinction: 1.0
                    })
                }
            },
            {
                name: 'FXAAPass',
                active: true,
                gui: false,
                constructor: () =>
                {
                    return new FXAAPass({})
                }
            }
        ]
    }
}
