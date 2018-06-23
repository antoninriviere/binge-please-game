export default function resizePositionProportionally(parentW, parentH, contentW, contentH)
{
    const aspectRatio = contentW / contentH
    const scale = ((parentW / parentH) < aspectRatio) ? (parentH / contentH) * 1 : (parentW / contentW) * 1
    const newW = contentW * scale
    const newH = contentH * scale
    const vars = {
        width: newW,
        height: newH,
        left: (parentW >> 1) - (newW >> 1),
        top: (parentH >> 1) - (newH >> 1),
        scale: scale
    }
    return vars
}
