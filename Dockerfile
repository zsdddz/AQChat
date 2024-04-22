# 基于Node镜像
FROM node:lts-alpine
 
# 设置工作目录
WORKDIR /app

# 复制项目文件到工作目录
COPY . .

# 安装依赖
RUN npm install

# 构建生产环境代码
RUN npm run build

# 暴露端口
EXPOSE 7000

# 定义启动命令
CMD ["npm", "run", "preview"]