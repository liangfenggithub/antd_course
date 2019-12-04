import request from "../util/request";
import { message } from "antd";
const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}
export default {
  //一个dva model 最少具备两个成员：namespace和state，namestate作为一个model的唯一标志，state中就是该model管理的数据

  namespace: 'puzzlecards',
  state: {
    data: [],
    counter: 0,
  },
  //reducers就是redux中的reducers
  reducers: {
    addNewCard(state, { payload: newCard }) {
      const nextCounter = state.counter + 1;
      const newCardWithId = { ...newCard, id: nextCounter };
      const nextData = state.data.concat(newCardWithId);
      return {
        data: nextData,
        counter: nextCounter,
      };
    },
  },
  //effects函数和redux-saga中的worker—function功能一样是generator函数用于实现异步操作
  //局部上看 effect 就是一个一个的 generator function。宏观上看，effect 是一层中间件。
  effects: {
    *queryInitCards(_, sagaEffects) {
      try {
        console.log("进入effects 的queryInitCards 函数")
        const { call, put } = sagaEffects;

        const endPointURL = "/dev/random_joke";
        const puzzle = yield call(request, endPointURL);//通知saga中间件去执行异步请求，并把结果返回回来
        console.log("异步接口请求的结果是：", puzzle);
        yield put({ type: "addNewCard", payload: puzzle });
        yield call(delay, 3000);
        const puzzle2 = yield call(request, endPointURL);
        yield put({ type: "addNewCard", payload: puzzle2 })
      } catch (e) {
        message.error("数据获取失败");
      }

    }
  }


}