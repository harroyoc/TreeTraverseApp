import { ValidationError } from 'utils/errors';

/************* THIS IS PROBLEM #1 *************/
class BinTreeNode {
    constructor([id, left = null, right = null]) {
        this.id = id;
        this.left = left;
        this.right = right;
    }
}

function parseIntoTree(data) {
    if (!Array.isArray(data)) {
        return data;
    }
    const [id, left, right] = data;
    validateId(id);
    return new BinTreeNode([id, parseIntoTree(left), parseIntoTree(right)]);
}

function validateId(id) {
    if (typeof id !== 'string' && typeof id !== 'number') {
        throw new ValidationError('The IDs must be strings or numbers');
    }
}
/*********************************************/

function validateOtherObj(obj) {
    const keys = Object.keys(obj);
    if (keys.length > 0) {
        throw new ValidationError(`Please remove the following invalid properties: "${keys.join(', ')}"`);
    }
}

// This method sanitizes the user input on the text area
// and converts it into a BinTreeNode tree
function sanitizeTreeObj(obj) {
    const { id, left, right, ...other } = obj;
    validateId(id);
    validateOtherObj(other);
    const node = new BinTreeNode([
        id,
        left ? sanitizeTreeObj(left) : null,
        right ? sanitizeTreeObj(right) : null,
    ]);
    return node;
}

// This method finds the deepest subtree
// If there is a tree with just one node and that node has the max depth,
// then that node becomes the deepest subtree
// If 2 nodes share the max depth, then the parent is the deepest subtree
function subtreeWithDeepestNodes(tree) {
    let depth = 0;
    let deepestParent = null;
    if (!tree) {
        return deepestParent;
    }
    function helper(node, currentDepth) {
        if (!node) {
            return currentDepth;
        }
        depth = Math.max(depth, currentDepth);
        const leftDepth = node.left ? helper(node.left, currentDepth + 1) : currentDepth;
        const rightDepth = node.right ? helper(node.right, currentDepth + 1) : currentDepth;
        if (leftDepth === depth && rightDepth === depth) {
            deepestParent = node
        }
        return Math.max(leftDepth, rightDepth);
    }
    helper(tree, 0);
    return deepestParent;
}

export {
    parseIntoTree,
    sanitizeTreeObj,
    subtreeWithDeepestNodes
};

