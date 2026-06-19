/**
 * Agnes API 助手 — 带 Key Pool 自动轮换
 * 
 * 9个Key自动轮换，一个被rate limit自动换下一个，60秒后重试
 * Key来源: E:\ai\vedio_maker\config.local.json
 * API文档: https://agnes-ai.com/doc/overview
 */

const fs = require('fs');

// 加载Key Pool（处理BOM）
function loadKeys() {
  var p = "E:\\ai\\vedio_maker\\config.local.json";
  try {
    var r = fs.readFileSync(p, 'utf-8').replace(/^\uFEFF/, '');
    return JSON.parse(r).agnes_keys;
  } catch(e) {
    return ["sk-db07gmZSZPzURVjUFxhlxKHkELSXbFVXkuXHOQ3SkwM2u4n4"];
  }
}

var keyIndex = 0;
var keyPool = loadKeys();
var failedKeys = {};

function getNextKey() {
  var now = Date.now();
  for (var i = 0; i < keyPool.length; i++) {
    var idx = keyIndex % keyPool.length;
    keyIndex++;
    var k = keyPool[idx];
    if (failedKeys[k] && (now - failedKeys[k]) < 60000) continue;
    return k;
  }
  failedKeys = {};
  return keyPool[0];
}

var ENDPOINT = 'https://apihub.agnes-ai.com/v1/chat/completions';

async function agnesChat(prompt, systemPrompt, options) {
  options = options || {};
  var messages = [];
  if (systemPrompt) messages.push({role:"system", content:systemPrompt});
  messages.push({role:"user", content:prompt});
  var body = {
    model: "agnes-2.0-flash",
    messages: messages,
    temperature: options.temperature || 0.7,
    max_tokens: options.max_tokens || 4096,
  };
  if (options.response_format === "json") body.response_format = {type:"json_object"};
  var apiKey = getNextKey();
  try {
    var resp = await fetch(ENDPOINT, {
      method:"POST",
      headers:{"Authorization":"Bearer "+apiKey, "Content-Type":"application/json"},
      body: JSON.stringify(body)
    });
    var data = await resp.json();
    if (data.error) throw new Error(data.error.message);
    return data.choices[0].message.content;
  } catch(e) {
    failedKeys[apiKey] = Date.now();
    throw e;
  }
}

async function agnesBatch(prompts, delayMs) {
  delayMs = delayMs || 1000;
  var results = [];
  for (var i = 0; i < prompts.length; i++) {
    var p = prompts[i];
    var r = await agnesChat(p.prompt, p.systemPrompt, p.options);
    results.push(r);
    if (i < prompts.length - 1) await new Promise(function(r2) { setTimeout(r2, delayMs); });
  }
  return results;
}

async function formatToolsJson(rawData) {
  var result = await agnesChat(
    "将以下工具数据格式化为标准JSON数组:\\n"+rawData,
    "只输出合法JSON，不要markdown包裹",
    {response_format:"json", temperature:0.3}
  );
  return JSON.parse(result);
}


/**
 * 验证 Agnes 输出的JSON数据质量
 * @param {string} jsonStr - Agnes输出的JSON字符串
 * @param {object} schema - 验证规则 {requiredFields, minCount}
 * @returns {{pass: boolean, errors: string[]}}
 */
function validateJson(jsonStr, schema) {
  var errors = [];
  schema = schema || {};
  try {
    var data = JSON.parse(jsonStr);
    var arr = Array.isArray(data) ? data : [data];
    
    // 检查数量
    if (schema.minCount && arr.length < schema.minCount) {
      errors.push("数量不足: 需要"+schema.minCount+"条, 实际"+arr.length+"条");
    }
    
    // 检查必填字段
    var fields = schema.requiredFields || ['id','name','url'];
    for (var i = 0; i < arr.length; i++) {
      for (var f = 0; f < fields.length; f++) {
        if (!arr[i][fields[f]]) {
          errors.push("第"+(i+1)+"条缺字段: "+fields[f]);
        }
      }
    }
    
    return {pass: errors.length === 0, errors: errors};
  } catch(e) {
    return {pass: false, errors: ["JSON解析失败: "+e.message]};
  }
}

module.exports = { agnesChat: agnesChat, agnesBatch: agnesBatch, formatToolsJson: formatToolsJson, validateJson: validateJson, keyCount: keyPool.length };

// 自测: node -e "require('./agnes_helper.js').agnesChat('只回复OK').then(console.log)"