//注意：
//在umi框架中 config/config.js和.rmirc.js 两者只能存在一个，
//为方便编译通过，将此文件重命名

export default {
  //使用less变量修改默认antd的主题颜色
  theme: {
    @primary-color: "#30b767",
  }
}