const md5Password = async (password: string) => {
  const { createHash } = await import('crypto')

  const md5 = createHash('md5')
  const result = md5.update(password).digest('hex')
  return result
}

export { md5Password }
