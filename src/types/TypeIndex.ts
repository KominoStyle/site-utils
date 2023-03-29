/**
 * An HTML element or an array of HTML elements or a jQuery object of HTML elements.
 */
type UseHTMLElement = HTMLElement | HTMLElement[] | JQuery<HTMLElement>

/**
 * A descriptor for an image, containing its source URL and file name.
 */
type ImageDescriptor = { src: string, name: string }