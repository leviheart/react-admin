/**自动化工程 */
//声明组件对象
const components = [];
//建立上下文件关系
const files = require.context("../../views", true, /\.js$/);//第一个参数：目录，第二个参数：是否查找子级目录，第三参数：指定查找到文件
//循环文件
files.keys().map(key => {
    if (key.includes("./index/") || key.includes("./login/")) { return false; }
    const splitFilesName = key.split(".");
    const josnObj = {};
    //path
    const path = `/index${splitFilesName[1].toLowerCase()}`;
    const component = files(key).default;
    //写入对象
    josnObj.path = path;
    josnObj.component = component;
    components.push(josnObj);
})

export default components;