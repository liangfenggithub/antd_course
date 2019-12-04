# 项目说明
Ant Design 实战教程的练习程序。
注意：因为开始的疏忽，并未将model、page、service、layout、util文件夹放在src文件夹下，但是功能完全实现，待后期有时间完善。

## umi
umi是阿里推出的一个基于react的框架，采用**约定大于配置**的思想，将常用的react全家桶按照常用方式组合在一起，方便使用。
umi的所有配置放在`config/config.js`文件中，安装`umi-plugin-react`插件后，通过在该文件中配置参数即可引入对应的框架，如：
```javascript
  plugins: [
    ["umi-plugin-react", {
      //这里暂时没有配置
      antd: true, //antd
      dva: true,//redux、redux-saga、redux-router 的封装
      locale: { //使得mock接口生效
        enable: true,
      }
    }]
  ],
```
## dva的使用
dva不是一个新的框架，而是一个对多个框架的封装。

dva是将`react-rudex`和`react-saga`以及`react-router`进行了再次封装,在封装之前要写一个异步功能需要新建多个文件，封装之后，dva将同步reducer功能、异步saga处理和默认的state 全部都放在一个modal文件当中，每次修改都只需要修改modal文件即可，简化使用。

在每个 `modal`文件中都一个唯一`namespace`来进行store中state的区分，类似之前`redux`中`combineReducer`函数中的键值。

### 一个包含异步界面的流程

参考页面`list/index.js`记录一个页面从载入数据到修改数据的全过程的逻辑，注意：这里的异步请求全部放在dva中deffect来实现，（实际还是 redux-saga 中间件来实现的）

第一步： `componentDidMount`函数进行`dispatch`一个`effect`进行接口请求
```javascript
  componentDidMount() {
    console.log("dispatch 出 queryList 的action")
    this.props.dispatch({
      type: `${namespace}/queryList` //注意这里的namespace对应modal中的namespace
    })
  }
```
第二步： 在对应`modal`中的`effect`副作用部分进行捕获并处理
```javascript
  effects: {
    * queryList(_, sagaEffects) {//第一个参数 函数内部用不到，可以传入下划线
      const { call, put } = sagaEffects; //call和put是redux-saga中间件提供的辅助函数
      const rsp = yield call(cardsService.queryList); //第三步
      yield put({ type: "saveList", payload: { cardsList: rsp } }) //第五步
    },
  }
```

第三步：第三步的实现被包括在上一步的代码中（看注释），saga捕捉到指定的action：'queryList'后，开始调用 `Service`中的方法对服务器进行接口请求，所有的服务器接口请求都封装在service中实现。
```javascript
export function queryList() {
  return request("/api/cards")
}
```
request是封装的`fetch`函数，实现在`util/request`中
```javascript
export default async function request(url, options) { //这里用到的es7的sync语法，本质上同generator函数
  const response = await fetch(url, options);
  checkStatus(response);
  return await response.json();
}
```
这里用到的es7的sync语法，本质上是一个generator函数的`语法糖`，目的是用同步的语法实现异步的功能。

第四步：当`service`函数进行`fetch`后，如果开启了mock函数，那么本地的开发`server`会对异步请求进行拦截，返回自己定义的假数据。
```JavaScript
let listData = [
  {
    id: 1,
    name: 'umi',
    desc: '极快的类 Next.js 的 React 应用框架',
    url: 'https://umijs.org'
  },
  {
    id: 2,
    name: 'antd',
    desc: '一个服务于企业级产品的设计体系',
    url: 'https://ant.design/index-cn'
  },
  {
    id: 3,
    name: 'antd-pro',
    desc: '一个服务于企业级产品的设计体系',
    url: 'https://ant.design/index-cn'
  }
];
export default {
  "get /dev/cardsList": function (req, res) {
    console.log("mock接口 cardsList 被调用了")
    setTimeout(() => {
      res.json(listData);
    }, 250);
  },
  .....其他mock接口

}
```
接口mock是由`umi`框架来实现的，只需要在根目录下建立`mock`文件夹，并在其中根据不同模块新建接口模拟数据，接口模拟数据是一个键值对，键名是一个字符串，对应的模拟接口方法和接口名，如`get /dev/cardsList`， 代表模拟接口`/dev/cardsList`GET请求的回应。键值是一个自定义的函数，用于返回模拟的接口数据。其中的延时用定时器来模拟实现。

