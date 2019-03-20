var textStyle = {
    rich: {
        a: {
            color: 'green',
            fontWeight: 600,
            fontSize: 16,
            lineHeight: 10
        },
        b: {
            color: 'red',
            fontWeight: 600,
            fontSize: 16,
            lineHeight: 10
        },
        c: {
            lineHeight: 16,
            fontSize: 12,
            color: '#151718'
        }
    }
};



var textStyle1 = {
    rich: {
        a: {
            color: 'green',
            fontSize: 16,
            lineHeight: 20
        },
        b: {
            color: 'red',
            fontSize: 16,
            lineHeight: 20
        },
        c: {
            fontWeight: 500,
            lineHeight: 24,
            fontSize: 20,
            color: '#151718'
        },
        d: {
            color: 'black',
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 20
        }
    }
};

function registered(aData, data) {
    var dom = document.getElementById(aData.name);
    var myChart = echarts.init(dom, 'dark');
    var option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            //top: '20',
            data: [{
                    name: '昨日导流人数'
                },
                {
                    name: '   市场渠道\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   三体渠道\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   定制化渠道\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   老拉新\n\n   ' + fprice(aData[data.v][3][0], 0) + '人' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   其他\n\n   ' + fprice(aData[data.v][4][0], 0) + '人' + (aData[data.v][4][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][4][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   累计导流人数\n\n   ' + fprice(aData[data.v][5][0], 0) + '人' + (aData[data.v][5][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][5][2], 2) + '%',
                    icon: 'image://',
                    textStyle: textStyle
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.map((item, i) => {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '人</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '昨日导流人数',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   市场渠道\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[1]
            },
            {
                name: '   三体渠道\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[2]
            },
            {
                name: '   定制化渠道\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[3]
            },
            {
                name: '   老拉新\n\n   ' + fprice(aData[data.v][3][0], 0) + '人' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[4]
            },
            {
                name: '   其他\n\n   ' + fprice(aData[data.v][4][0], 0) + '人' + (aData[data.v][4][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][4][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[5]
            },
            {
                name: '   累计导流人数\n\n   ' + fprice(aData[data.v][5][0], 0) + '人' + (aData[data.v][5][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][5][2], 2) + '%',
                type: 'bar',
                yAxisIndex: 0,
                stack: '0',
                data: null
            }
        ]
    };

    getDataAgain(data, myChart1, option);

    if (option && typeof option === "object") {
        myChart1.setOption(option, true);
    }
}



function chartCustomizedOpenCard(aData, data) {

    var dom = document.getElementById("customizedOpenCard");
    myChart2 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            //top: '20'
            data: [{
                    name: '昨日导流人数'
                },
                {
                    name: '   360借款导航\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   融360\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   卡牛\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   其他\n\n   ' + fprice(aData[data.v][3][0], 0) + '人' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   累计导流人数\n\n   ' + fprice(aData[data.v][4][0], 0) + '人' + (aData[data.v][4][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][4][2], 2) + '%',
                    icon: 'image://',
                    textStyle: textStyle
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.map((item, i) => {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '人</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '昨日导流人数',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   360借款导航\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[1]
            },
            {
                name: '   融360\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[2]
            },
            {
                name: '   卡牛\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[3]
            },
            {
                name: '   其他\n\n   ' + fprice(aData[data.v][3][0], 0) + '人' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[4]
            },
            {
                name: '   累计导流人数\n\n   ' + fprice(aData[data.v][4][0], 0) + '人' + (aData[data.v][4][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][4][2], 2) + '%',
                type: 'bar',
                yAxisIndex: 0,
                stack: '0',
                data: null
            }
        ]
    };

    getDataAgain(data, myChart2, option);

    if (option && typeof option === "object") {
        myChart2.setOption(option, true);
    }
}

function chartCustomizedSub(aData, data) {

    var dom = document.getElementById("customizedSub");
    myChart3 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            //top: '20'
            data: [{
                    name: '昨日提交信审人数'
                },
                {
                    name: '   自动审核拒绝人数\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   自动审核通过人数\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交人工人数\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交信审人数\n\n   ' + fprice(aData[data.v][3][0], 0) + '人' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                    icon: 'image://',
                    textStyle: textStyle
                },
                {
                    name: '   当日自动审核拒绝率\n\n   ' + fprice(aData[data.v][4][0], 2) + '%' + (aData[data.v][4][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][4][2], 2) + '%',
                    icon: 'image://',
                    textStyle: textStyle
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '人</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '昨日提交信审人数',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   自动审核拒绝人数\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[1]
            },
            {
                name: '   自动审核通过人数\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[2]
            },
            {
                name: '   提交人工人数\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[3]
            },
            {
                name: '   提交信审人数\n\n   ' + fprice(aData[data.v][3][0], 0) + '人' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: null
            },
            {
                name: '   当日自动审核拒绝率\n\n   ' + fprice(aData[data.v][4][0], 2) + '%' + (aData[data.v][4][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][4][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: null
            }
        ]
    };

    getDataAgain(data, myChart3, option);

    if (option && typeof option === "object") {
        myChart3.setOption(option, true);
    }
}


function chartCustomizedInc(aData, data) {

    var dom = document.getElementById("customizedInc");
    myChart4 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            //top: '20'
            data: [{
                    name: '昨日累积进件单数'
                },
                {
                    name: '   取现金进件单数\n\n   ' + fprice(aData[data.v][0][0], 0) + '单' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle

                },
                {
                    name: '   万卡商城进件单数\n\n   ' + fprice(aData[data.v][1][0], 0) + '单' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   累计进件单数\n\n   ' + fprice(aData[data.v][2][0], 0) + '单' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    icon: 'image://',
                    textStyle: textStyle
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '单</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '昨日累积进件单数',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   取现金进件单数\n\n   ' + fprice(aData[data.v][0][0], 0) + '单' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[1]
            },
            {
                name: '   万卡商城进件单数\n\n   ' + fprice(aData[data.v][1][0], 0) + '单' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[3]
            },
            {
                name: '   累计进件单数\n\n   ' + fprice(aData[data.v][2][0], 0) + '单' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: null
            }
        ]
    };

    getDataAgain(data, myChart4, option);

    if (option && typeof option === "object") {
        myChart4.setOption(option, true);
    }
}

// 360借款导航
function chartCustom360Jie(aData, data) {

    var dom = document.getElementById("custom360Jie");
    myChart5_1 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        title: {
            text: '{c|' + '总转化率' + '}\n' + '{c|' + fprice(aData[data.v][0][0], 0) + '%}' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + '{c|' + fprice(aData[data.v][0][2], 2) + '%}',
            x: 'center',
            y: 'top',
            textStyle: textStyle
        },
        series: [{
                name: '漏斗图',
                type: 'funnel',
                left: '10%',
                width: '50%',
                top: "30%",
                height: "70%",
                minSize: '0%',
                maxSize: '60%',
                sort: 'none', // 'ascending', 'descending'
                gap: 3,
                itemStyle: {
                    normal: {
                        color: 'transparent',
                        borderWidth: 0
                    }
                },
                label: {
                    normal: {
                        show: true,
                        color: '#353535',
                        position: 'left',
                        formatter: function(params) {
                            var _index = params.dataIndex + 1;
                            for (let i = 0, j = aData[data.v].length; i < j; i++) {
                                if (_index == aData[data.v].length) {
                                    return ' '
                                } else if (_index == i) {
                                    return '{c|' + fprice(aData[data.v][(_index)][0], 0) + '%}' + (aData[data.v][_index][1] ? '{a|↑}' : '{b|↓}') + '{c|' + fprice(aData[data.v][_index][2], 2) + '%}'
                                }
                            }
                        },
                        textStyle: textStyle
                    },
                    emphasis: {
                        show: true,
                        position: 'left',
                        textStyle: {
                            fontSize: 16
                        }
                    }
                },
                labelLine: {
                    normal: {
                        length: 20,
                        position: 'left',
                        lineStyle: {
                            width: 0,
                            color: 'skyblue'
                        }
                    }
                },
                data: aData[0]
            },
            {
                name: '漏斗图1',
                type: 'funnel',
                left: '0%',
                width: '100%',
                top: "20%",
                height: "80%",
                minSize: '0%',
                maxSize: '60%',
                sort: 'none', // 'ascending', 'descending'
                gap: 3,

                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        textStyle: {
                            color: '#000'
                        },
                        formatter: function(params) {
                            return '{c|' + params.name + '}     ' + '{c|' + fprice(params.data.info[0], 0) + '人}' + (params.data.info[1] ? '{a|↑}' : '{b|↓}') + '{c|' + fprice(params.data.info[2], 2) + '%}'
                        },
                        textStyle: textStyle
                    },
                    emphasis: {
                        textStyle: {
                            fontSize: 20
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 0
                    }
                },
                data: aData[0]
            }
        ]
    };


    getDataAgain(data, myChart5_1, option);

    if (option && typeof option === "object") {
        myChart5_1.setOption(option, true);
    }
}

// 融360
function chartCustom360Rong(aData, data) {

    var dom = document.getElementById("custom360Rong");
    myChart5_2 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        title: {
            text: '{c|' + '总转化率' + '}\n' + '{c|' + fprice(aData[data.v][0][0], 0) + '%}' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + '{c|' + fprice(aData[data.v][0][2], 2) + '%}',
            x: 'center',
            y: 'top',
            textStyle: textStyle
        },
        series: [{
                name: '漏斗图',
                type: 'funnel',
                left: '10%',
                width: '50%',
                top: "30%",
                height: "70%",
                minSize: '0%',
                maxSize: '60%',
                sort: 'none', // 'ascending', 'descending'
                gap: 3,
                itemStyle: {
                    normal: {
                        color: 'transparent',
                        borderWidth: 0
                    }
                },
                label: {
                    normal: {
                        show: true,
                        color: '#353535',
                        position: 'left',
                        formatter: function(params) {
                            var _index = params.dataIndex + 1;
                            for (let i = 0, j = aData[data.v].length; i < j; i++) {
                                if (_index == aData[data.v].length) {
                                    return ' '
                                } else if (_index == i) {
                                    return '{c|' + fprice(aData[data.v][(_index)][0], 0) + '%}' + (aData[data.v][_index][1] ? '{a|↑}' : '{b|↓}') + '{c|' + fprice(aData[data.v][_index][2], 2) + '%}'
                                }
                            }
                        },
                        textStyle: textStyle
                    },
                    emphasis: {
                        show: true,
                        position: 'left',
                        textStyle: {
                            fontSize: 16
                        }
                    }
                },
                labelLine: {
                    normal: {
                        length: 20,
                        position: 'left',
                        lineStyle: {
                            width: 0,
                            color: 'skyblue'
                        }
                    }
                },
                data: aData[0]
            },
            {
                name: '漏斗图1',
                type: 'funnel',
                left: '0%',
                width: '100%',
                top: "20%",
                height: "80%",
                minSize: '0%',
                maxSize: '60%',
                sort: 'none', // 'ascending', 'descending'
                gap: 3,

                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        textStyle: {
                            color: '#000'
                        },
                        formatter: function(params) {
                            return '{c|' + params.name + '}     ' + '{c|' + fprice(params.data.info[0], 0) + '人}' + (params.data.info[1] ? '{a|↑}' : '{b|↓}') + '{c|' + fprice(params.data.info[2], 2) + '%}'
                        },
                        textStyle: textStyle
                    },
                    emphasis: {
                        textStyle: {
                            fontSize: 20
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 0
                    }
                },
                data: aData[0]
            }
        ]
    };

    getDataAgain(data, myChart5_2, option);

    if (option && typeof option === "object") {
        myChart5_2.setOption(option, true);
    }
}

