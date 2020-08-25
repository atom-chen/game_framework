# -*- coding: utf-8 -*-
import os
import sys
import re
import io
import shutil
import string
import hashlib
import subprocess
import getopt
import json
import os.path
import xlrd

def calc_file_md5(filename):
    m = hashlib.md5()
    a_file = open(filename, 'rb')
    m.update(a_file.read())
    a_file.close()
    return m.hexdigest()

#拷贝文件的函数
def copy_src_to_dest(src_dir, dest_dir):
	files = os.listdir(src_dir)
	for file in files:
		src_file = src_dir + file
		md5_src = calc_file_md5(src_file)
		dest_file = dest_dir + file
		if os.path.isfile(dest_file):
			md5_dest = calc_file_md5(dest_file)
			if md5_src != md5_dest:
				shutil.copy(src_file, dest_file)
		else:
			shutil.copy(src_file, dest_file)

#简单的json字符串文本配置处理
def procJsonStr(strJson):
    if strJson[0:2] != "[{":
        return strJson
    nStrJsonLen = len(strJson)
    strJsonTemp=""
    nStateWord = 0 #字符串简单的状态解析 0 表示未进入单词 1表示 进入单词
    bIsalpha = False;
    for i in range(0,nStrJsonLen):
        if nStateWord == 0:
            bStateWord = strJson[i].isalpha()
            if bStateWord:
                nStateWord=1
                strJsonTemp+='"'
            strJsonTemp += strJson[i]
            continue
        if nStateWord == 1:
           bStateWord = strJson[i].isalpha()
           if not bStateWord:
               nStateWord=0
               strJsonTemp+='"'
           strJsonTemp += strJson[i]
           continue
    return strJsonTemp
    

#创建相关的文件目录
jsondir = './JSON'

if os.path.exists(jsondir):
    shutil.rmtree(jsondir)		
if not os.path.exists(jsondir):
    os.makedirs(jsondir)

srcConfig = '../laya/assets/resource/assets/config'
if not os.path.exists(srcConfig):
    print("Create src config!")
    os.makedirs(srcConfig)
binConfig = '../bin/resource/assets/config'
if not os.path.exists(binConfig):
    print("Create bin config!")
    os.makedirs(binConfig)

path = os.getcwd()
#print(path)
list_dir = os.listdir(path)
bIntFlag = False;
#print(listdir)
for xlsName in list_dir:
    aryData=xlsName.split(".")
    #print(aryData)
    nLen=len(aryData)
    if(nLen==2):
        if aryData[1] == "xls" or aryData[1] == "xlsx":
            print(xlsName)
            #打开excel
            stData = xlrd.open_workbook("./" + xlsName)
            #获取Sheet1的数据
            tableSheet=stData.sheet_by_name('Sheet1')
            #获取行
            nRow=tableSheet.nrows
            #获取列
            nCol=tableSheet.ncols
            #数据定义
            dataname = []   #变量名
            datatype = []   #变量类型
            csvDataList=[]  #当前表的数据
            #循环读取
            for nIndexRow in range(0,nRow):
                #当前行的数据
                csvDataInfo=[]
                csvDataIndex = {}  #当前行的数据
                for nIndexCol in range(0,nCol):
                    bIntFlag = False
                    #数据转换
                    cell = tableSheet.cell(nIndexRow,nIndexCol)
                    cell_value = cell.value
                    if cell.ctype in (2,3) and int(cell_value) == cell_value:
                        cell_value = int(cell_value)
                        bIntFlag = True
                        #cell_value = str(cell_value)
                    strValue   = str(cell_value)    
                    #获取值
                    #strValue=tableSheet.cell_value(nIndexRow,nIndexCol)
                    print(strValue)
                    #strValue=str(strValue)
                    strValue=strValue.replace(" ", "")
                    #strValue=strValue.strip(" ")
                    #变量名
                    if nIndexRow==1:
                        dataname.append(strValue)
                        print(dataname)
                        continue
                    #变量类型
                    if nIndexRow==2:
                        datatype.append(strValue)
                        print(datatype)
                        continue
                    if nIndexRow == 0: #前3行跳过
                        continue

                    
                    
                    if datatype[nIndexCol] == "number":
                        #numdata = 0
                        #numdata = int(tableSheet.cell(nIndexRow,nIndexCol))
                        #cell = tableSheet.cell(nIndexRow,nIndexCol)
                       # cell_value = cell.value
                        #if cell.ctype in (2,3) and int(cell_value) == cell_value:
                        #    cell_value = int(cell_value)
                        numdata = 0;
                        if bIntFlag:
                            numdata=int(strValue)
                        else:
                            if strValue != "":
                                numdata=float(strValue)
                            
                        csvDataIndex[dataname[nIndexCol]]=numdata
                    else:
                        #是否是json数组字符串 简单地特殊处理
                        if strValue[0:2] == "[{":
                            strValue=procJsonStr(strValue)
                            print(strValue)
                            strValue=json.loads(strValue)
                        elif strValue[0:1] == "[":
                            strValue=json.loads(strValue)
                        csvDataIndex[dataname[nIndexCol]] = strValue
                if nIndexRow >= 3: 
                    csvDataList.append(csvDataIndex)
            jsondata = json.dumps(csvDataList,ensure_ascii=False)
            #生成文件名
            jsonfilename = aryData[0] + ".json"
            jsonfilename = jsondir + "/" + jsonfilename
            print(jsonfilename)
            #写入文件中
            fo = open(jsonfilename, "wb")
            fo.write(jsondata.encode('utf-8'))
            fo.close()
copy_src_to_dest("./JSON/", "../laya/assets/resource/assets/config/")
copy_src_to_dest("./JSON/", "../bin/resource/assets/config/")
input('Press any key to continue...')

                    
        
