import React, { Component } from 'react'
import { RandomArray } from './RandomArray'

export default class BubbleSort extends Component {
  constructor() {
    super();
    this.ref = React.createRef()
    console.log('bubble sort')
    this.swap.bind(this)
    // 生成用来排序的随机数组
    this.lenOfRandomArray = 10 + Math.ceil(Math.random() * 10)  // 随机生成的随机数组的长度
    this.randomArray = []
    for (let i = 0; i < this.lenOfRandomArray; i++) {
      this.randomArray.push(Math.floor(Math.random() * 50 + 1)) // 生成lenOfRandomArray个[1, 50] 的随机数，并放入randomArray中
    }
    // console.log(this.randomArray)
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async swap(leftIndex, rightIndex) {
    /**
     * 当rightIndex位置的数值大于leftIndex的数值，
     * 交换其位置，通过添加删除class的方式控制动画效果
     */
    const children = this.ref.current.children
    children[leftIndex].classList.add('move-right') // 大的div向右移动
    children[rightIndex].classList.add('move-left') // 小的div向左移动
    const tmp = this.randomArray[leftIndex]
    // 交换数组中左右的值
    this.randomArray[leftIndex] = this.randomArray[rightIndex]
    this.randomArray[rightIndex] = tmp
    setTimeout(() => {
      // 交换html中div的位置
      this.ref.current.insertBefore(children[rightIndex], children[leftIndex])
      children[leftIndex].classList.remove('move-left')
      children[rightIndex].classList.remove('move-right')
      leftIndex += 1
      rightIndex += 1
    }, 800)
  }

  async checking(leftIndex, rightIndex, ms) {
    if (rightIndex >= this.lenOfRandomArray) {
      return
    }
    this.ref.current.children[leftIndex].classList.add('checking')
    this.ref.current.children[rightIndex].classList.add('checking')
    await this.sleep(ms)
    this.ref.current.children[leftIndex].classList.remove('checking')
    this.ref.current.children[rightIndex].classList.remove('checking')
  }

  async componentDidMount() {
    let leftIndex = 0
    let rightIndex = 1
    let indexOfLastSortedNum = this.lenOfRandomArray

    while (rightIndex < indexOfLastSortedNum) {
      // 左侧的值大于右侧的值，需要交换
      if (this.randomArray[leftIndex] > this.randomArray[rightIndex]) {
        this.swap(leftIndex, rightIndex)
        // console.log(`swap ${leftIndex} and ${rightIndex}`)
        await this.sleep(800)
        if (rightIndex + 1 < this.lenOfRandomArray && this.randomArray[rightIndex] > this.randomArray[rightIndex + 1]) {
          this.checking(rightIndex, rightIndex + 1, 300)
          await this.sleep(300)
        }
      } else {
        this.checking(leftIndex, rightIndex, 800)
        await this.sleep(800)
      }
      if (rightIndex + 1 === indexOfLastSortedNum) {
        this.ref.current.children[rightIndex].classList.add('done')
        leftIndex = 0
        rightIndex = 1
        indexOfLastSortedNum -= 1
        continue
      }
      leftIndex += 1
      rightIndex += 1
    }
    this.ref.current.children[0].classList.add('done')
    // console.log(this.randomArray)
  }

  render() {
    return (
      <RandomArray ref={this.ref} randomArray={this.randomArray}></RandomArray>
    )
  }
}
