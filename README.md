###### 微信机器人

- 节假日使用静态数据，不用每次发送请求 ok
- 支持多个群，并且方便配置 ok
- 代码优化
- 数据库接入问题
- help指令，说明书

```js
--help 列出所有功能(指令+描述)
每个功能拆成一个办,暴露出一个函数，直接在login的时候调用

onMessage需要判断来发不同的消息，期待通过一个函数获得文字消息，然后手动发送
onLogin 需要订阅,期待直接调用即可订阅，但是文字消息也要封装成一个函数


// 可能需要发送多个群
function gruups(g:string[]) {
  return function(bot, text) {

  }
}

const send = groups(['1', '2'])
send(bot, text)

// 一个函数，接收数组
function() {}

[morningText(), fishText()].join('\n')

```

