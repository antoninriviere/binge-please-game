import { BloomPass } from 'postprocessing'
// import WavesPass from '../passes/Waves'
import FXAAPass from '../passes/FXAA'
export default {
    debug: {
        stats: true,
        orbitControls: false
    },
    postProcessing: {
        active: true,
        passes: [
            {
                name: 'BloomPass',
                active: false,
                gui: false,
                constructor: () =>
                {
                    return new BloomPass({
                        resolutionScale: 0.5,
                        intensity: 2.0,
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
