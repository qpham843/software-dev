walk(document.body);

function walk(node) {
	// I stole this function from here:
	// http://is.gd/mwZp7E

	var child, next;

	switch (node.nodeType) {
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
		child = node.firstChild;
		while (child) {
			next = child.nextSibling;
			walk(child);
			child = next;
		}
		break;
		case 3: // Text node
		handleText(node);
		break;
	}
}

function handleText(textNode) {
	var v = textNode.nodeValue;
	// console.log("v: " + v);

	v = v.replace(/\byes\b/g, "yeet");
	v = v.replace(/\bYes\b/g, "Yeet");
	v = v.replace(/\bYES\b/g, "YEET");
	v = v.replace(/\bhi\b/g, "uwu");
	v = v.replace(/\bHi\b/g, "uwu");
	v = v.replace(/\boo\b/g, "uwu");

	textNode.nodeValue = v;
}
