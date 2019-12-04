import { Button } from "antd"
import myStyles from "./style.less"

export default () => {
  return (
    <div>
      <p>
        <span className={myStyles["override-ant-btn"]}>
          <Button type="primary">圆角样式按钮</Button>
        </span>
      </p>
      <p>
        <Button type="primary">antd 原始按钮</Button>
      </p>
    </div>
  )
}