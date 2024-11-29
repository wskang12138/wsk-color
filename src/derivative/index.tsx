import Color from "color"
import { useMemo, useState } from "react"
import styles from './index.module.scss'

const Derivative = () => {
  const [mainColor, setMainColor] = useState<string>('#0d49f2')
  const hoverColor = useMemo(() => {
    const rgb = Color(mainColor).mix(Color('#fff'), 0.2)
    return Color(rgb).hex()
  }, [mainColor])
  const activeColor = useMemo(() => {
    const rgb = Color(mainColor).mix(Color('#000'), 0.2)
    return Color(rgb).hex()
  }, [mainColor])

  return (
    <div>
      <h4>悬浮色、点击色生成</h4>
      <div className={styles['title']}>
        <label>选择你的主色</label>
        <input
          type='color'
          value={mainColor}
          onChange={(e) => {
            setMainColor(e.target.value)
          }}
        />
        <span>{mainColor}</span>
      </div>
      <div className={styles['color-block-list']}>
        <div
          className={styles['color-block']}
          style={{backgroundColor: mainColor}}
        >
          <span>主色</span>
          <span>{mainColor}</span>
        </div>
        <div
          className={styles['color-block']}
          style={{backgroundColor: hoverColor}}
        >
          <span>悬浮色</span>
          <span>{hoverColor}</span>
        </div>
        <div
          className={styles['color-block']}
          style={{backgroundColor: activeColor}}
        >
          <span>点击色</span>
          <span>{activeColor}</span>
        </div>
      </div>
    </div>
  )
}

export default Derivative
