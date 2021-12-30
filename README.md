# Ethanim

## 启动步骤
### 安装
```
npm install
```

### 本地开发
```
npm run serve
```

### 打包
```
npm run build
```

> 部署：打包后的dist文件放入服务器，或者配置自动部署。

## 组件 components

#### 订阅邮件组件 Mailchimp

代码嵌入，form 表单 action 的地址`/post`替换为`/post-json`，method 方法改为`get`，并隐藏实际表单，利用ajax 提交 form 表单。

#### 区块链钱包连接组件 WalletPopup

- MetaMask & WalletConnect

  引入 `web3Modal`,`web3`

  引入`@walletconnect/web3-provider`

