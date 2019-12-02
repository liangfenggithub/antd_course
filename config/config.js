export default {
  singular: true,//指定页面所在文件夹为单数形式的page
  plugins: [
    ["umi-plugin-react", {
      //这里暂时没有配置
    }]
  ],
  routes: [
    {
      path: "/",
      component: "./HelloWorld" //component相对于page目录的相对路径
    }
  ]
};