// 卡牛
function chartCustomKaNiu(aData, data) {

    var dom = document.getElementById("customKaNiu");
    myChart5_3 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        title: {
            text: '{c|' + '总转化率' + '}\n' + '{c|' + fprice(aData[data.v][0][0], 0) + '%}' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + '{c|' + fprice(aData[data.v][0][2], 2) + '%}',
            x: 'center',
            y: 'top',
            textStyle: textStyle
        },
        series: [{
                name: '漏斗图',
                type: 'funnel',
                left: '10%',
                width: '50%',
                top: "30%",
                height: "70%",
                minSize: '0%',
                maxSize: '60%',
                sort: 'none', // 'ascending', 'descending'
                gap: 3,
                itemStyle: {
                    normal: {
                        color: 'transparent',
                        borderWidth: 0
                    }
                },
                label: {
                    normal: {
                        show: true,
                        color: '#353535',
                        position: 'left',
                        formatter: function(params) {
                            var _index = params.dataIndex + 1;
                            for (let i = 0, j = aData[data.v].length; i < j; i++) {
                                if (_index == aData[data.v].length) {
                                    return ' '
                                } else if (_index == i) {
                                    return '{c|' + fprice(aData[data.v][(_index)][0], 0) + '%}' + (aData[data.v][_index][1] ? '{a|↑}' : '{b|↓}') + '{c|' + fprice(aData[data.v][_index][2], 2) + '%}'
                                }
                            }
                        },
                        textStyle: textStyle
                    },
                    emphasis: {
                        show: true,
                        position: 'left',
                        textStyle: {
                            fontSize: 16
                        }
                    }
                },
                labelLine: {
                    normal: {
                        length: 20,
                        position: 'left',
                        lineStyle: {
                            width: 0,
                            color: 'skyblue'
                        }
                    }
                },
                data: aData[0]
            },
            {
                name: '漏斗图1',
                type: 'funnel',
                left: '0%',
                width: '100%',
                top: "20%",
                height: "80%",
                minSize: '0%',
                maxSize: '60%',
                sort: 'none', // 'ascending', 'descending'
                gap: 3,

                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        textStyle: {
                            color: '#000'
                        },
                        formatter: function(params) {
                            return '{c|' + params.name + '}     ' + '{c|' + fprice(params.data.info[0], 0) + '人}' + (params.data.info[1] ? '{a|↑}' : '{b|↓}') + '{c|' + fprice(params.data.info[2], 2) + '%}'
                        },
                        textStyle: textStyle
                    },
                    emphasis: {
                        textStyle: {
                            fontSize: 20
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 0
                    }
                },
                data: aData[0]
            }
        ]
    };

    getDataAgain(data, myChart5_3, option);

    if (option && typeof option === "object") {
        myChart5_3.setOption(option, true);
    }
}



//第二屏 数据接口为v4

function chartSanTiOpenCard(aData, data) {

    var dom = document.getElementById("sanTiOpenCard");
    myChart7 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            //top: '20',
            data: [{
                    name: '昨日开卡人数'
                },
                {
                    name: '   开卡人数\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '人</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '昨日开卡人数',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   开卡人数\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[1]
            }
        ]
    };

    getDataAgain(data, myChart7, option);

    if (option && typeof option === "object") {
        myChart7.setOption(option, true);
    }
}


function chartAuthJj(aData, data) {

    var dom = document.getElementById("authJj");
    myChart8 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            //top: '20',
            data: [{
                    name: '昨日授权成功人数'
                },
                {
                    name: '   授权成功人数\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   授权失败人数\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交人数\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle,
                    icon: 'image://'
                },
                {
                    name: '   当日授权成功率\n\n   ' + fprice(aData[data.v][3][0], 2) + '%' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                    textStyle: textStyle,
                    icon: 'image://'
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '人</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '昨日授权成功人数',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   授权成功人数\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[1]
            },
            {
                name: '   授权失败人数\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[2]
            },
            {
                name: '   提交人数\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: null
            },
            {
                name: '   当日授权成功率\n\n   ' + fprice(aData[data.v][3][0], 2) + '%' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: null
            }
        ]
    };

    getDataAgain(data, myChart8, option);

    if (option && typeof option === "object") {
        myChart8.setOption(option, true);
    }
}



function chartAuthYy(aData, data) {
    var dom = document.getElementById("authYy");
    myChart9 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            //top: '20',
            data: [{
                    name: '昨日授权成功人数'
                },
                {
                    name: '   授权成功人数\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   授权失败人数\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交人数\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle,
                    icon: 'image://'
                },
                {
                    name: '   当日授权成功率\n\n   ' + fprice(aData[data.v][3][0], 2) + '%' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                    textStyle: textStyle,
                    icon: 'image://'
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '人</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '昨日授权成功人数',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   授权成功人数\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[1]
            },
            {
                name: '   授权失败人数\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[2]
            },
            {
                name: '   提交人数\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: null
            },
            {
                name: '   当日授权成功率\n\n   ' + fprice(aData[data.v][3][0], 2) + '%' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: null
            }
        ]
    };

    getDataAgain(data, myChart9, option);

    if (option && typeof option === "object") {
        myChart9.setOption(option, true);
    }
}



function chartAuthXy(aData, data) {

    var dom = document.getElementById("authXy");
    myChart10 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            //top: '20',
            data: [{
                    name: '昨日授权成功人数'
                },
                {
                    name: '   授权成功人数\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   授权失败人数\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交人数\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle,
                    icon: 'image://'
                },
                {
                    name: '   当日授权成功率\n\n   ' + fprice(aData[data.v][3][0], 2) + '%' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                    textStyle: textStyle,
                    icon: 'image://'
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '人</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '昨日授权成功人数',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   授权成功人数\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[1]
            },
            {
                name: '   授权失败人数\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[2]
            },
            {
                name: '   提交人数\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: null
            },
            {
                name: '   当日授权成功率\n\n   ' + fprice(aData[data.v][3][0], 2) + '%' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: null
            }
        ]
    };

    getDataAgain(data, myChart10, option);

    if (option && typeof option === "object") {
        myChart10.setOption(option, true);
    }
}


function chartSubTrial(aData, data) {

    var dom = document.getElementById("subTrial");
    myChart11 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            //top: '20',
            data: [{
                    name: '昨日提交信审人数'
                },
                {
                    name: '   自动审核拒绝人数\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   自动审核通过人数\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交人工人数\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交信审人数\n\n   ' + fprice(aData[data.v][3][0], 0) + '人' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                    textStyle: textStyle,
                    icon: 'image://'
                },
                {
                    name: '   当日自动审核拒绝率\n\n   ' + fprice(aData[data.v][4][0], 2) + '%' + (aData[data.v][4][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][4][2], 2) + '%',
                    textStyle: textStyle,
                    icon: 'image://'
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '人</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '昨日提交信审人数',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   自动审核拒绝人数\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[1]
            },
            {
                name: '   自动审核通过人数\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[2]
            },
            {
                name: '   提交人工人数\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[3]
            },
            {
                name: '   提交信审人数\n\n   ' + fprice(aData[data.v][3][0], 0) + '人' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: null
            },
            {
                name: '   当日自动审核拒绝率\n\n   ' + fprice(aData[data.v][4][0], 2) + '%' + (aData[data.v][4][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][4][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: null
            }
        ]
    };

    getDataAgain(data, myChart11, option);

    if (option && typeof option === "object") {
        myChart11.setOption(option, true);
    }
}



function chartConRate(aData, data) {

    var dom = document.getElementById("conRate");
    myChart12 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            //top: '20',
            data: [{
                    name: '昨日进件单数'
                },
                {
                    name: '   取现金进件单数\n\n   ' + fprice(aData[data.v][0][0], 0) + '单' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle
                },
                {
                    name: '   万卡商城进件单数\n\n   ' + fprice(aData[data.v][1][0], 0) + '单' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle
                },
                {
                    name: '   累计进件单数\n\n   ' + fprice(aData[data.v][2][0], 0) + '单' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    icon: 'image://',
                    textStyle
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '单</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '昨日进件单数',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   取现金进件单数\n\n   ' + fprice(aData[data.v][0][0], 0) + '单' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[1]
            },
            {
                name: '   万卡商城进件单数\n\n   ' + fprice(aData[data.v][1][0], 0) + '单' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[2]
            },
            {
                name: '   累计进件单数\n\n   ' + fprice(aData[data.v][2][0], 0) + '单' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: null
            }
        ]
    };

    getDataAgain(data, myChart12, option);

    if (option && typeof option === "object") {
        myChart12.setOption(option, true);
    }
}

//第三屏 数据接口为

function chartShiChOpenCard(aData, data) {

    var dom = document.getElementById("shiChOpenCard");
    myChart13 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            //top: '20',
            data: [{
                    name: '昨日开卡人数'
                },
                {
                    name: '   市场开卡人数\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '人</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '昨日开卡人数',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   市场开卡人数\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[1]
            }
        ]
    };

    getDataAgain(data, myChart13, option);

    if (option && typeof option === "object") {
        myChart13.setOption(option, true);
    }
}


