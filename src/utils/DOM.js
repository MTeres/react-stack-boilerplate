/* ------------------------------------------
   DOM Helper
--------------------------------------------- */

// Detect if an element is parent from another based on the searched element DOM id attribute
export const hasParentNodeWithId = (elem, id) => { // eslint-disable-line
  if (elem && elem.tagName) {
    if (elem.id === id) {
      return true;
    } else {
      return hasParentNodeWithId(elem.parentNode, id); // recurse
    }
  }
  return false;
};

