// 创建一个新的url通过组合一些特殊的url
const combineURL = (baseUrl, path) => {
    return `${baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}
export default combineURL;