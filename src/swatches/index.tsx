import { useMemo, useState } from 'react'
import Color from 'color'
import clsx from 'clsx'
import styles from './index.module.scss'

const rightAlgorithm = (s: number, v: number) => {
  return {
    s: s - s / 5,
    v: v + (100 - v) / 5
  }
}

const leftAlgorithm = (s: number, v: number) => {
  return {
    s: s + (100 - s) / 5,
    v: v - v / 5
  }
}

const generateColorList = (
  h: number,
  s: number,
  v: number,
  algorithm: 'left' | 'right',
  num = 5
) => {
  let index = 0
  const helper = algorithm === 'left' ? leftAlgorithm : rightAlgorithm
  const list: string[] = []
  while (index < num) {
    const temp = helper(s, v)
    s = temp.s
    v = temp.v
    const hexColor = Color({h, s, v}).hex()
    list.push(hexColor)
    index += 1
  }
  return list
}

const Swatches = () => {
  const [mainColor, setMainColor] = useState<string>('#124df5')
  const colorList = useMemo(() => {
    const mainColorHSV = Color(mainColor).hsv()
    const {h, s, v} = mainColorHSV.object()

    const left = generateColorList(h, s, v, 'left').reverse()
    const right = generateColorList(h, s, v, 'right')

    const result = [...new Set([...left, mainColor, ...right])]

    return result
  }, [mainColor])

  return (
    <div>
      <h4>色板生成</h4>
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
      <div className={styles['color-list']}>
        {
          colorList.map((color) => {
            const isLight = Color(color).isLight()
            const className = clsx(
              styles['color-block'],
              isLight && styles['isLight']
            )
            return (
              <div
                key={color}
                className={className}
                style={{backgroundColor: color}}
              >{color}</div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Swatches
