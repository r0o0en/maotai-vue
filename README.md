# 茅台移动端项目重做
*使用 vue + vueRouter + vuex + mintUi*

vueRouter transition 过渡
======
依赖动画 vueRouter-transition.less
###### 页面初始化后第一个路由组件动画
第一个路由组件使用淡入淡出 fade
###### 其他路由动作:前进（left）/后退(right)
在vuex声明参数 pathHistory[Array],用来存储路由记录，每次路由时判断 pathHistory to和from：
1. pathHistory 倒数第二个是to,则为后退，删除pathHistory中对应项，动画名称：right;
2. 如果pathHistory中没有匹配项，则为前进，将跳转路径存入pathHistory,动画名称：left