import request from "../util/request";
import { message } from "antd";
import * as cardsService from "../service/cards.js";

const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}

export default {
  namespace: "cards",
  state: {
    cardsList: [
    ]
  },
  effects: {
    * queryList(_, sagaEffects) {//第一个参数 函数内部用不到，可以传入下划线
      console.log("进入 queryList 的effects")
      //以下有两种实现方式：
      //1. 在这里直接模拟请求
      // const listData = [{
      //   name: 'umi',
      //   desc: '极快的类 Next.js 的 React 应用框架',
      //   url: 'https://umijs.org'
      // },
      // {
      //   name: 'antd',
      //   desc: '一个服务于企业级产品的设计体系',
      //   url: 'https://ant.design/index-cn'
      // },
      // {
      //   name: 'antd-pro',
      //   desc: '一个服务于企业级产品的设计体系',
      //   url: 'https://ant.design/index-cn'
      // }
      // ];
      // const { call, put } = sagaEffects;
      // yield call(delay, 3000);
      // yield put({ type: "initList", payload: listData })

      //2. 走mock数据，不值为啥mock没有拦截成功
      // const {call,put} = sagaEffects;
      // const url = "/devcardsList";

      // try{
      //   const data = yield call(request,url);
      //   yield put({type:"initList",payload: listData});
      // }catch{
      //   message.error("数据捕获失败")
      // }


      //3. 使用service提供的api
      const { call, put } = sagaEffects;
      const rsp = yield call(cardsService.queryList);
      // console.log("queryList");
      // console.log(rsp);
      yield put({ type: "saveList", payload: { cardsList: rsp } })
    },
    * addOne({ payload }, sagaEffects) {//增加一条记录
      console.log("进入 *addOne")
      const { call, put } = sagaEffects;
      console.log("开始执行 cardsService.addOne")
      const rsp = yield call(cardsService.addOne, payload);
      console.log("开始发出action: queryList")
      yield put({ type: "queryList" });
      return rsp;
    }
  },
  reducers: {
    saveList(state, { payload: { cardsList } }) { //注意这样的结构赋值只有cardsList有效，payload无法使用
      // console.log("saveList")
      // console.log("cardsList", cardsList)
      return {
        ...state,
        cardsList,
      }
    },


    initList(state, { payload }) {
      const cardsList = [...payload];
      return {
        cardsList: cardsList
      };
    }
  }
}