function chartShiChAuthJj(aData, data) {

    var dom = document.getElementById("shiChAuthJj");
    myChart14 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            //top: '20',
            data: [{
                    name: '昨日授权成功人数'
                },
                {
                    name: '   授权成功人数\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   授权失败人数\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交人数\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle,
                    icon: 'image://'
                },
                {
                    name: '   当日授权成功率\n\n   ' + fprice(aData[data.v][3][0], 2) + '%' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                    textStyle: textStyle,
                    icon: 'image://'
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '人</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '昨日授权成功人数',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   授权成功人数\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[1]
            },
            {
                name: '   授权失败人数\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[2]
            },
            {
                name: '   提交人数\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: null
            },
            {
                name: '   当日授权成功率\n\n   ' + fprice(aData[data.v][3][0], 2) + '%' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: null
            }
        ]
    };

    getDataAgain(data, myChart14, option);

    if (option && typeof option === "object") {
        myChart14.setOption(option, true);
    }
}



function chartShiChAuthYy(aData, data) {
    var dom = document.getElementById("shiChAuthYy");
    myChart15 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            //top: '20',
            data: [{
                    name: '昨日授权成功人数'
                },
                {
                    name: '   授权成功人数\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   授权失败人数\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交人数\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle,
                    icon: 'image://'
                },
                {
                    name: '   当日授权成功率\n\n   ' + fprice(aData[data.v][3][0], 2) + '%' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                    textStyle: textStyle,
                    icon: 'image://'
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '人</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '昨日授权成功人数',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   授权成功人数\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[1]
            },
            {
                name: '   授权失败人数\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[2]
            },
            {
                name: '   提交人数\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: null
            },
            {
                name: '   当日授权成功率\n\n   ' + fprice(aData[data.v][3][0], 2) + '%' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: null
            }
        ]
    };

    getDataAgain(data, myChart15, option);

    if (option && typeof option === "object") {
        myChart15.setOption(option, true);
    }
}



function chartShiChAuthXy(aData, data) {

    var dom = document.getElementById("shiChAuthXy");
    myChart16 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            //top: '20',
            data: [{
                    name: '昨日授权成功人数'
                },
                {
                    name: '   授权成功人数\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   授权失败人数\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交人数\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle,
                    icon: 'image://'
                },
                {
                    name: '   当日授权成功率\n\n   ' + fprice(aData[data.v][3][0], 2) + '%' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                    textStyle: textStyle,
                    icon: 'image://'
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '人</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '昨日授权成功人数',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   授权成功人数\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[1]
            },
            {
                name: '   授权失败人数\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[2]
            },
            {
                name: '   提交人数\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: null
            },
            {
                name: '   当日授权成功率\n\n   ' + fprice(aData[data.v][3][0], 2) + '%' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: null
            }
        ]
    };

    getDataAgain(data, myChart16, option);

    if (option && typeof option === "object") {
        myChart16.setOption(option, true);
    }
}


function chartShiChSubTrial(aData, data) {

    var dom = document.getElementById("shiChSubTrial");
    myChart17 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            //top: '20',
            data: [{
                    name: '昨日提交信审人数'
                },
                {
                    name: '   自动审核拒绝人数\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   自动审核通过人数\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交人工人数\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交信审人数\n\n   ' + fprice(aData[data.v][3][0], 0) + '人' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                    textStyle: textStyle,
                    icon: 'image://'
                },
                {
                    name: '   当日自动审核拒绝率\n\n   ' + fprice(aData[data.v][4][0], 2) + '%' + (aData[data.v][4][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][4][2], 2) + '%',
                    textStyle: textStyle,
                    icon: 'image://'
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '人</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '昨日提交信审人数',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   自动审核拒绝人数\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[1]
            },
            {
                name: '   自动审核通过人数\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[2]
            },
            {
                name: '   提交人工人数\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[3]
            },
            {
                name: '   提交信审人数\n\n   ' + fprice(aData[data.v][3][0], 0) + '人' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: null
            },
            {
                name: '   当日自动审核拒绝率\n\n   ' + fprice(aData[data.v][4][0], 2) + '%' + (aData[data.v][4][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][4][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: null
            }
        ]
    };

    getDataAgain(data, myChart17, option);

    if (option && typeof option === "object") {
        myChart17.setOption(option, true);
    }
}

function chartShiChConRate(aData, data) {

    var dom = document.getElementById("shiChConRate");
    myChart18 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            //top: '20',
            data: [{
                    name: '昨日进件单数'
                },
                {
                    name: '   取现金进件单数\n\n   ' + fprice(aData[data.v][0][0], 0) + '单' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle
                },
                {
                    name: '   万卡商城进件单数\n\n   ' + fprice(aData[data.v][1][0], 0) + '单' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle
                },
                {
                    name: '   累计进件单数\n\n   ' + fprice(aData[data.v][2][0], 0) + '单' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    icon: 'image://',
                    textStyle
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '单</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '昨日进件单数',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   取现金进件单数\n\n   ' + fprice(aData[data.v][0][0], 0) + '单' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[1]
            },
            {
                name: '   万卡商城进件单数\n\n   ' + fprice(aData[data.v][1][0], 0) + '单' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[2]
            },
            {
                name: '   累计进件单数\n\n   ' + fprice(aData[data.v][2][0], 0) + '单' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: null
            }
        ]
    };

    getDataAgain(data, myChart18, option);

    if (option && typeof option === "object") {
        myChart18.setOption(option, true);
    }
}


//第四屏 数据接口为
function chartFhyShiChToday(aData, data) {
    var dom = document.getElementById("fhyShiChToday");
    myChart19 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            data: [{
                    name: '   开卡-提交信审率\n\n   ' + fprice(aData[data.v][0][0], 0) + '%' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交信审-额度激活率\n\n   ' + fprice(aData[data.v][1][0], 0) + '%' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   额度激活-借贷率\n\n   ' + fprice(aData[data.v][2][0], 0) + '%' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '%</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                },
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '   开卡-提交信审率\n\n   ' + fprice(aData[data.v][0][0], 0) + '%' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   提交信审-额度激活率\n\n   ' + fprice(aData[data.v][1][0], 0) + '%' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'line',
                data: aData[1]
            },
            {
                name: '   额度激活-借贷率\n\n   ' + fprice(aData[data.v][2][0], 0) + '%' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'line',
                data: aData[2]
            }
        ]
    };

    getDataAgain(data, myChart19, option);

    if (option && typeof option === "object") {
        myChart19.setOption(option, true);
    }
}

function chartFhyShiChSeven(aData, data) {
    var dom = document.getElementById("fhyShiChSeven");
    myChart20 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            data: [{
                    name: '   开卡-提交信审率\n\n   ' + fprice(aData[data.v][0][0], 0) + '%' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交信审-额度激活率\n\n   ' + fprice(aData[data.v][1][0], 0) + '%' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   额度激活-借贷率\n\n   ' + fprice(aData[data.v][2][0], 0) + '%' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '%</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                },
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '   开卡-提交信审率\n\n   ' + fprice(aData[data.v][0][0], 0) + '%' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   提交信审-额度激活率\n\n   ' + fprice(aData[data.v][1][0], 0) + '%' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'line',
                data: aData[1]
            },
            {
                name: '   额度激活-借贷率\n\n   ' + fprice(aData[data.v][2][0], 0) + '%' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'line',
                data: aData[2]
            }
        ]
    };

    getDataAgain(data, myChart20, option);

    if (option && typeof option === "object") {
        myChart20.setOption(option, true);
    }
}

function chartFhySanTiToday(aData, data) {
    var dom = document.getElementById("fhySanTiToday");
    myChart21 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            data: [{
                    name: '   开卡-提交信审率\n\n   ' + fprice(aData[data.v][0][0], 0) + '%' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交信审-额度激活率\n\n   ' + fprice(aData[data.v][1][0], 0) + '%' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   额度激活-借贷率\n\n   ' + fprice(aData[data.v][2][0], 0) + '%' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '%</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                },
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '   开卡-提交信审率\n\n   ' + fprice(aData[data.v][0][0], 0) + '%' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   提交信审-额度激活率\n\n   ' + fprice(aData[data.v][1][0], 0) + '%' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'line',
                data: aData[1]
            },
            {
                name: '   额度激活-借贷率\n\n   ' + fprice(aData[data.v][2][0], 0) + '%' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'line',
                data: aData[2]
            }
        ]
    };

    getDataAgain(data, myChart21, option);

    if (option && typeof option === "object") {
        myChart21.setOption(option, true);
    }
}

function chartFhySanTiSeven(aData, data) {
    var dom = document.getElementById("fhySanTiSeven");
    myChart22 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            data: [{
                    name: '   开卡-提交信审率\n\n   ' + fprice(aData[data.v][0][0], 0) + '%' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交信审-额度激活率\n\n   ' + fprice(aData[data.v][1][0], 0) + '%' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   额度激活-借贷率\n\n   ' + fprice(aData[data.v][2][0], 0) + '%' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '%</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                },
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '   开卡-提交信审率\n\n   ' + fprice(aData[data.v][0][0], 0) + '%' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   提交信审-额度激活率\n\n   ' + fprice(aData[data.v][1][0], 0) + '%' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'line',
                data: aData[1]
            },
            {
                name: '   额度激活-借贷率\n\n   ' + fprice(aData[data.v][2][0], 0) + '%' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'line',
                data: aData[2]
            }
        ]
    };

    getDataAgain(data, myChart22, option);

    if (option && typeof option === "object") {
        myChart22.setOption(option, true);
    }
}

function chartFhyDingZhiToday(aData, data) {
    var dom = document.getElementById("fhyDingZhiToday");
    myChart23 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            data: [{
                    name: '   开卡-提交信审率\n\n   ' + fprice(aData[data.v][0][0], 0) + '%' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交信审-额度激活率\n\n   ' + fprice(aData[data.v][1][0], 0) + '%' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   额度激活-借贷率\n\n   ' + fprice(aData[data.v][2][0], 0) + '%' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '%</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                },
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '   开卡-提交信审率\n\n   ' + fprice(aData[data.v][0][0], 0) + '%' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   提交信审-额度激活率\n\n   ' + fprice(aData[data.v][1][0], 0) + '%' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'line',
                data: aData[1]
            },
            {
                name: '   额度激活-借贷率\n\n   ' + fprice(aData[data.v][2][0], 0) + '%' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'line',
                data: aData[2]
            }
        ]
    };

    getDataAgain(data, myChart23, option);

    if (option && typeof option === "object") {
        myChart23.setOption(option, true);
    }
}

