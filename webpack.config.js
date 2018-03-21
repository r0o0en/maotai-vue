module.exports = function(env){
console.log(env);
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
/*JS 压缩 模块*/
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
/*公共资源分离    模块*/
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
/*=====================
*   公共参数
* =====================*/
//项目名称
let projectName = "吉粮茅台";
// 开发环境?
let envInt = ['server','dev','build'].indexOf(env.env);
// 兼容IE?
let inIE = false;
//编译文件存放目录
let path_dist = Path.join(__dirname,'dist');
//生产开发代码
let path_src = Path.join(__dirname,'src');

/*    */
//node服务器端口
let port = '8888';
//node服务器 启动时，页面引用图片的绝对路径
// let location_server = 'http://localhost:'+port+'/';
let location_server = '/';
//本地测试打包时，页面引用图片的绝对路径
let location_dev = 'http://192.168.100.178/maotai-vue/dist/';
//线上版本打包时，页面引用图片的绝对路径
let location_build = 'http://192.168.100.178/maotai-vue/dist/';
//后续配置统一调用的 绝对路径变量
let path_absolute = [location_server,location_dev,location_build][envInt < 0 ? 1 : envInt];
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
    // ,hash:true
});
/*js压缩*/
let jsCompress = new UglifyJsPlugin({
    // sourceMap: true,//使用源映射将错误消息位置映射到模块（这会降低编译速度）
    // warningsFilter:false //允许过滤uglify警告
});
/*第三方公共库分离*/
let vendorSeparate =  new CommonsChunkPlugin({
        //为什么要额外加入一个 不纯在的 chunk ： manifest
        //利用CommonsChunkPlugin生成一个专门跟踪vendor.js变化的js文件，取名manifest.js
        //当main.js改变时，只会改变mainfest.js，而不会改变 vendor.js
        //https://www.cnblogs.com/femonzor/p/6642023.html
        names:['vendor','manifest']
});
/*=====================
*   输出配置
* =====================*/

const modules = {} ;
/*入口文件*/
modules.entry = {
    // vendor: inIE ?  ["vue","vue-router","vuex","babel-polyfill"] : ["vue","vue-router","vuex"],
    vendor: ["vue","vue-router","vuex",'mint-ui'],
    app: Path.join(path_src,"main.js")
};
/*出口文件*/
modules.output = {
    path:path_dist,
    // publicPath:path_absolute,
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
                'postcss-loader',
                'less-loader'
            ]
        })
    }
    ,{
        test: /\.(png|jpg|gif)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    name:function(file){
                        return '[path][name].[ext]';
                    }
                    ,limit:10
                    // ,publicPath:'static/'
                    // ,useRelativePath:true
                    // ,outputPath:'[path]'
                    ,publicPath:path_absolute
                }
            }
        ]
    }
];

/*=====================
*   挂载 实例化模块
* =====================*/
modules.plugins = [
    style,
    htmlIndex,
    vendorSeparate
];
/*js压缩,请只在生产环境下使用*/
envInt > 1 ? modules.plugins.push(jsCompress) : delete jsCompress;
/*=====================
*   热更新 webpack-dev-server
* =====================*/
if( envInt === 1 ){
    modules.devServer =  {
        contentBase: path_src
        ,port:port
    }
}

/*=====================
*   vue template 报错 ,指定vue模块路径为完整版本
*   npm默认导出的是运行时构建版本，不含 template 编辑器（template包含在独立构建/完整版本中）
*
* =====================*/
// modules.resolve = {
//     alias: {
//         'vue': 'vue/dist/vue.js'
//     }
// };
return modules;
/*输出*/
// module.exports = modules;
};