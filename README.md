# 夏明灿的学习仓库
## week-01
简单的html+css,连js都没有写，属于最简单的项目，是用来熟悉git操作的。
适合环境搭建，以及相关工具的认识，完全零基础
## week-02
CSS3基础样式，CSS3动画，盒子模型，Flex布局实战。
使用了flex布局，完成的静态页面，也属于练手的项目
## week-03
 移动端适配，响应式布局设计，移动端适配，移动端特别样式处理。
 是主要用了rem和媒体查询用来做移动端适配
## week-04
ES6/TypeScript ，ES模块系统，TypeScript核心概念，异步编程。
主要学习了ES6规范以及TS内容
### 思路 
1、先编写静态 html 结构，实现页面效果
2、编写 area、album 对应的Interface，IArea、IAlbum，用来描述后端数据结构
3、因为需要将 area、album 数据和DOM节点关联，所以创建两个类 Area、Album，各自 implements 于 IArea、IAlbum，关联各自DOM对象
4、将网络请求方法拆分到独立模块
5、遍历 areas 生成标签的 DOM 结构，关联 area 对象和对应的 DOM 对象，并且绑定 click 事件，用于处理点击时切换列表内容的逻辑
6、根据当前选中的标签（默认选中第一项）过滤 albums 中对应该分类的专辑数据，遍历生成下面的列表结构，关联 album 对象和对应的 DOM 对象，同时给每一项的删除按钮绑定 click 事件，用于处理点击时删除该列表项
7、删除列表项需要删除DOM节点：removeChild
8、删除列表项需要删除数组中的数据：splice
9、动态创建 DOM 的逻辑实现之后，删除之前html页面中需要被动态填充的部分
10、用户点击标签项时，需要判断当前点击的标签 id，调用上面渲染列表项 DOM 的函数，然后过滤 albums 中的数据生成新的列表结构，先清空现有的列表项，然后将新的列表项插入
11、通过 tsc -w 监控编译TS代码，通过 nginx 启动的http服务来访问页面
## week-05
React基础，组件化思想，React基础概念。JSX语法，React状态、事件绑定。
使用了React/JSX编写之前的响应式页面。
### 心得
  当我们要开发一个React应用时，首先需要考虑的就是应该如何划分组件层级，也就是该将哪些部分划分到一个功能组件中，通常来说，一个功能组件应该只负责一个功能，如果他需要负责更多的功能，这时候就需要考虑是否将它拆分到更小的组件。但是也应该避免过度拆分组件，这样会增加代码的复杂度，反而给维护增加工作量。

  确定好组件的划分之后，我们一般会先实现一个静态版本的组件，这个版本暂不包含各种动态的数据绑定或事件处理，只是先单纯的实现组件的UI布局。静态版本实现之后，我们要考虑该如何放置组件的状态，应该在组件内维护 state 还是应该通过父组件传入 props，确定好之后，我们再使用状态数据替换静态组件中需要填充的部分。
### week-06
浏览器技术，DevTools常用功能，HTTP协议基本知识，JSON、Fetch,CORS,本地缓存。
了解了计算机网络的东西，http协议，200，301，302，403，404，500中http头包含的东西。
Cookie是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下一次向同意服务器再次发起请求的时候携带并发送到服务器上，它通常用于告知服务端两个请求是否来自同一客户端，如保持用户的登录状态，Cookie使基于无状态的HTTP协议记录稳定的状态信息成为了可能。
Cookie主要用于以下三个方面：
会话状态管理，如登录状态
个性化设置，如用户的自定义设置、主题、语言等
浏览器行为跟踪，主要用于分析用户行为、广告推荐等等
### week-07
React进阶，webpack基本使用，组件的生命周期，路由的使用。
项目一共有三个路由页面，分别为 Posts、News、Detail，所需数据通过远程API的形式提供，不在需要本地JSON文件，devServer 中已经配置好了代理，全部通过GET方式调用，数据结构说明如下，文章内容只会在 detail 接口中返回，列表接口不会返回，具体的API请求已经在 services/api.ts 中封装好，直接调用即可
如果组件有多个Props，可以用类型组合的写法来传递，如
'<interface Params {
  id: string
}
interface Props {
  post: IArticle
}
class PostItem extends React.Component<Props & RouteComponentProps<Params>> {

}>'
## week-08
React高级,Git基础使用,Less实战,CSS Modules,MobX状态库,Ant Design组件库 
合作完成一个初级的淘宝客户端和管理端，我的主要贡献是完成了客户端的代码编写，
 效果示意：客户端https://sku-front.kscampus.io:10443/
           管理端https://sku-admin.kscampus.io:10443/
 服务端为老师提供，使用的node.js
## week-09
Node.js基础,使用TypeScript编写Node.js程序
使用node.js编写了类似于liunx操作系统的原生wget，cp，ls，cd，cls，cat等方法，问题和思路都在子目录下的readme.md文档
 
 
