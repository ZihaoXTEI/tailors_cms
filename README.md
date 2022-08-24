# Tailors Shop 后端系统

基于 Koa + TypeORM 实现，数据库采用 MySQL 。

### 注意：

需要在 GitBash 或 终端下使用 `openssl`生成公钥和私钥

生成文件的路径：`src/app/key` 文件夹下

生成私钥：

`genrsa -out private.key`

根据私钥生成对应公钥：

`rsa -in private.key -pubout -out public.key`
