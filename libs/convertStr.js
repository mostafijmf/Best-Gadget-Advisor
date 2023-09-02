// <!-- Convert string: "This is String" to "this-is-string" -->
const convertStr = (string) => {
    return string.trim().toLowerCase().replace(/\s+/g, '-').replace(/^\//, '')
}
export default convertStr;