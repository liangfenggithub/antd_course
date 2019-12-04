import React from "react";
import { Table, Modal, Button, Form, Input } from "antd";
const FormItem = Form.Item;
import { connect } from "dva"
const namespace = "cards";


function mapStateToProps(state) {
  return {
    //注意，这里的state是redux中全局store中的state，必须要通过 namesapce来提取对应的信息
    cardsList: state[namespace].cardsList,
    //这个loading是统一的loading，dva封装的，不知什么原理
    cardsLoading: state.loading.effects['${namespace}/queryList']
  };
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onDidMount: () => {
//       console.log("dispatch 出 queryList 的action")
//       dispatch({
//         type: `${namespace}/queryList`
//       })
//     }
//   }
// }

// @connect(mapStateToProps,mapDispatchToProps)
class List extends React.Component {
  state = {
    visible: false,
  }
  componentDidMount() {
    //this.props.onDidMount();
    console.log("dispatch 出 queryList 的action")
    this.props.dispatch({
      type: `${namespace}/queryList`
    })
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }
  test = () => {
    console.log("dispatch 出 addOne 的action")
    this.props.dispatch({
      type: 'cards/addOne',//`${namespace}/addOne`,
      payload: "abc",
    })
  }
  handleOk = () => {
    const { dispatch, form: { validateFields } } = this.props;
    validateFields((err, values) => {
      if (!err) {
        console.log("dispatch 出 addOne 的action")
        this.props.dispatch({
          type: 'cards/addOne',//`${namespace}/addOne`,
          payload: values,
        })
        console.log("开始关闭modal框")
        //关闭modal框
        this.setState({ visible: false });
      }
    })
  }

  columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '链接',
      dataIndex: 'url',
      render: value => <a href={value}>{value}</a>,
    },
  ];
  render() {

    const { cardsList, cardsLoading } = this.props;
    const { visible } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={cardsList}
          loading={cardsLoading}
          rowKey="id"
        >
        </Table>
        <Button onClick={this.showModal}>新建</Button>
        <Button onClick={this.test}>测试</Button>

        <Modal
          title="新建记录"
          visible={visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <FormItem label="名称">
            {getFieldDecorator("name", {
              rules: [{ required: true }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="描述">
            {getFieldDecorator("desc")(
              <Input />
            )}
          </FormItem>
          <FormItem label="连接">
            {getFieldDecorator("url", {
              rules: [{ type: "url" }],
            })(
              <Input />
            )}
          </FormItem>

        </Modal>
      </div>
    )
  }
}
// export default Form.create()(List)
//使用以下的手动创建和 装饰器函数@connect都可以
export default connect(mapStateToProps)(Form.create()(List));