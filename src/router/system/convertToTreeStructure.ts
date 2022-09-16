import Permission from '../../entity/Permission'

export const convertPermission = (permissionList: Permission[]): Permission[] => {
  const permissionMap: any = new Map()

  // 先遍历所有的父节点，将其加入至 permissionMap 中
  for (let i = 0; i < permissionList.length; i++) {
    if (permissionList[i].id === permissionList[i].parentId || permissionList[i].id === 0) {
      permissionList[i].childPermissionList = []
      permissionMap.set(permissionList[i].id, permissionList[i])
    } else {
      continue
    }
  }

  // 再一次循环，将子节点添加至父节点 childPermissionList 中
  for (let i = 0; i < permissionList.length; i++) {
    if (permissionList[i].id === permissionList[i].parentId || permissionList[i].id === 0) {
      continue
    } else {
      const permission: Permission = permissionMap.get(permissionList[i].parentId)
      if (permission) {
        permission.childPermissionList.push(permissionList[i])
        permissionMap.set(permission.id, permission)
      } else {
        permissionMap.set(permissionList[i].id, permissionList[i])
      }
    }
  }

  // Map 转换成 Array，只要 value
  const newPermissionList: Permission[] = [...permissionMap.values()]

  return newPermissionList
}

export const convertMenu = () => {
  console.log('Hi')
}
