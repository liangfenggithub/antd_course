export default {
  singular: true,//指定页面所在文件夹为单数形式的page,否则就是pages
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
      {
        path: "puzzlecards",
        component: "Puzzlecards"
      },
      {
        path: 'list',
        component: "list/index.js"
      },
      {//用于理解css module
        path: "index",
        component: "index.js"
      },
      {//用于理解less module
        path: "less",
        component: "css-modules-with-less/index.js"
      },
      {//用于修改antd的默认样式
        path: "changedefalutstyle",
        component: "css-modules-with-antd/index.js"
      }


    ]
  }],
  proxy: { //开发跨域配置，实现本地服务器检测到跨域的请求，作为反向代理的角色替浏览器完成请求功能
    //这里的意思是说：往本地服务器 localhost:8000 的 ajax 调用中，如果是以 /dev 开头的，
    //那么就转发到远端的 https://08ad1pao69.execute-api.us-east-1.amazonaws.com 服务器当中，/dev 也会保留在转发地址中。
    // "/dev": {
    //   target: 'https://08ad1pao69.execute-api.us-east-1.amazonaws.com',
    //   changeOrigin: true,
    // }
  },
};