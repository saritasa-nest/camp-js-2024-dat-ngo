/** Type Guard to return if element is HTML Element.
 * @param element Input Element.
 */
export function isHTMLButtonElement(element: unknown): element is HTMLButtonElement {
	return element instanceof HTMLButtonElement;
}