function chartFhyDingZhiSeven(aData, data) {
    var dom = document.getElementById("fhyDingZhiSeven");
    myChart24 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            data: [{
                    name: '   开卡-提交信审率\n\n   ' + fprice(aData[data.v][0][0], 0) + '%' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交信审-额度激活率\n\n   ' + fprice(aData[data.v][1][0], 0) + '%' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   额度激活-借贷率\n\n   ' + fprice(aData[data.v][2][0], 0) + '%' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '%</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                },
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '   开卡-提交信审率\n\n   ' + fprice(aData[data.v][0][0], 0) + '%' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   提交信审-额度激活率\n\n   ' + fprice(aData[data.v][1][0], 0) + '%' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'line',
                data: aData[1]
            },
            {
                name: '   额度激活-借贷率\n\n   ' + fprice(aData[data.v][2][0], 0) + '%' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'line',
                data: aData[2]
            }
        ]
    };

    getDataAgain(data, myChart24, option);

    if (option && typeof option === "object") {
        myChart24.setOption(option, true);
    }
}
// 第五屏
function chartHyShiChToday(aData, data) {
    var dom = document.getElementById("hyShiChToday");
    myChart25 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            data: [{
                    name: '   开卡-提交信审率\n\n   ' + fprice(aData[data.v][0][0], 0) + '%' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交信审-额度激活率\n\n   ' + fprice(aData[data.v][1][0], 0) + '%' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   额度激活-借贷率\n\n   ' + fprice(aData[data.v][2][0], 0) + '%' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '%</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                },
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '   开卡-提交信审率\n\n   ' + fprice(aData[data.v][0][0], 0) + '%' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   提交信审-额度激活率\n\n   ' + fprice(aData[data.v][1][0], 0) + '%' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'line',
                data: aData[1]
            },
            {
                name: '   额度激活-借贷率\n\n   ' + fprice(aData[data.v][2][0], 0) + '%' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'line',
                data: aData[2]
            }
        ]
    };

    getDataAgain(data, myChart25, option);

    if (option && typeof option === "object") {
        myChart25.setOption(option, true);
    }
}

function chartHyShiChSeven(aData, data) {
    var dom = document.getElementById("hyShiChSeven");
    myChart26 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            data: [{
                    name: '   开卡-提交信审率\n\n   ' + fprice(aData[data.v][0][0], 0) + '%' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交信审-额度激活率\n\n   ' + fprice(aData[data.v][1][0], 0) + '%' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   额度激活-借贷率\n\n   ' + fprice(aData[data.v][2][0], 0) + '%' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '%</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                },
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '   开卡-提交信审率\n\n   ' + fprice(aData[data.v][0][0], 0) + '%' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   提交信审-额度激活率\n\n   ' + fprice(aData[data.v][1][0], 0) + '%' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'line',
                data: aData[1]
            },
            {
                name: '   额度激活-借贷率\n\n   ' + fprice(aData[data.v][2][0], 0) + '%' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'line',
                data: aData[2]
            }
        ]
    };

    getDataAgain(data, myChart26, option);

    if (option && typeof option === "object") {
        myChart26.setOption(option, true);
    }
}

function chartHySanTiToday(aData, data) {
    var dom = document.getElementById("hySanTiToday");
    myChart27 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            data: [{
                    name: '   开卡-提交信审率\n\n   ' + fprice(aData[data.v][0][0], 0) + '%' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交信审-额度激活率\n\n   ' + fprice(aData[data.v][1][0], 0) + '%' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   额度激活-借贷率\n\n   ' + fprice(aData[data.v][2][0], 0) + '%' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '%</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                },
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '   开卡-提交信审率\n\n   ' + fprice(aData[data.v][0][0], 0) + '%' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   提交信审-额度激活率\n\n   ' + fprice(aData[data.v][1][0], 0) + '%' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'line',
                data: aData[1]
            },
            {
                name: '   额度激活-借贷率\n\n   ' + fprice(aData[data.v][2][0], 0) + '%' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'line',
                data: aData[2]
            }
        ]
    };

    getDataAgain(data, myChart27, option);

    if (option && typeof option === "object") {
        myChart27.setOption(option, true);
    }
}

function chartHySanTiSeven(aData, data) {
    var dom = document.getElementById("hySanTiSeven");
    myChart28 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            data: [{
                    name: '   开卡-提交信审率\n\n   ' + fprice(aData[data.v][0][0], 0) + '%' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交信审-额度激活率\n\n   ' + fprice(aData[data.v][1][0], 0) + '%' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   额度激活-借贷率\n\n   ' + fprice(aData[data.v][2][0], 0) + '%' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '%</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                },
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '   开卡-提交信审率\n\n   ' + fprice(aData[data.v][0][0], 0) + '%' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   提交信审-额度激活率\n\n   ' + fprice(aData[data.v][1][0], 0) + '%' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'line',
                data: aData[1]
            },
            {
                name: '   额度激活-借贷率\n\n   ' + fprice(aData[data.v][2][0], 0) + '%' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'line',
                data: aData[2]
            }
        ]
    };

    getDataAgain(data, myChart28, option);

    if (option && typeof option === "object") {
        myChart28.setOption(option, true);
    }
}

function chartHyDingZhiToday(aData, data) {
    var dom = document.getElementById("hyDingZhiToday");
    myChart29 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            data: [{
                    name: '   开卡-提交信审率\n\n   ' + fprice(aData[data.v][0][0], 0) + '%' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交信审-额度激活率\n\n   ' + fprice(aData[data.v][1][0], 0) + '%' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   额度激活-借贷率\n\n   ' + fprice(aData[data.v][2][0], 0) + '%' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '%</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                },
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '   开卡-提交信审率\n\n   ' + fprice(aData[data.v][0][0], 0) + '%' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   提交信审-额度激活率\n\n   ' + fprice(aData[data.v][1][0], 0) + '%' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'line',
                data: aData[1]
            },
            {
                name: '   额度激活-借贷率\n\n   ' + fprice(aData[data.v][2][0], 0) + '%' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'line',
                data: aData[2]
            }
        ]
    };

    getDataAgain(data, myChart29, option);

    if (option && typeof option === "object") {
        myChart29.setOption(option, true);
    }
}

function chartHyDingZhiSeven(aData, data) {
    var dom = document.getElementById("hyDingZhiSeven");
    myChart30 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            data: [{
                    name: '   开卡-提交信审率\n\n   ' + fprice(aData[data.v][0][0], 0) + '%' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交信审-额度激活率\n\n   ' + fprice(aData[data.v][1][0], 0) + '%' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   额度激活-借贷率\n\n   ' + fprice(aData[data.v][2][0], 0) + '%' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '%</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                },
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '   开卡-提交信审率\n\n   ' + fprice(aData[data.v][0][0], 0) + '%' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   提交信审-额度激活率\n\n   ' + fprice(aData[data.v][1][0], 0) + '%' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'line',
                data: aData[1]
            },
            {
                name: '   额度激活-借贷率\n\n   ' + fprice(aData[data.v][2][0], 0) + '%' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'line',
                data: aData[2]
            }
        ]
    };

    getDataAgain(data, myChart30, option);

    if (option && typeof option === "object") {
        myChart30.setOption(option, true);
    }
}

// 最后一屏
function chartSantiKey(aData, data) {
    var dom = document.getElementById("santiKey");
    myChart0 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            top: '80',
            data: [{
                    name: '   速贷之家\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   信用管家\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   饿了么\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   闪贷\n\n   ' + fprice(aData[data.v][3][0], 0) + '人' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   360贷款导航\n\n   ' + fprice(aData[data.v][4][0], 0) + '人' + (aData[data.v][4][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][4][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   菠萝贷款\n\n   ' + fprice(aData[data.v][5][0], 0) + '人' + (aData[data.v][5][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][5][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   借点钱\n\n   ' + fprice(aData[data.v][6][0], 0) + '人' + (aData[data.v][6][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][6][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   满潭\n\n   ' + fprice(aData[data.v][7][0], 0) + '人' + (aData[data.v][7][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][7][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   挖财\n\n   ' + fprice(aData[data.v][8][0], 0) + '人' + (aData[data.v][8][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][8][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   任性贷\n\n   ' + fprice(aData[data.v][9][0], 0) + '人' + (aData[data.v][9][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][9][2], 2) + '%',
                    textStyle: textStyle
                }
            ]
        },
        grid: {
            left: '140',
            right: '140',
            top: '160',
            bottom: '140',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '人</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '   速贷之家\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   信用管家\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'line',
                data: aData[1]
            },
            {
                name: '   饿了么\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'line',
                data: aData[2]
            },
            {
                name: '   闪贷\n\n   ' + fprice(aData[data.v][3][0], 0) + '人' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                type: 'line',
                data: aData[3]
            },
            {
                name: '   360贷款导航\n\n   ' + fprice(aData[data.v][4][0], 0) + '人' + (aData[data.v][4][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][4][2], 2) + '%',
                type: 'line',
                data: aData[4]
            },
            {
                name: '   菠萝贷款\n\n   ' + fprice(aData[data.v][5][0], 0) + '人' + (aData[data.v][5][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][5][2], 2) + '%',
                type: 'line',
                data: aData[5]
            },
            {
                name: '   借点钱\n\n   ' + fprice(aData[data.v][6][0], 0) + '人' + (aData[data.v][6][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][6][2], 2) + '%',
                type: 'line',
                data: aData[6]
            },
            {
                name: '   满潭\n\n   ' + fprice(aData[data.v][7][0], 0) + '人' + (aData[data.v][7][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][7][2], 2) + '%',
                type: 'line',
                data: aData[7]
            },
            {
                name: '   挖财\n\n   ' + fprice(aData[data.v][8][0], 0) + '人' + (aData[data.v][8][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][8][2], 2) + '%',
                type: 'line',
                data: aData[8]
            },
            {
                name: '   任性贷\n\n   ' + fprice(aData[data.v][9][0], 0) + '人' + (aData[data.v][9][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][9][2], 2) + '%',
                type: 'line',
                data: aData[9]
            }
        ]
    };

    getDataAgain(data, myChart0, option);

    if (option && typeof option === "object") {
        myChart0.setOption(option, true);
    }
}


//20180925新加
// 市场渠道 整体转化率
function chartScChannel(aData, data) {
    for (let i = 0; i < aData[0].length; i++) {
        aData[0][i].value = aData[0][i].info[0];
    }
    var dom = document.getElementById("scChannel");
    myChart31 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        color: ['#73b9bc', '#7289ab', '#91ca8c', '#f49f42'],
        title: {
            text: '{c|' + '总转化率' + '}\n' + '{d|' + fprice(aData[1][0][0], 2) + '%}' + (aData[1][0][1] ? '{a|↑ ' + Math.abs(fprice(aData[1][0][2], 2)) + '%}' : '{b|↓' + Math.abs(fprice(aData[1][0][2], 2)) + '%}'),
            x: 'center',
            y: 'top',
            textStyle: textStyle1
        },
        series: [{
                name: '漏斗图',
                type: 'funnel',
                left: '10%',
                width: '50%',
                top: '20%',
                height: '80%',
                minSize: '0%',
                maxSize: '60%',
                sort: 'none', // 'ascending', 'descending'
                gap: 3,
                itemStyle: {
                    normal: {
                        color: 'transparent',
                        borderWidth: 0
                    }
                },
                label: {
                    normal: {
                        show: true,
                        color: '#353535',
                        position: 'left',
                        formatter: function(params) {
                            var _index = params.dataIndex + 1;
                            for (let i = 0, j = aData[1].length; i < j; i++) {
                                if (_index == aData[1].length) {
                                    return ' '
                                } else if (_index == i) {
                                    return '{c|' + fprice(aData[1][(_index)][0], 2) + '%}' + (aData[1][_index][1] ? '{a|↑' + Math.abs(fprice(aData[1][_index][2], 2)) + '%}' : '{b|↓' + Math.abs(fprice(aData[1][_index][2], 2)) + '%}');
                                }
                            }
                        },
                        textStyle: textStyle
                    },
                    emphasis: {
                        show: true,
                        position: 'left',
                        textStyle: {
                            fontSize: 16
                        }
                    }
                },
                labelLine: {
                    normal: {
                        length: 20,
                        position: 'left',
                        lineStyle: {
                            width: 0,
                            color: 'skyblue'
                        }
                    }
                },
                data: aData[1]
            },
            {
                name: '漏斗图1',
                type: 'funnel',
                left: '0%',
                width: '100%',
                top: '10%',
                height: '80%',
                minSize: '0%',
                maxSize: '60%',
                sort: 'none', // 'ascending', 'descending'
                gap: 3,
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        textStyle: {
                            color: '#000'
                        },
                        formatter: function(params) {
                            return '{c|' + params.name + '}     ' + '{c|' + fprice(params.data.info[0], 0) + '人}' + (params.data.info[1] ? '{a|↑' + fprice(params.data.info[2], 2) + '%}' : '{b|↓' + fprice(params.data.info[2], 2) + '%}');
                        },
                        textStyle: textStyle
                    },
                    emphasis: {
                        textStyle: {
                            fontSize: 20
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 0
                    }
                },
                data: aData[0]
            }
        ]
    };
    getDataAgain(data, myChart31, option);
    if (option && typeof option === "object") {
        myChart31.setOption(option, true);
    }
}

