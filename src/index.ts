import app from './router'
import https from 'https'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 解析当前文件目录
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // 读取证书和私钥
// const privateKey = fs.readFileSync(path.join(__dirname, 'key.pem'), 'utf8');
// const certificate = fs.readFileSync(path.join(__dirname, 'cert.pem'), 'utf8');

// const credentials = { key: privateKey, cert: certificate };

// https.createServer(credentials, app)
app.listen(3000, ()=> {
  console.log('App listening on port 3000!')
})
