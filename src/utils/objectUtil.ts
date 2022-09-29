export const objectFlat = (obj: any, targetObject: string, attributes: string | Array<string>): any => {
  const currentObj = deepClone(obj)

  if (Object.hasOwn(obj, targetObject)) {
    if (typeof attributes === 'string' && Object.prototype.toString.call(attributes) == '[object String]') {
      // 判断 attributes 是字符串类型
      const target = obj[targetObject]

      if (!target) return

      const attribute = target[attributes]

      // 对属性名称为 id 进行修改
      const attributeName = attributes === 'id' ? `${targetObject}Id` : attributes
      currentObj[attributeName] = attribute
    } else if (Array.isArray(attributes)) {
      // 如果  attributes 是数组类型
      for (let i = 0; i < attributes.length; i++) {
        const target = obj[targetObject]

        if (!target) return

        const attribute = target[attributes[i]]

        // 对属性名称为 id 进行修改
        const attributeName = attributes[i] === 'id' ? `${targetObject}Id` : attributes[i]
        currentObj[attributeName] = attribute
      }
    }
    delete currentObj[targetObject]
  }

  return currentObj
}

export const objectArrayFlat = (array: Array<any>, targetObject: string, attributes: string | Array<string>): any[] => {
  if (!Array.isArray(array) || array.length === 0) {
    return []
  }

  const newArray: any[] = []

  array.forEach((obj) => {
    // const currentObj = deepClone(obj)

    // if (Object.hasOwn(obj, targetObject)) {
    //   if (typeof attributes === 'string' && Object.prototype.toString.call(attributes) == '[object String]') {
    //     // 判断 attributes 是字符串类型
    //     const target = obj[targetObject]
    //     const attribute = target[attributes]

    //     // 对属性名称为 id 进行修改
    //     const attributeName = attributes === 'id' ? `${targetObject}Id` : attributes
    //     currentObj[attributeName] = attribute
    //   } else if (Array.isArray(attributes)) {
    //     // 如果  attributes 是数组类型
    //     for (let i = 0; i < attributes.length; i++) {
    //       const target = obj[targetObject]
    //       const attribute = target[attributes[i]]

    //       // 对属性名称为 id 进行修改
    //       const attributeName = attributes[i] === 'id' ? `${targetObject}Id` : attributes[i]
    //       currentObj[attributeName] = attribute
    //     }
    //   }
    //   delete currentObj[targetObject]
    // }

    const currentObj = objectFlat(obj, targetObject, attributes)
    newArray.push(currentObj)
  })

  return newArray
}

function isObject(value: any) {
  const valueType = typeof value
  return value !== null && (valueType === 'object' || valueType === 'function')
}

// 对象深拷贝
export const deepClone = (originValue: any, map = new WeakMap()): any => {
  // 判断是否是一个 Set 类型
  if (originValue instanceof Set) {
    return new Set([...originValue])
  }

  // 判断是否是一个 Map 类型
  if (originValue instanceof Map) {
    return new Map([...originValue])
  }

  // 判断是否是一个 Date 类型
  if (originValue instanceof Date) {
    return new Date(originValue)
  }

  // 判断如果是 Symbol 的 value, 那么创建一个新的 Symbol
  if (typeof originValue === 'symbol') {
    return Symbol(originValue.description)
  }

  // 判断如果是函数类型, 那么直接使用同一个函数
  if (typeof originValue === 'function') {
    return originValue
  }

  // 判断传入的 originValue 是否是一个对象类型
  if (!isObject(originValue)) {
    return originValue
  }

  // 解决循环引用问题
  if (map.has(originValue)) {
    return map.get(originValue)
  }

  // 判断传入的对象是数组, 还是对象
  const newObject: any = Array.isArray(originValue) ? [] : {}
  map.set(originValue, newObject)
  for (const key in originValue) {
    newObject[key] = deepClone(originValue[key], map)
  }

  // 对 Symbol 的 key 进行特殊的处理
  const symbolKeys = Object.getOwnPropertySymbols(originValue)
  for (const sKey of symbolKeys) {
    // const newSKey = Symbol(sKey.description)
    newObject[sKey] = deepClone(originValue[sKey], map)
  }

  return newObject
}