// 三体渠道 整体转化率
function chartStChannel(aData, data) {
    for (let i = 0; i < aData[0].length; i++) {
        aData[0][i].value = aData[0][i].info[0];
    }
    var dom = document.getElementById("stChannel");
    myChart32 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        color: ['#73b9bc', '#7289ab', '#91ca8c', '#f49f42'],
        title: {
            text: '{c|' + '总转化率' + '}\n' + '{d|' + fprice(aData[1][0][0], 2) + '%}' + (aData[1][0][1] ? '{a|↑ ' + Math.abs(fprice(aData[1][0][2], 2)) + '%}' : '{b|↓' + Math.abs(fprice(aData[1][0][2], 2)) + '%}'),
            x: 'center',
            y: 'top',
            textStyle: textStyle1
        },
        series: [{
                name: '漏斗图',
                type: 'funnel',
                left: '10%',
                width: '50%',
                top: '20%',
                height: '80%',
                minSize: '0%',
                maxSize: '60%',
                sort: 'none', // 'ascending', 'descending'
                gap: 3,
                itemStyle: {
                    normal: {
                        color: 'transparent',
                        borderWidth: 0
                    }
                },
                label: {
                    normal: {
                        show: true,
                        color: '#353535',
                        position: 'left',
                        formatter: function(params) {
                            var _index = params.dataIndex + 1;
                            for (let i = 0, j = aData[1].length; i < j; i++) {
                                if (_index == aData[1].length) {
                                    return ' '
                                } else if (_index == i) {
                                    return '{c|' + fprice(aData[1][(_index)][0], 2) + '%}' + (aData[1][_index][1] ? '{a|↑' + Math.abs(fprice(aData[1][_index][2], 2)) + '%}' : '{b|↓' + Math.abs(fprice(aData[1][_index][2], 2)) + '%}');
                                }
                            }
                        },
                        textStyle: textStyle
                    },
                    emphasis: {
                        show: true,
                        position: 'left',
                        textStyle: {
                            fontSize: 16
                        }
                    }
                },
                labelLine: {
                    normal: {
                        length: 20,
                        position: 'left',
                        lineStyle: {
                            width: 0,
                            color: 'skyblue'
                        }
                    }
                },
                data: aData[1]
            },
            {
                name: '漏斗图1',
                type: 'funnel',
                left: '0%',
                width: '100%',
                top: '10%',
                height: '80%',
                minSize: '0%',
                maxSize: '60%',
                sort: 'none', // 'ascending', 'descending'
                gap: 3,

                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        textStyle: {
                            color: '#000'
                        },
                        formatter: function(params) {
                            return '{c|' + params.name + '}     ' + '{c|' + fprice(params.data.info[0], 0) + '人}' + (params.data.info[1] ? '{a|↑' + fprice(params.data.info[2], 2) + '%}' : '{b|↓' + fprice(params.data.info[2], 2) + '%}');
                        },
                        textStyle: textStyle
                    },
                    emphasis: {
                        textStyle: {
                            fontSize: 20
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 0
                    }
                },
                data: aData[0]
            }
        ]
    };

    getDataAgain(data, myChart32, option);

    if (option && typeof option === "object") {
        myChart32.setOption(option, true);
    }
}

// 定制化渠道 整体转化率
function chartDzhChannel(aData, data) {
    for (let i = 0; i < aData[0].length; i++) {
        aData[0][i].value = aData[0][i].info[0];
    }
    var dom = document.getElementById("dzhChannel");
    myChart33 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        color: ['#73b9bc', '#7289ab', '#91ca8c', '#f49f42'],
        title: {
            text: '{c|' + '总转化率' + '}\n' + '{d|' + fprice(aData[1][0][0], 2) + '%}' + (aData[1][0][1] ? '{a|↑ ' + Math.abs(fprice(aData[1][0][2], 2)) + '%}' : '{b|↓' + Math.abs(fprice(aData[1][0][2], 2)) + '%}'),
            x: 'center',
            y: 'top',
            textStyle: textStyle1
        },
        series: [{
                name: '漏斗图',
                type: 'funnel',
                left: '10%',
                width: '50%',
                top: '20%',
                height: '80%',
                minSize: '0%',
                maxSize: '60%',
                sort: 'none', // 'ascending', 'descending'
                gap: 3,
                itemStyle: {
                    normal: {
                        color: 'transparent',
                        borderWidth: 0
                    }
                },
                label: {
                    normal: {
                        show: true,
                        color: '#353535',
                        position: 'left',
                        formatter: function(params) {
                            var _index = params.dataIndex + 1;
                            for (let i = 0, j = aData[1].length; i < j; i++) {
                                if (_index == aData[1].length) {
                                    return ' '
                                } else if (_index == i) {
                                    return '{c|' + fprice(aData[1][(_index)][0], 2) + '%}' + (aData[1][_index][1] ? '{a|↑' + Math.abs(fprice(aData[1][_index][2], 2)) + '%}' : '{b|↓' + Math.abs(fprice(aData[1][_index][2], 2)) + '%}');
                                }
                            }
                        },
                        textStyle: textStyle
                    },
                    emphasis: {
                        show: true,
                        position: 'left',
                        textStyle: {
                            fontSize: 16
                        }
                    }
                },
                labelLine: {
                    normal: {
                        length: 20,
                        position: 'left',
                        lineStyle: {
                            width: 0,
                            color: 'skyblue'
                        }
                    }
                },
                data: aData[1]
            },
            {
                name: '漏斗图1',
                type: 'funnel',
                left: '0%',
                width: '100%',
                top: '10%',
                height: '80%',
                minSize: '0%',
                maxSize: '60%',
                sort: 'none', // 'ascending', 'descending'
                gap: 3,

                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        textStyle: {
                            color: '#000'
                        },
                        formatter: function(params) {
                            return '{c|' + params.name + '}     ' + '{c|' + fprice(params.data.info[0], 0) + '人}' + (params.data.info[1] ? '{a|↑' + fprice(params.data.info[2], 2) + '%}' : '{b|↓' + fprice(params.data.info[2], 2) + '%}');
                        },
                        textStyle: textStyle
                    },
                    emphasis: {
                        textStyle: {
                            fontSize: 20
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 0
                    }
                },
                data: aData[0]
            }
        ]
    };

    getDataAgain(data, myChart33, option);

    if (option && typeof option === "object") {
        myChart33.setOption(option, true);
    }
}




