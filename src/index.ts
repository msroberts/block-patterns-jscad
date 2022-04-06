import {primitives} from '@jscad/modeling'

const {star} = primitives

export const main = () =>{
  const newStar = star({outerRadius:6})

  return [
    newStar,
  ]
}
