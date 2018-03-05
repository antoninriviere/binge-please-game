export default function getAbsoluteBoundingRect(el)
{
    let offsetX = window.scrollX || window.pageXOffset || document.body.scrollLeft + (document.documentElement && document.documentElement.scrollLeft || 0)
    let offsetY = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0)


    const rect = el.getBoundingClientRect()

    if(el !== document.body && el.parent !== null)
    {
        let parent = el.parentNode

        while(parent !== document.body)
        {
            offsetX += parent.scrollLeft
            offsetY += parent.scrollTop
            parent = parent.parentNode
        }
    }

    const styles = window.getComputedStyle(el)

    return {
        bottom: rect.bottom + offsetY,
        height: rect.height,
        left: rect.left + offsetX,
        right: rect.right + offsetX,
        top: rect.top + offsetY,
        width: rect.width,
        margins: {
            top: parseFloat(styles.marginTop),
            right: parseFloat(styles.marginRight),
            bottom: parseFloat(styles.marginBottom),
            left: parseFloat(styles.marginLeft)
        }
    }
}
