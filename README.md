# Tailors Shop 后端系统

## <font color="red">长久开发项目</font>

基于 Koa + TypeORM 实现，编程语言采用 TypeScirpt，数据库采用 MySQL 。

未完。。。

### 注意：

1. 需要在 GitBash 或 终端下使用 `openssl` 生成公钥和私钥

   生成文件的路径：`src/app/key` 文件夹下

   - 生成私钥的指令：`genrsa -out private.key`

   - 根据私钥生成对应公钥的指令：`rsa -in private.key -pubout -out public.key`

2. 需要在项目文件夹下创建 `.env` 文件，文件内代码内容如下：

   ```
   APP_HOST=http://localhost
   APP_PORT=9000

   MYSQL_HOST=修改为你的MySQL主机地址
   MYSQL_PORT=修改为你的MySQL主机地址
   MYSQL_DATABASE=修改为你的MySQL数据库名称
   MYSQL_USER=修改为你的MySQL连接用户名称
   MYSQL_PASSWORD=修改为你的MySQL连接密码
   ```

3. 待续
