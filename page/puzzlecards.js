//本文件用于实现异步接口请求。

import React, { Component } from "react";
import { Card, Button } from "antd";
import { connect } from "dva";

const namespace = "puzzlecards";
const mapStateToProps = (state) => {
  //这里体现出namespace的作用了
  const cardList = state[namespace].data;
  return {
    cardList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDidMount:() => {
      dispatch({
        type: `${namespace}/queryInitCards`,
      });
    }
  }
}

//@connect是装饰器函数，装饰器能够修改类和类的方法的默认行为
//connect是连接dva和React两个平行世界的关键。
@connect(mapStateToProps,mapDispatchToProps)
export default class PuzzleCardsPage extends Component {

  componentDidMount(){
    this.props.onDidMount();
  }
  render() {
    return (
      <div>
        {
          this.props.cardList.map(card => {
            return (
              <Card key={card.id}>
                <div>Q: {card.setup}</div>
                <div>
                  <strong>A:{card.punchline}</strong>
                </div>
              </Card>
            )
          })
        }
      </div>
    )
  }

}