function chartAuthJj(aData, data) {

    var dom = document.getElementById("authJj");
    myChart8 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            //top: '20',
            data: [{
                    name: '昨日授权成功人数'
                },
                {
                    name: '   授权成功人数\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   授权失败人数\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                    textStyle: textStyle
                },
                {
                    name: '   提交人数\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                    textStyle: textStyle,
                    icon: 'image://'
                },
                {
                    name: '   当日授权成功率\n\n   ' + fprice(aData[data.v][3][0], 2) + '%' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                    textStyle: textStyle,
                    icon: 'image://'
                }
            ]
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '人</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '昨日授权成功人数',
                type: 'line',
                data: aData[0]
            },
            {
                name: '   授权成功人数\n\n   ' + fprice(aData[data.v][0][0], 0) + '人' + (aData[data.v][0][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][0][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[1]
            },
            {
                name: '   授权失败人数\n\n   ' + fprice(aData[data.v][1][0], 0) + '人' + (aData[data.v][1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][1][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[2]
            },
            {
                name: '   提交人数\n\n   ' + fprice(aData[data.v][2][0], 0) + '人' + (aData[data.v][2][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][2][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: null
            },
            {
                name: '   当日授权成功率\n\n   ' + fprice(aData[data.v][3][0], 2) + '%' + (aData[data.v][3][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[data.v][3][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: null
            }
        ]
    };

    getDataAgain(data, myChart8, option);

    if (option && typeof option === "object") {
        myChart8.setOption(option, true);
    }
}



function chartSingularOfIncomingParts(aData, data) {

    let legendData = [{
        name: '昨日累计进件单数'
    }];
    let seriesData = [{
        name: '昨日累计进件单数',
        type: 'line',
        data: aData[0]
    }];
    const len = aData.length - 2;
    const dataName = aData[aData.length - 1];
    const dataHuanbi = aData[aData.length - 2];
    for (let i = 1; i < len; i++) {
        let oData0 = {};
        let oData1 = {};
        if (i === 1) {
            oData0 = {
                name: '   ' + dataName[i] + '\n\n   ' + fprice(aData[len][i - 1][0], 0) + '单' + (aData[len][i - 1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[len][i - 1][2], 2) + '%',
                textStyle: textStyle
            };
            oData1 = {
                name: '   ' + dataName[i] + '\n\n   ' + fprice(aData[len][i - 1][0], 0) + '单' + (aData[len][i - 1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[len][i - 1][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[i]
            };
        } else {
            oData0 = {
                name: '   ' + dataName[i] + '\n\n   ' + fprice(aData[len][i - 1][0], 0) + '单' + (aData[len][i - 1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[len][i - 1][2], 2) + '%',
                textStyle: textStyle
            };
            oData1 = {
                name: '   ' + dataName[i] + '\n\n   ' + fprice(aData[len][i - 1][0], 0) + '单' + (aData[len][i - 1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[len][i - 1][2], 2) + '%',
                type: 'bar',
                stack: '1',
                data: aData[i]
            };
        }
        legendData.push(oData0);
        seriesData.push(oData1);
    }

    var dom = document.getElementById(data.name);
    myChart19 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            //top: '20'
            data: legendData
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '单</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: seriesData
    };

    getDataAgain(data, myChart19, option);
    if (option && typeof option === "object") {
        myChart19.setOption(option, true);
    }
}



function chartValidFeedSingular(aData, data) {

    let legendData = [{
        name: '昨日累计有效进件单数'
    }];
    let seriesData = [{
        name: '昨日累计有效进件单数',
        type: 'line',
        data: aData[0]
    }];
    const len = aData.length - 2;
    const dataName = aData[aData.length - 1];
    const dataHuanbi = aData[aData.length - 2];

    for (let i = 1; i < len; i++) {
        let oData0 = {};
        let oData1 = {};
        if (i === 1) {
            oData0 = {
                name: '   ' + dataName[i] + '\n\n   ' + fprice(aData[len][i - 1][0], 0) + '单' + (aData[len][i - 1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[len][i - 1][2], 2) + '%',
                textStyle: textStyle
            };
            oData1 = {
                name: '   ' + dataName[i] + '\n\n   ' + fprice(aData[len][i - 1][0], 0) + '单' + (aData[len][i - 1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[len][i - 1][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[i]
            };
        } else {
            oData0 = {
                name: '   ' + dataName[i] + '\n\n   ' + fprice(aData[len][i - 1][0], 0) + '单' + (aData[len][i - 1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[len][i - 1][2], 2) + '%',
                textStyle: textStyle
            };
            oData1 = {
                name: '   ' + dataName[i] + '\n\n   ' + fprice(aData[len][i - 1][0], 0) + '单' + (aData[len][i - 1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[len][i - 1][2], 2) + '%',
                type: 'bar',
                stack: '1',
                data: aData[i]
            };
        }
        legendData.push(oData0);
        seriesData.push(oData1);
    }

    var dom = document.getElementById(data.name);
    myChart20 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            //top: '20'
            data: legendData
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '单</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: seriesData
    };

    getDataAgain(data, myChart20, option);

    if (option && typeof option === "object") {
        myChart20.setOption(option, true);
    }
}


function chartValidWorkOrderAmount(aData, data) {

    let legendData = [{
        name: '昨日累计工单金额'
    }];
    let seriesData = [{
        name: '昨日累计工单金额',
        type: 'line',
        data: aData[0]
    }];
    const len = aData.length - 2;
    const dataName = aData[aData.length - 1];
    const dataHuanbi = aData[aData.length - 2];

    for (let i = 1; i < len; i++) {
        let oData0 = {};
        let oData1 = {};
        if (i === 1) {
            oData0 = {
                name: '   ' + dataName[i] + '\n\n   ¥' + fprice(aData[len][i - 1][0], 2) + (aData[len][i - 1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[len][i - 1][2], 2) + '%',
                textStyle: textStyle
            };
            oData1 = {
                name: '   ' + dataName[i] + '\n\n   ¥' + fprice(aData[len][i - 1][0], 2) + (aData[len][i - 1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[len][i - 1][2], 2) + '%',
                type: 'bar',
                stack: '0',
                data: aData[i]
            };
        } else {
            oData0 = {
                name: '   ' + dataName[i] + '\n\n   ¥' + fprice(aData[len][i - 1][0], 2) + (aData[len][i - 1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[len][i - 1][2], 2) + '%',
                textStyle: textStyle
            };
            oData1 = {
                name: '   ' + dataName[i] + '\n\n   ¥' + fprice(aData[len][i - 1][0], 2) + (aData[len][i - 1][1] ? '{a|↑}' : '{b|↓}') + fprice(aData[len][i - 1][2], 2) + '%',
                type: 'bar',
                stack: '1',
                data: aData[i]
            };
        }
        legendData.push(oData0);
        seriesData.push(oData1);
    }
    var dom = document.getElementById(data.name);
    myChart21 = echarts.init(dom, 'dark');
    var option = null;
    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            //top: '20'
            data: legendData
        },
        grid: {
            left: '4',
            right: '0',
            top: '48',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ¥' + fprice(item.value, 2) + '</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: seriesData
    };

    getDataAgain(data, myChart21, option);

    if (option && typeof option === "object") {
        myChart21.setOption(option, true);
    }
}


function chartRainbowRatingCumulative(aData, data) {
    var dom = document.getElementById(data.name);
    myChart22 = echarts.init(dom, 'dark');
    var option = {
        color: ['rgba(245, 0, 20, 1', 'rgba(245, 116, 18, 1', 'rgba(245, 251, 27, 1', 'rgba(145, 202, 140, 1', 'rgba(48, 248, 248, 1', 'rgba(34, 0, 244, 1', 'rgba(164, 20, 195, 1', 'rgba(0, 0, 0, .5)'],
        tooltip: {
            show: false,
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            show: false,
            orient: 'vertical',
            x: 'left',
            data: ['红', '橙', '黄', '绿', '青', '蓝', '紫', '其它']
        },
        series: [{
                name: '昨日',
                type: 'pie',
                roseType: 'area',
                radius: [0, '30%'],
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                lableLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: [{
                        value: aData[1][0],
                        name: '红'
                    },
                    {
                        value: aData[1][1],
                        name: '橙'
                    },
                    {
                        value: aData[1][2],
                        name: '黄'
                    },
                    {
                        value: aData[1][3],
                        name: '绿'
                    },
                    {
                        value: aData[1][4],
                        name: '青'
                    },
                    {
                        value: aData[1][5],
                        name: '蓝'
                    },
                    {
                        value: aData[1][6],
                        name: '紫',
                    },
                    {
                        value: aData[1][7],
                        name: '其它',
                    }
                ]
            },
            {
                name: '今日',
                type: 'pie',
                radius: ['36%', '66%'],
                roseType: 'area',
                label: {
                    normal: {
                        formatter: (params) => {
                            let result = '{a|' + params.name + '}\n{hr|}\n {b|' + params.seriesName + '}: {per|' + params.percent + '%}\n {b|昨日}: {per|' + aData[1][params.dataIndex] + '%}';
                            return result
                        },
                        rich: {
                            a: {
                                color: '#999',
                                lineHeight: 22,
                                align: 'center'
                            },
                            abg: {
                                backgroundColor: '#333',
                                width: '100%',
                                align: 'right',
                                height: 22,
                                borderRadius: [4, 4, 0, 0]
                            },
                            hr: {
                                borderColor: '#aaa',
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0
                            },
                            b: {
                                fontSize: 14,
                                padding: [2, 4],
                                lineHeight: 20
                            },
                            per: {
                                color: '#eee',
                                backgroundColor: '#334455',
                                padding: [2, 4],
                                borderRadius: 2
                            }
                        }
                    }
                },
                data: [{
                        value: aData[0][0],
                        name: '红'
                    },
                    {
                        value: aData[0][1],
                        name: '橙'
                    },
                    {
                        value: aData[0][2],
                        name: '黄'
                    },
                    {
                        value: aData[0][3],
                        name: '绿'
                    },
                    {
                        value: aData[0][4],
                        name: '青'
                    },
                    {
                        value: aData[0][5],
                        name: '蓝'
                    },
                    {
                        value: aData[0][6],
                        name: '紫',
                    },
                    {
                        value: aData[0][7],
                        name: '其它',
                    }
                ]
            }
        ]
    };

    getDataAgain20181221(data, myChart22, option);

    if (option && typeof option === "object") {
        myChart22.setOption(option, true);
    }
}

function chartTermDistributionCumulative(aData, data) {
    var dom = document.getElementById(data.name);
    myChart23 = echarts.init(dom, 'dark');
    let option = {
        tooltip: {
            show: false
        },
        legend: {
            data: ['昨日', '今日']
        },
        radar: {
            // shape: 'circle',
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            indicator: [{
                    name: '3期',
                    max: 100
                },
                {
                    name: '6期',
                    max: 100
                },
                {
                    name: '12期',
                    max: 100
                },
                {
                    name: '24期',
                    max: 100
                },
                {
                    name: '36期',
                    max: 100
                },
                {
                    name: '其它',
                    max: 100
                }
            ]
        },
        series: [{
            type: 'radar',
            // areaStyle: {normal: {}},

            data: [{
                    value: aData[1],
                    name: '昨日',
                    label: {
                        show: true,
                        formatter: '{c}%',
                        position: 'left',
                        textStyle: {
                            color: '#dd6b66'
                        }
                    },
                },
                {
                    value: aData[0],
                    name: '今日',
                    label: {
                        show: true,
                        formatter: '{c}%',
                        position: 'right',
                        textStyle: {
                            color: '#759aa0'
                        }
                    },
                }
            ]
        }]
    };
    getDataAgain20181221(data, myChart23, option);

    if (option && typeof option === "object") {
        myChart23.setOption(option, true);
    }
}



function chartRainbowRating(aData, data) {
    let legendData = [{
        name: '昨日累计进件单数'
    }];
    let seriesData = [{
        name: '昨日累计进件单数',
        type: 'line',
        data: aData[0]
    }];
    const len = aData.length - 1;
    const dataName = ['昨日累计进件单数', '红', '橙', '黄', '绿', '青', '蓝', '紫', '其它'];

    for (let i = 1; i < len; i++) {
        let oData0 = {
            name: dataName[i],
            textStyle: textStyle
        };
        let oData1 = {
            name: dataName[i],
            type: 'bar',
            stack: '0',
            data: aData[i]
        };
        legendData.push(oData0);
        seriesData.push(oData1);
    }
    var dom = document.getElementById(data.name);
    myChart24 = echarts.init(dom, 'dark');

    option = {
        color: ['rgba(245, 0, 20, 1', 'rgba(245, 0, 20, 1', 'rgba(245, 116, 18, 1', 'rgba(245, 251, 27, 1', 'rgba(145, 202, 140, 1', 'rgba(48, 248, 248, 1', 'rgba(34, 0, 244, 1', 'rgba(164, 20, 195, 1', 'rgba(0, 0, 0, .5)'],
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            //top: '20'
            data: legendData
        },
        grid: {
            left: '4',
            right: '0',
            top: '28',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '单</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: seriesData
    };

    getDataAgain20181221(data, myChart24, option);

    if (option && typeof option === "object") {
        myChart24.setOption(option, true);
    }
}


function chartTermDistribution(aData, data) {
    let legendData = [{
        name: '昨日累计进件单数'
    }];
    let seriesData = [{
        name: '昨日累计进件单数',
        type: 'line',
        data: aData[0]
    }];
    const len = aData.length - 1;
    const dataName = ['昨日累计进件单数', '3期', '6期', '12期', '24期', '36期', '其它'];

    for (let i = 1; i < len; i++) {
        let oData0 = {
            name: dataName[i],
            textStyle: textStyle
        };
        let oData1 = {
            name: dataName[i],
            type: 'bar',
            stack: '0',
            data: aData[i]
        };
        legendData.push(oData0);
        seriesData.push(oData1);
    }
    var dom = document.getElementById(data.name);
    myChart25 = echarts.init(dom, 'dark');

    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            //top: '20'
            data: legendData
        },
        grid: {
            left: '4',
            right: '0',
            top: '28',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 0) + '单</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                scale: true,
                min: 0,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: seriesData
    };

    getDataAgain20181221(data, myChart25, option);

    if (option && typeof option === "object") {
        myChart25.setOption(option, true);
    }
}



function chartWeightedDuration(aData, data) {
    var dom = document.getElementById(data.name);
    myChart26 = echarts.init(dom, 'dark');

    option = {
        legend: {
            show: true,
            type: 'scroll',
            textStyle: {
                color: '#333'
            },
            y: 3,
            //top: '20'
            data: ['昨日', '今日']
        },
        grid: {
            left: '4',
            right: '0',
            top: '28',
            bottom: '4',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            formatter: (params) => {
                var result = params[0].axisValue;
                params.forEach(function(item, i) {
                    result += '<br/><span style="position:relative;left:0;top:-1px;display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span><span style="color:#fff;">' + getChinese(item.seriesName) + '</span> : ' + fprice(item.value, 2) + '期</span>';
                })
                return result;
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { // 轴线
                show: true,
                lineStyle: {
                    //color: '#fff',
                    type: 'solid',

                }
            },
            axisLabel: { //字体颜色
                show: true,
                interval: 0, // {number} 0为全部显示
                rotate: 45,
            },
            data: (function() {
                var res = data.rec.join('-').split('-');
                return res;
            })()
        }],
        yAxis: [ //y轴
            { //y左轴
                type: 'value',
                scale: true,
                min: function(value) {
                    return value.min - 2;
                },
                max: function(value) {
                    return value.max + 2;
                },
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        //color: '#fff',//轴颜色
                        type: 'solid',
                        width: 0
                    }
                },
                splitNumber: 10,
                boundaryGap: [0.2, 0.2]
            },
            { //y右轴 只是个装饰
                type: 'value',
                scale: false,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 0
                    }
                },
            }
        ],
        series: [{
                name: '昨日',
                type: 'line',
                stack: 0,
                data: aData[0]
            },
            {
                name: '今日',
                type: 'line',
                stack: 1,
                data: aData[1]
            },
            {
                type: 'candlestick',
                markLine: {
                    silent: true,
                    symbol: ['none'],
                    data: [{
                        name: 'min line on close',
                        type: 'min',
                        valueDim: 'close'
                    }],
                    lineStyle: {
                        color: 'red',
                        width: 4
                    }
                },
                data: [28]
            }
        ]
    };

    getDataAgain20181221(data, myChart26, option);

    if (option && typeof option === "object") {
        myChart26.setOption(option, true);
    }
}



function getDataAgain20181221(obj, echarts, op) {
    obj.timer = setInterval(() => {
        $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
                "tableName": obj.tableName
            },
            success: function(res) {
                if (res.time != obj.time) {
                    obj.time = res.time;
                    $.ajax({
                        type: 'get',
                        dataType: 'jsonp',
                        jsonp: 'callback',
                        url: obj.url,
                        data: { "params": obj.params },
                        success: function(response) {
                            const aData = response.data;
                            const axisData = response.time.substring(14, 16) < 30 ? response.time.substring(10, 13) + ':00' : response.time.substring(10, 13) + ':30';
                            const l = op.series.length;
                            const oName = obj.name;
                            if (oName == 'rainbowRatingCumulative') {
                                aData[1].map((item, i) => {
                                    op.series[0].data[i].value = item;
                                })
                                aData[0].map((item, i) => {
                                    op.series[1].data[i].value = item;
                                })
                            } else if (oName == 'termDistributionCumulative') {
                                op.series[0].data[0].value = aData[1];
                                op.series[0].data[1].value = aData[0];
                            } else {
                                for (let n = 0; n < l - 1; n++) {
                                    op.series[n].data.shift();
                                    op.series[n].data.push(aData[n][aData[n].length - 1]);
                                }
                                op.xAxis[0].data.shift();
                                op.xAxis[0].data.push(axisData);
                            }
                            echarts.setOption(op, true);
                        }
                    })
                }
            }
        })

    }, 1e3 * 60)
}
//get name
function getChinese(name) {

    let names = name.split('\n')[0];
    names = $.trim(names);
    return names;
}


//thousandths
function fprice(s, n) {
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; //n为小数点后保留小数位
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    let t = "";
    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    if (n == 0) {
        return t.split("").reverse().join("");
    } else {
        return t.split("").reverse().join("") + "." + r;
    }
}


//getDataAgain
function getDataAgain(obj, echarts, op) {
    setInterval(() => {
        $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
                "tableName": obj.tableName
            },
            success: function(res) {
                if (res.time != obj.time) {
                    obj.time = res.time;
                    $.ajax({
                        type: 'get',
                        dataType: 'jsonp',
                        jsonp: 'callback',
                        url: obj.url,
                        success: function(response) {
                            const aData = response.data;
                            const axisData = response.time.substring(14, 16) < 30 ? response.time.substring(10, 13) + ':00' : response.time.substring(10, 13) + ':30';
                            const l = op.series.length;
                            const oName = obj.name;
                            if (oName === 'customizedInc' || oName === 'customizedAmo' || oName === 'conRate' || oName === 'shiChConRate') { //单 v1-4 v1-5 v2-6 v3-6
                                for (let i = 1; i < l; i++) {
                                    let _name = '   ' + getChinese(op.legend.data[i].name);
                                    op.legend.data[i].name = _name + '\n\n   ' + fprice(aData[obj.v][i - 1][0], 0) + '单' + (aData[obj.v][i - 1][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[obj.v][i - 1][2], 2) + '%';
                                    op.series[i].name = _name + '\n\n   ' + fprice(aData[obj.v][i - 1][0], 0) + '单' + (aData[obj.v][i - 1][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[obj.v][i - 1][2], 2) + '%';
                                }
                                for (let n = 0; n < l - 1; n++) {
                                    op.series[n].data.shift();
                                    op.series[n].data.push(aData[n][aData[n].length - 1]);
                                }
                            } else if (oName === 'customizedAmo') { //金额 v1-6
                                for (let i = 1; i < l; i++) {
                                    let _name = '   ' + getChinese(op.legend.data[i].name);
                                    op.legend.data[i].name = _name + '\n\n   ¥' + fprice(aData[obj.v][i - 1][0], 2) + (aData[obj.v][i - 1][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[obj.v][i - 1][2], 2) + '%';
                                    op.series[i].name = _name + '\n\n   ¥' + fprice(aData[obj.v][i - 1][0], 2) + (aData[obj.v][i - 1][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[obj.v][i - 1][2], 2) + '%';
                                }
                                for (let n = 0; n < l; n++) {
                                    op.series[n].data.shift();
                                    op.series[n].data.push(aData[n][aData[n].length - 1]);
                                }
                            } else if (oName === 'authJj' || oName === 'authYy' || oName === 'authXy' || oName === 'shiChAuthJj' || oName === 'shiChAuthYy' || oName === 'shiChAuthXy') { //人&率 v2-2 v2-3 v2-4 v3-2 v3-3 v3-4
                                for (let i = 1; i < l; i++) {
                                    let _name = '   ' + getChinese(op.legend.data[i].name);
                                    if (i < 4) {
                                        op.legend.data[i].name = _name + '\n\n   ' + fprice(aData[obj.v][i - 1][0], 0) + '人' + (aData[obj.v][i - 1][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[obj.v][i - 1][2], 2) + '%';
                                        op.series[i].name = _name + '\n\n   ' + fprice(aData[obj.v][i - 1][0], 0) + '人' + (aData[obj.v][i - 1][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[obj.v][i - 1][2], 2) + '%';
                                    } else {
                                        op.legend.data[i].name = _name + '\n\n   ' + fprice(aData[obj.v][i - 1][0], 2) + '%' + (aData[obj.v][i - 1][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[obj.v][i - 1][2], 2) + '%';
                                        op.series[i].name = _name + '\n\n   ' + fprice(aData[obj.v][i - 1][0], 2) + '%' + (aData[obj.v][i - 1][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[obj.v][i - 1][2], 2) + '%';
                                    }
                                }
                                for (let n = 0; n < l - 2; n++) {
                                    op.series[n].data.shift();
                                    op.series[n].data.push(aData[n][aData[n].length - 1]);
                                }
                            } else if (oName === 'subTrial' || oName === 'customizedSub' || oName === 'shiChSubTrial') {
                                for (let i = 1; i < l; i++) {
                                    let _name = '   ' + getChinese(op.legend.data[i].name);
                                    if (i < 5) {
                                        op.legend.data[i].name = _name + '\n\n   ' + fprice(aData[obj.v][i - 1][0], 0) + '人' + (aData[obj.v][i - 1][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[obj.v][i - 1][2], 2) + '%';
                                        op.series[i].name = _name + '\n\n   ' + fprice(aData[obj.v][i - 1][0], 0) + '人' + (aData[obj.v][i - 1][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[obj.v][i - 1][2], 2) + '%';
                                    } else {
                                        op.legend.data[i].name = _name + '\n\n   ' + fprice(aData[obj.v][i - 1][0], 2) + '%' + (aData[obj.v][i - 1][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[obj.v][i - 1][2], 2) + '%';
                                        op.series[i].name = _name + '\n\n   ' + fprice(aData[obj.v][i - 1][0], 2) + '%' + (aData[obj.v][i - 1][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[obj.v][i - 1][2], 2) + '%';
                                    }
                                }
                                for (let n = 0; n < l - 2; n++) {
                                    op.series[n].data.shift();
                                    op.series[n].data.push(aData[n][aData[n].length - 1]);
                                }
                            } else if (oName === 'customizedOpenCard') {
                                for (let i = 1; i < l; i++) {
                                    let _name = '   ' + getChinese(op.legend.data[i].name);
                                    op.legend.data[i].name = _name + '\n\n   ' + fprice(aData[obj.v][i - 1][0], 0) + '人' + (aData[obj.v][i - 1][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[obj.v][i - 1][2], 2) + '%';
                                    op.series[i].name = _name + '\n\n   ' + fprice(aData[obj.v][i - 1][0], 0) + '人' + (aData[obj.v][i - 1][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[obj.v][i - 1][2], 2) + '%';
                                }
                                for (let n = 0; n < l - 1; n++) {
                                    op.series[n].data.shift();
                                    op.series[n].data.push(aData[n][aData[n].length - 1]);
                                }
                            } else if (oName === 'fhyShiChToday' || oName === 'fhyShiChSeven' || oName === 'fhySanTiToday' || oName === 'fhySanTiSeven' || oName === 'fhyDingZhiToday' || oName === 'fhyDingZhiSeven') { // v4
                                for (let i = 1; i < l; i++) {
                                    let _name = '   ' + getChinese(op.legend.data[i].name);
                                    op.legend.data[i].name = _name + '\n\n   ' + fprice(aData[obj.v][i - 1][0], 0) + '%' + (aData[obj.v][i - 1][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[obj.v][i - 1][2], 2) + '%';
                                    op.series[i].name = _name + '\n\n   ' + fprice(aData[obj.v][i - 1][0], 0) + '%' + (aData[obj.v][i - 1][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[obj.v][i - 1][2], 2) + '%';
                                }
                                for (let n = 0; n < l - 1; n++) {
                                    op.series[n].data.shift();
                                    op.series[n].data.push(aData[n][aData[n].length - 1]);
                                }
                            } else if (oName === 'hyShiChToday' || oName === 'hyShiChSeven' || oName === 'hySanTiToday' || oName === 'hySanTiSeven' || oName === 'hyDingZhiToday' || oName === 'hyDingZhiSeven') { // v5
                                for (let i = 1; i < l; i++) {
                                    let _name = '   ' + getChinese(op.legend.data[i].name);
                                    op.legend.data[i].name = _name + '\n\n   ' + fprice(aData[obj.v][i - 1][0], 0) + '%' + (aData[obj.v][i - 1][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[obj.v][i - 1][2], 2) + '%';
                                    op.series[i].name = _name + '\n\n   ' + fprice(aData[obj.v][i - 1][0], 0) + '%' + (aData[obj.v][i - 1][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[obj.v][i - 1][2], 2) + '%';
                                }
                                for (let n = 0; n < l - 1; n++) {
                                    op.series[n].data.shift();
                                    op.series[n].data.push(aData[n][aData[n].length - 1]);
                                }
                            } else if (oName === 'santiKey') { //v3-1
                                for (let i = 0; i < l; i++) {
                                    let _name = '   ' + getChinese(op.legend.data[i].name);
                                    op.legend.data[i].name = _name + '\n\n   ' + fprice(aData[obj.v][i][0], 0) + '人' + (aData[obj.v][i][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[obj.v][i][2], 2) + '%';
                                    op.series[i].name = _name + '\n\n   ' + fprice(aData[obj.v][i][0], 0) + '人' + (aData[obj.v][i][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[obj.v][i][2], 2) + '%';
                                    op.series[i].data.shift();
                                    op.series[i].data.push(aData[i][aData[i].length - 1]);
                                }
                            } else if (oName === 'custom360Jie' || oName === 'custom360Rong' || oName === 'customKaNiu') {
                                op.title.text = '{c|' + '总转化率' + '}\n' + '{c|' + fprice(aData[obj.v][0][0], 0) + '%}' + (aData[obj.v][0][1] ? '{a|↑}' : '{b|↓}') + '{c|' + fprice(aData[obj.v][0][2], 2) + '%}';
                                for (let i = 0; i < l; i++) {
                                    op.series[i].data = aData[0];
                                    if (i == 0) {
                                        op.series[i].label.normal.formatter = function(params) {
                                            var _index = params.dataIndex + 1;
                                            for (let m = 0, n = aData[obj.v].length; m < n; m++) {
                                                if (_index == aData[obj.v].length) {
                                                    return ' '
                                                } else if (_index == m) {
                                                    return '{c|' + fprice(aData[obj.v][(_index)][0], 0) + '%}' + (aData[obj.v][_index][1] ? '{a|↑}' : '{b|↓}') + '{c|' + fprice(aData[obj.v][_index][2], 2) + '%}'
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if (oName === 'scChannel' || oName === 'stChannel' || oName === 'dzhChannel') {
                                $('#' + oName).prev('h1').find('time').text(axisData)
                                op.title.text = '{c|' + '总转化率' + '}\n' + '{d|' + fprice(aData[1][0][0], 2) + '%}' + (aData[1][0][1] ? '{a|↑ ' + Math.abs(fprice(aData[1][0][2], 2)) + '%}' : '{b|↓' + Math.abs(fprice(aData[1][0][2], 2)) + '%}');
                                for (let i = 0; i < aData[0].length; i++) {
                                    aData[0][i].value = aData[0][i].info[0];
                                }
                                for (let i = 0; i < l; i++) {
                                    if (i == 0) {
                                        op.series[i].data = aData[1];
                                        op.series[i].label.normal.formatter = function(params) {
                                            var _index = params.dataIndex + 1;
                                            for (let m = 0, n = aData[1].length; m < n; m++) {
                                                if (_index == aData[1].length) {
                                                    return ' '
                                                } else if (_index == m) {
                                                    return '{c|' + fprice(aData[1][(_index)][0], 2) + '%}' + (aData[1][_index][1] ? '{a|↑' + Math.abs(fprice(aData[1][_index][2], 2)) + '%}' : '{b|↓' + Math.abs(fprice(aData[1][_index][2], 2)) + '%}');
                                                }
                                            }
                                        }
                                    } else {
                                        op.series[i].data = aData[0];
                                        op.series[i].label.normal.formatter = function(params) {
                                            var _index = params.dataIndex + 1;
                                            for (let m = 0, n = aData[0].length; m < n; m++) {
                                                return '{c|' + params.name + '}     ' + '{c|' + fprice(params.data.info[0], 0) + '人}' + (params.data.info[1] ? '{a|↑' + fprice(params.data.info[2], 2) + '%}' : '{b|↓' + fprice(params.data.info[2], 2) + '%}');
                                            }
                                        }
                                    }
                                }
                            } else if (oName === 'singularOfIncomingParts' || oName === 'validFeedSingular') {
                                for (let i = 1; i < l; i++) { // v6-1 v6-2
                                    let _name = '   ' + getChinese(op.legend.data[i].name);
                                    op.legend.data[i].name = _name + '\n\n   ' + fprice(aData[aData.length - 2][i - 1][0], 0) + '单' + (aData[aData.length - 2][i - 1][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[aData.length - 2][i - 1][2], 2) + '%';
                                    op.series[i].name = _name + '\n\n   ' + fprice(aData[aData.length - 2][i - 1][0], 0) + '单' + (aData[aData.length - 2][i - 1][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[aData.length - 2][i - 1][2], 2) + '%';
                                }
                                for (let n = 0; n < l; n++) {
                                    if (op.series[n].data != null) {
                                        op.series[n].data.shift();
                                        op.series[n].data.push(aData[n][aData[n].length - 1]);
                                    }
                                }
                            } else if (oName === 'validWorkOrderAmount') {
                                for (let i = 1; i < l; i++) { // v6-3
                                    let _name = '   ' + getChinese(op.legend.data[i].name);
                                    op.legend.data[i].name = _name + '\n\n   ¥' + fprice(aData[aData.length - 2][i - 1][0], 0) + (aData[aData.length - 2][i - 1][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[aData.length - 2][i - 1][2], 2) + '%';
                                    op.series[i].name = _name + '\n\n   ¥' + fprice(aData[aData.length - 2][i - 1][0], 0) + (aData[aData.length - 2][i - 1][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[aData.length - 2][i - 1][2], 2) + '%';
                                }
                                for (let n = 0; n < l; n++) {
                                    if (op.series[n].data != null) {
                                        op.series[n].data.shift();
                                        op.series[n].data.push(aData[n][aData[n].length - 1]);
                                    }
                                }
                            } else { //l==6
                                for (let i = 1; i < l; i++) { // v1-1 v2-1
                                    let _name = '   ' + getChinese(op.legend.data[i].name);
                                    op.legend.data[i].name = _name + '\n\n   ' + fprice(aData[obj.v][i - 1][0], 0) + '人' + (aData[obj.v][i - 1][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[obj.v][i - 1][2], 2) + '%';
                                    op.series[i].name = _name + '\n\n   ' + fprice(aData[obj.v][i - 1][0], 0) + '人' + (aData[obj.v][i - 1][1] ? '{a|↑} ' : '{b|↓} ') + fprice(aData[obj.v][i - 1][2], 2) + '%';
                                }
                                for (let n = 0; n < l; n++) {
                                    if (op.series[n].data != null) {
                                        op.series[n].data.shift();
                                        op.series[n].data.push(aData[n][aData[n].length - 1]);
                                    }
                                }
                            }
                            if (oName !== 'custom360Jie' && oName !== 'custom360Rong' && oName !== 'customKaNiu' && oName !== 'scChannel' && oName !== 'stChannel' && oName !== 'dzhChannel') {
                                op.xAxis[0].data.shift();
                                op.xAxis[0].data.push(axisData);

                            }
                            echarts.setOption(op);
                        }
                    });
                }
            }
        })
    }, 1e3 * 60)
}
