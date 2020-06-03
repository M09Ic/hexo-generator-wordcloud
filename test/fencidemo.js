var Segment = require('segment');
var fs = require("fs");
// 创建实例
var text = fs.readFileSync("D:\\Programing\\nodejs\\hexo-wordcloud\\1.md",{encoding:'utf-8'});
const whitep = [0x00000008,0x40000000,0x00100000,0x20000000,16]

function fenci(text) {
    var segment = new Segment();
    // 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
    segment.useDefault();

    var result = segment.doSegment(text, {
    stripPunctuation: true,
    stripStopword: true
    });
    return result
}
function counttimes(data) {
    var k ={};
    data.forEach(word => {
        if (word["p"]==[16]) word["p"] = Number(word["p"])
        if (whitep.indexOf(word["p"]) != -1){
            if (!k.hasOwnProperty(word["w"])) k[word["w"]] = 1;
            else k[word["w"]] ++;
        }
    });
    return k
}

function getformatres(data){
    data = fenci(data);
    data = counttimes(data);
    res = [];
    for (const key in data) {
        var k = {};
        k["name"] = key;
        k["value"] = data[key];
        res.push(k);
    }
    return res;
}






