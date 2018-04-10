import sono from 'sono'

export default class AudioManager
{
    create(config = { loop: false, volume: 1, effects: [], autoplay: false })
    {
        const sound = sono.create(config)
        if(config.autoplay)
            sound.play()
        return sound
    }
}
