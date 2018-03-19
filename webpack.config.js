/*=====================
*   引入模块
* =====================*/
/*webpack   模块*/
const Webpack = require('webpack');
/*path  模块*/
const  Path = require('path');
// /*CSS 分离    模块*/
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// /*html编译    模块*/
const HtmlWebpackPlugin = require('html-webpack-plugin');
/*=====================
*   公共参数
* =====================*/
//项目名称
let projectName = "吉粮茅台";
// 开发环境?
let isdev = true;
// 兼容IE?
let inIE = false;
//编译文件存放目录
let path_dist = Path.join(__dirname,'dist');
//生产开发代码
let path_src = Path.join(__dirname,'src');

/*=====================
*   实例化模块
* =====================*/
/*  CSS分离：extract-text-webpack-plugin */
let style = new ExtractTextWebpackPlugin({
    filename:'css/[name].[contentHash:5].css'
});
/* html编译  */
let htmlIndex = new HtmlWebpackPlugin({
    // template:'ejs-compiled-loader!'+Path.join(path_src,'index.html') //待处理的.html模板路径
    template:Path.join(path_src,'index.html') //待处理的.html模板路径
    ,title: projectName //传递给.html的参数title，通过 <%= htmlWebpackPlugin.options.title %> 调用
    ,testData:['html-webapck-plugin模块','可以处理html模板','最基础就是用来编译时自动引入.css/.js文件','也能做一些传参处理模板的功能'] //测试是否能传递自定义数据给.html模板 （证明是可以的）
    ,showErrors:true
    ,inject:true
    ,chunksSortMode: "dependency" //资源载入顺序：从属顺序
    ,favicon:Path.join(__dirname,'static','favicon.ico')
    //,hash:true
});

/*=====================
*   输出配置
* =====================*/
const modules = {} ;
/*入口文件*/
modules.entry = {
    // vendor: inIE ?  ["vue","vue-router","vuex","babel-polyfill"] : ["vue","vue-router","vuex"],
    app: Path.join(path_src,"main.js")
};
/*出口文件*/
modules.output = {
    path:path_dist,
    filename:Path.join("js","[name].[chunkHash:5].js")
};
/*loader 文件编译规则配置*/
modules.module = {};
modules.module.rules = [
    {
        test:/\.vue$/,
        loader:'vue-loader',
        options:{
            extractCSS:true
        }
    }
    ,{
        test:/\.js$/,
        exclude:/node_modules/, //哪些目录中的 .js 文件不需要进行 babel-loader
        use: {
            loader: 'babel-loader'
            // ,options:{"presets": ["babel-preset-env"]}
            // 额外配置文件 .babelrc
            // 将 options 参数通过.babelrc配置，解决 .vue文件中的js不进行 es6=>es5编译的问题
        }
    }
    ,{
        test:/\.(less|css)/,
        use:style.extract({
            fallback:'style-loader',
            use:[
                {
                    loader:'css-loader',
                    options:{
                        minimize:true
                    }
                },
                // 'postcss-loader',
                'less-loader'
            ]
        })
    }
];

/*=====================
*   挂载 实例化模块
* =====================*/
modules.plugins = [
    style,
    htmlIndex
];

/*=====================
*   热更新 webpack-dev-server
* =====================*/
if(isdev){
    modules.devServer =  {
        contentBase: path_src
    }
}

/*=====================
*   vue template 报错 ,指定vue模块路径为完整版本
*   npm默认导出的是运行时构建版本，不含 template 编辑器（template包含在独立构建/完整版本中）
*
* =====================*/
modules.resolve = {
    alias: {
        'vue': 'vue/dist/vue.js'
    }
};

/*输出*/
module.exports = modules;