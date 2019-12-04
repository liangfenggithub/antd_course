import myStyles from "./styles.less"
export default () => {
  return (
    <div className={myStyles.hello}>
      文字是样式是由less来控制的、
      <span className={myStyles.deleted}>
        hello world 
      </span>
    </div>
  )
}