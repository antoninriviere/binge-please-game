import { BloomPass } from 'postprocessing'
import WavesPass from '../passes/Waves'
export default {
    debug: {
        stats: true,
        orbitControls: false
    },
    postProcessing: {
        active: false,
        passes: [
            {
                name: 'BloomPass',
                active: true,
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
                name: 'WavesPass',
                active: true,
                gui: true,
                constructor: () =>
                {
                    return new WavesPass({})
                }
            }
        ]
    }
}
