export function isHTMLElement(element: any): element is HTMLElement {
    return typeof element === 'object' && element !== null && element.nodeType === 1
}

export function isString(value: any): value is string {
    return typeof value === "string";
}