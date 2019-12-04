import { Component } from "react";
import { Layout, Menu, Icon } from "antd";
const { Header, Footer, Sider, Content } = Layout;
const { Item, SubMenu } = Menu;
import Link from "umi/link"


export default class BasicLayout extends Component {
  render() {
    return (
      <Layout>
        <Sider
          width={256}
          style={{ minHeight: '100vh', color: "#fff" }}
        >
          <div style={{ height: '32px', background: "rgba(255,255,255,.2)", margin: "16px" }}>管理后台</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Item key="1">
              <Link
                to="/helloworld"
              >
                <Icon type="pie-chart" />
                <span>Hello World </span>
              </Link>

            </Item>

            <SubMenu
              key="sub1"
              title={<span><Icon type="dashboard" /><span>Dashboard</span></span>}
            >
              <Item key="2"> <Link to="/dashboard/analysis">分析页</Link> </Item>
              <Item key="3"> <Link to="/dashboard/monitor">监控页</Link></Item>
              <Item key="4"> <Link to="/dashboard/workplace">工作台</Link></Item>
            </SubMenu>
            <Item key="5">
              <Link
                to="/puzzlecards"
              >
                <Icon type="pie-chart" />
                <span>Model测试</span>
              </Link>
            </Item>
            <Item key="6">
              <Link
                to="/list"
              >
                <Icon type="pie-chart" />
                <span>复杂页面</span>
              </Link>
            </Item>
            <Item key="7">
              <Link
                to="/index"
              >
                <Icon type="pie-chart" />
                <span>引入CSS样式</span>
              </Link>
            </Item>
            <Item key="8">
              <Link
                to="/less"
              >
                <Icon type="pie-chart" />
                <span>引入LESS样式</span>
              </Link>
            </Item>
            <Item key="9">
              <Link
                to="/changedefalutstyle"
              >
                <Icon type="pie-chart" />
                <span>修改atnd的默认样式</span>
              </Link>
            </Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", textAlign: "center", padding: 0 }}> Header</Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>LF Design @2019 Created by liangfeng</Footer>
        </Layout>
      </Layout >
    )
  }
}