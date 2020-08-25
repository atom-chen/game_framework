/***
 * 
 * 需要注意事项 
 * 1.其中关于文件夹结构需要注意在工具其子文件夹 excel 内存放xlsx 或是 xls文件
 * 2.其中表结构需要注意 excel 文件需要遵循规则 第一行简述 第二行标识键 第三行标识值的类型 第四行以后才表述填写的值
 * 3.其中支持的类型为 
 *     数值 number  
 *     字符串 string 
 *     布尔类型 boolean 
 *     数值数组 number[] 
 *     字符串数组 string[] 
 *     布尔数组 boolean[]
 * 
 * 
 */
console.log(
    "/* \n" +
    " * 需要注意事项 \n" +
    " * 1.其中关于文件夹结构需要注意在工具其子文件夹 excel 内存放xlsx 或是 xls文件 \n" +
    " *   其中关于 json 文件夹内是转换的json文件\n" +
    " * 2.其中表结构需要注意 excel 文件需要遵循规则 第一行简述 第二行标识键 第三行标识值的类型 第四行以后才表述填写的值\n" +
    " * 3.其中支持的类型为 \n" +
    " *     数值 number  \n" +
    " *     字符串 string \n" +
    " *     布尔类型 boolean \n" +
    " *     数值数组 number[] \n" +
    " *     字符串数组 string[] \n" +
    " *     布尔数组 boolean[]\n" +
    " * 4.如果报错没有关于模块内容 node-xlsx 请输入命令注册模块 npm install node-xlsx\n" +
    " * 5.如果报错没有关于模块内容 fs 请输入命令注册模块 npm install fs\n" +
    " * 6.如果报错没有关于模块内容 path 请输入命令注册模块 npm install path\n" +
    " */\n"
);

var xlsx = require('node-xlsx');
var fs = require('fs');
var path = require("path");


// console.log(__dirname);
var dir = __dirname;


/**
 * 类型转换
 */
var typeOfChange = function (type, value) {
    switch (type) {
        case "number":
            value = Number(value);
            break
        case "boolean":
            value = Boolean(value);
            break
        case "number[]":
            if (value == "[]") {
                value = [];
            } else {
                let rValue = [];
                let numStr = value.substr(1, value.length - 2);
                let numStrArr = numStr.split(",");
                for (let i = 0, len = numStrArr.length; i < len; i++) {
                    rValue.push(Number(numStrArr[i]));
                }
                value = rValue;
            }
            break
        case "string[]":
            if (value == "[]") {
                value = [];
            } else {
                let rValue = [];
                let numStr = value.substr(1, value.length - 2);
                let numStrArr = numStr.split(",");
                for (let i = 0, len = numStrArr.length; i < len; i++) {
                    let strValue = numStrArr[i];
                    strValue = strValue.substr(1, strValue.length - 2);
                    rValue.push(strValue);
                }
                value = rValue;
                // console.log(value);
            }
            break
        case "boolean[]":
            if (value == "[]") {
                value = [];
            } else {
                let rValue = [];
                let numStr = value.substr(1, value.length - 2);
                let numStrArr = numStr.split(",");
                for (let i = 0, len = numStrArr.length; i < len; i++) {
                    rValue.push(Boolean(numStrArr[i]));
                }
                value = rValue;
            }
            break
    }
    return value;
}

/**
 * 创建一个对象关于一组数据及其键值
 */
var createOneObj = function (keyArr, typeArr, data) {
    let obj = {};
    for (let i = 0, len = keyArr.length; i < len; i++) {
        let value = "null";
        if (i < data.length && data[i] != null) {
            value = data[i];
        }
        value = typeOfChange(typeArr[i], value);
        // console.log(keyArr[i]);
        obj[keyArr[i] + ""] = value;
    }
    // console.log(JSON.stringify(obj));
    return obj;
}

/**
 * 移除文件
 */
async function removeFile(filepath) {
    return new Promise((resolve) => {
        fs.unlink(filepath, function (err) {
            if (err) {
                throw err;
            }
            console.log('文件:' + filepath + '删除成功！');
            resolve();
        });
    });
}

/**
 * 写入文件
 */
async function writeFile(fileName, dataStr) {
    fs.writeFile(fileName, dataStr, { 'flag': 'w' }, function (err) {
        if (err) {
            throw err;
        }
        // console.log('写文件完成!');
    });
}

/**
 * 校验对象值
 */
var checkObjValue = function (obj) {
    // console.log("checkObjValue-->", JSON.stringify(obj));
    for (let key in obj) {
        // console.log("-->", key);
        if (obj[key] && obj[key] != "null") {//判断只要有个是有参数
            return true;
        }
    }
    return false;
}

/**
 * 将sheet 表写入json
 */
var writeJsonBySheetData = function (sheetName, data) {
    if (data.length < 4) {
        console.warn("excel 文件需要遵循规则 第一行简述 第二行标识键 第三行标识值的类型 第四行以后才表述填写的值");
        return
    }
    let keyArr = data[1];
    let jsonObjs = [];
    for (let i = 3, len = data.length; i < len; i++) {
        let objItem = createOneObj(keyArr, data[2], data[i]);
        if (checkObjValue(objItem)) {
            jsonObjs.push(objItem);
        }
    }
    // console.log(JSON.stringify(jsonObjs));
    console.log("写入文件 " + sheetName + ".json");
    writeFile("./json/" + sheetName + ".json", JSON.stringify(jsonObjs));
}

/**
 * 读取一个表内容
 */
var readSheetData = function (fileName, sheetData) {
    if (sheetData.data.length > 0) {
        let strJsonFileName = "";
        // console.log(sheetData.name.toLocaleLowerCase());
        if (sheetData.name.toLocaleLowerCase().indexOf("sheet") > -1) {//如果没有命名子表名称 则用文件名称
            if (fileName.lastIndexOf("xlsx") == fileName.length - 4) {
                strJsonFileName = fileName.substr(0, fileName.length - 5);
            } else {
                // fileName.lastIndexOf("xls") == fileName.length - 3
                strJsonFileName = fileName.substr(0, fileName.length - 4);
            }
        } else {
            strJsonFileName = sheetData.name;
        }
        writeJsonBySheetData(strJsonFileName, sheetData.data);
    }
}

/**
 * 读取一个excel文件
 */
var readOneExcelFil = function (pathName, fileName) {
    // 读xlsx
    var obj = xlsx.parse(pathName + "\\" + fileName);
    // console.log(obj);
    for (let i = 0, len = obj.length; i < len; i++) {
        readSheetData(fileName, obj[i]);
    }
}

/**
 * 开始转换
 */
var runExcel2Json = function (filepath) {
    fs.readdir(filepath, function (err, files) {
        if (err) {
            console.log(filepath + " 不存在!!!");
            return
        }
        var dirs = [];
        for (let i = 0, len = files.length; i < len; i++) {
            var tempStr = files[i];
            if (tempStr.indexOf("~$") == -1 &&
                (tempStr.lastIndexOf("xlsx") == tempStr.length - 4
                    ||
                    tempStr.lastIndexOf("xls") == tempStr.length - 3
                )) {
                console.log("转换文件 " + tempStr);
                readOneExcelFil(filepath, tempStr);
            }
        }
    });
}

fs.readdir("./json", function (err, files) {
    if (err) {
        fs.mkdir("./json", function (err) {
            if (err) {
                throw err;
            }
            runExcel2Json(dir + "\\excel");
        });
        return
    } else {
        runExcel2Json(dir + "\\excel");
    }
});

// runExcel2Json(dir + "\\excel");



// console.log(JSON.stringify(obj));