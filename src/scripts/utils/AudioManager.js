import sono from 'sono'

export default class AudioManager
{
    resumeContext()
    {
        sono.context.resume()
    }
    create(config = { loop: false, volume: 1, effects: [], autoplay: false })
    {
        const sound = sono.create(config)
        if(config.autoplay)
            sound.play()
        return sound
    }
}
