import schedule from 'node-schedule'

const date = new Date()

// 每天00:00执行
const rule = new schedule.RecurrenceRule()
rule.hour = 0
rule.minute = 0
rule.second = 0

// 每天9:30执行
const rule2 = new schedule.RecurrenceRule()
rule.hour = 9.5
rule.minute = 0
rule.second = 0



// const job = schedule.scheduleJob(rule, ()=> {})



const testRule = new schedule.RecurrenceRule()
testRule.minute = 30

// schedule.scheduleJob(testRule, ()=> {
//   console.log('每分钟执行');
  
// })

export {
  testRule,
  rule2
}

