import React from 'react'

export const RandomArray = React.forwardRef((props, ref) => {
  return (
    <div style={{ 'display': 'flex', alignItems: 'flex-end' }} ref={ref} className='items'>
      {props.randomArray.map((num, index) => {
        return (
          <div key={index} style={{ height: num * 4 + 'px' }} className='item'>
            <p>{num}</p>
          </div>
        )
      })}
    </div>
  )
})
