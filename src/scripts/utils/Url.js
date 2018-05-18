export const getDebugParams = () =>
{
    const params = {}
    const questionMarkIndex = window.location.href.indexOf('?')
    if(questionMarkIndex === -1) return params
    const search = decodeURIComponent(window.location.href.slice(questionMarkIndex + 1))
    const definitions = search.split('&')

    definitions.forEach((val) =>
    {
        const parts = val.split('=', 2)
        params[parts[0]] = parts[ 1 ]
    })

    return params
}
