###### 微信机器人

- 节假日使用静态数据，不用每次发送请求 ok
- 支持多个群，并且方便配置 ok
- 代码优化
- 数据库接入问题
- help指令，说明书

```js
--help 列出所有功能(指令+描述)


需求
定时任务 每天晚上24:00 机器人下线 22:10提醒睡觉助眠， 22:30准备睡觉 22:50 睡觉
接口 机器人注销接口 登录接口(返回二维码)，用ws更新机器人状态

小程序构想
可供群成员和超级管理员使用(启动机器人)
群成员
添加一些定时任务，可以选择
群提醒，个人提醒(需要添加好友)
需要提醒的内容
需要提醒的时间
是否需要重复
  不需要
  生成cron的格式进行重复

重复周期
发送类型
  群聊 群名 微信昵称
  私人 微信昵称
发送内容 文本
添加定时任务后，只能等待第二天或者联系超级管理员重启机器人

早上通过小程序查看机器人状态，注销、启动、重启


start/bot
```