开发完成后，需要代理本地接口请求，方式是修改`config/config.js`文件中的`proxy`配置。

第五步：无论是真实接口还是mock的接口，只要数据返回到第二步`effect`中的一个变量后，第二步立即`put`出一个新的`action`：“saveList”，并将接口返回的数据配置到`payload`中,供`model`文件中的`reducer`部分进行捕捉处理，
`reducer`捕捉到后，与redux处理一直，返回新的state。
```javascript
    saveList(state, { payload: { cardsList } }) { //注意这样的结构赋值只有cardsList有效，payload无法使用
      return {
        ...state,
        cardsList,
      }
    },
```

第六步：state修改后，经过`connect`包装后的页面组件进行`render`函数刷新。至此完成载入页面并初始化数据的显示。后续修改数据和这六步相同。
注意：umi中可能配置`babel`的解码，可以支持装饰器函数，上述的`connect`高阶组件，也可以通过`@connect`方式实现。
```javascript
// @connect(mapStateToProps,mapDispatchToProps)
class List extends React.Component {
  state = {
    visible: false,
  }
  .....省略.....
}
```
## umi的配置
dva将采用约定大于配置的思想，之前利用`react-router`等的配置在umi中以约定俗成的固化，其与配置均在`config/config.js`文件中实现。
### 路由
路由在`config/config.js`文件中设置。
```javascript
  routes: [{
    path: "/",//主路由
    component: "../layout/index.js",
    routes: [ //子路由
      {
        path: "/",
        component: "./HelloWorld",//component相对于page目录的相对路径
      },
      {
        path: "helloworld",
        component: "./HelloWorld",
      },
      {
        path: "/dashboard",
        routes: [
          { path: "/dashboard/analysis", component: "Dashboard/Analysis" },
          { path: "/dashboard/monitor", component: "Dashboard/Monitor" },
          { path: "/dashboard/workplace", component: "Dashboard/Workplace" }
        ]
      },
    ]
  }],
```
path为路由要匹配的路由字符串，component为`page`文件夹下的组件，umi实现了两者的关联，新增页面只需要在`page`文件夹内部建立js文件即可。

### 接口代理
在 `config/config.js`中实现，
```javascript
  proxy: {
    "/dev": {
      target: 'https://08ad1pao69.execute-api.us-east-1.amazonaws.com',
      changeOrigin: true,
    }
  },
```
开发跨域配置，实现本地服务器检测到跨域的请求，作为反向代理的角色替浏览器完成请求功能
这里的意思是说：往本地服务器 localhost:8000 的 ajax 调用中，如果是以 /dev 开头的，
那么就转发到远端的 https://08ad1pao69.execute-api.us-east-1.amazonaws.com 服务器当中，/dev 也会保留在转发地址中。


## 全局样式
开发中为保证不同浏览器的兼容性，经常强制覆盖页面元素的默认样式，在umi中需要在`src`文件夹下新建`global.less`文件实现默认元素样式覆盖
```
//本文件是用来更改全局样式的，这个文件不会被css modules处理
//比如覆盖全局默认标签的样式
p {
  m
}

```

## 使用css和less Module
umi默认支持css以Module方式引入，同时支持css和less，具体参考路由`index`和`less`


## 修改antd 组件默认样式
无论是css还是scss还是less都可以用`global`关键字实现默认主题的样式修改
比如修改antd的Button直角变成圆角
```
.override-ant-btn {
  :global(.ant-btn) {
    border-radius: 16px;
  }
}
```
注意：要修改antd的默认样式时，建议将被修改的类用一个类名`override-ant-btn `包起来(名称可以任意)，避免影响到当前页面其他位置的同一类型的组件。



## 统一修改antd样式
antd使用ts与less来编写的，less支持样式的变量定义，因此可以通过配置修改整体组件的样式修改，常用的是颜色主题。
覆盖默认主题可在项目根目录新建`.umirc.js`文件，编写覆盖样式的代母，详细的参考官网教程。
```javascript
export default {
  //使用less变量修改默认antd的主题颜色
  theme: {
    @primary-color: "#30b767",
  }
}
```
注意：在新建本文件再次进行`npm run dev`后会提示`config.js与.umirc.js两者只能存在一个`，因此暂时屏蔽，覆盖默认样式也没有看到实际效果。


源码仓库地址： https://github.com/liangfenggithub/antd_course.git