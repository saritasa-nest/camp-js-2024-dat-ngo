/**
 * Type Guard to return if element is HTML Element.
 * @param element Input Element.
 */
export function isHTMLElement(element: ChildNode | null): element is HTMLElement {
	return element instanceof HTMLElement;
}
