export function depthToString(depth) {
    if (depth === 0) {
        return "./";
    }
    let result = "";
    for (let i = 0; i < depth; i++) {
        result = result + "../";
    }
    return result;
}

export default depthToString;