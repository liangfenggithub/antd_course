//这里是后台接口的mock，供，service文件来调用。
//注意：
//1. 这里的console.log的调试信息输出到了nodejs的输出窗口，也就是运行 npm run dev 的窗口，而不是浏览器的console.log窗口 
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

  'get /api/cards': function (req, res, next) {
    setTimeout(() => {
      res.json(listData)
    }, 250);
  },

  "delete /api/cards/:id": function (req, res, next) {
    listData = listData.filter(v => v.id !== parseInt(req.params.id))
    console.log(req.params.id);
    setTimeout(() => {
      res.json({
        success: true,
      })
    }, 250)
  },
  'post /api/cards/add': function (req, res, next) {

    console.log("mock接口 api/cards/add 被调用了，传进来的resbody是:", req.body)
    listData = [...listData, {
      ...req.body,
      id: listData[listData.length - 1].id + 1,
    }]
    res.json({
      success: true,
    })
  },


}
//为什么mock没有生效？？？？