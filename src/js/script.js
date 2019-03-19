// 页面中的要加载的图形
var aObj = [];
// 轮播的页面数量
var $_picn = 0;
// 线上得页面，因为有做好的页面不进行展示
var orOnline = {
  '1': true,
  '2': true
};
// 页面轮播的定时器
var Timer = null;
var hivePermiss = [];
(function ($) {
  init();
})(jQuery);


function init() {
  var coo = getCookie('name');
  if (coo == null) {
    generateId();
  }

  var aPermissions = [{
    chinaName: '【印尼】授信 业务监控',
    html: '<div class="page page0"><header class="header"><ul></ul><h1>【印尼】授信业务监控</h1></header><section class="section"><div><div><p>当日注册-实名率</p><h1>12.23%</h1><div id="onTheDayOfRegistration-realNameRate"></div></div><div><p>当日注册-授信完成率</p><h1>12.23%</h1><div id="onTheDayOfRegistration-creditCompletion"></div></div></div><div><div><div><h3>注册</h3><div id="registered"></div></div><div><h3>实名</h3><div id="realName"></div></div></div><div><div><h3>个人信息</h3><div id="personalInformation"></div></div><div><h3>工作信息</h3><div id="jobInformation"></div></div></div><div><div><h3>工作认证</h3><div id="workCertificate"></div></div><div><h3>社交认证</h3><div id="socialCertification"></div></div></div></div></section></div>',
    message: [{
        'name': 'onTheDayOfRegistration-realNameRate',
        'time': null
      },
      {
        'name': 'onTheDayOfRegistration-creditCompletion',
        'time': null
      },
      {
        'name': 'registered',
        'time': null
      },
      {
        'name': 'realName',
        'time': null
      },
      {
        'name': 'personalInformation',
        'time': null
      },
      {
        'name': 'jobInformation',
        'time': null
      },
      {
        'name': 'workCertificate',
        'time': null
      },
      {
        'name': 'socialCertification',
        'time': null
      }
    ]
  }, {
    chinaName: '【印尼】交易 业务监控',
    html: '<div class="page page1"><header class="header"><ul></ul><h1>【印尼】交易 业务监控</h1></header><section class="section"><div><div><h3>绑卡</h3><div id="tiedCard"></div></div><div><h3>提单</h3><div id="billOfLading"></div></div></div><div><div><h3>机审</h3><div id="machineTrial"></div></div><div><h3>机审通过分布</h3><div id="distributionOfMachineApproval"></div></div></div><div><div><h3>人工审核通过(工单)</h3><div id="manualApproval-repairOrder"></div></div><div><h3>人工审核通过(金额)</h3><div id="manualApproval-amount"></div></div></div></section></div>',
    message: [{
        'name': 'tiedCard',
        'time': null
      }, //v2 1
      {
        'name': 'billOfLading',
        'time': null
      }, //v2 2
      {
        'name': 'machineTrial',
        'time': null
      }, //v2 3
      {
        'name': 'distributionOfMachineApproval',
        'time': null
      }, //v2 4
      {
        'name': 'manualApproval-repairOrder',
        'time': null
      }, //v2 5
      {
        'name': 'manualApproval-amount',
        'time': null
      }
    ]
  }];


  //点击全屏提示框进入全屏模式
  $('#promptBox').on('click', function () {
    var elem = document.getElementById("wrapper");
    requestFullScreen(elem);
  });



  var promptTimer = setTimeout(function () {
    $('#promptBox').fadeOut(500);
  }, 1000 * 6);

  $('#promptBox').hover(function () {
    clearTimeout(promptTimer);
  }, function () {
    promptTimer = setTimeout(function () {
      $('#promptBox').fadeOut(1000 * 2);
    }, 1000 * 6);
  });
  var phone = GetQueryString('phone');
  fPermission(phone, aPermissions);
  // 添加水印
  watermark({
    watermark_txt: phone
  });

  if (phone == '18611505611') {
    get_ServerTime();
  } else {
    _get_ServerTime();
  }
  // 给图形添加自适应
  window.addEventListener('resize', function () {
    myChart1.resize();
  });
}




function upLoad(loc, index, sUrl) {
  var phone = GetQueryString('phone');
  var uuid = getCookie('name');
  var base1, base2, base3, base4, base5, base6;
  if (index == 1) {
    setTimeout(function () {
      html2canvas(document.querySelector("#wrapper")).then(function (canvas) {
        base1 = canvas.toDataURL();
      });
      setTimeout(function () {
        $.ajax({
          url: 'http://60.205.6.0:4104/image/' + sUrl + uuid + '/定制化漏斗监控',
          type: 'POST',
          dataType: 'json',
          data: {
            data: base1,
            date: loc
          }
        });
      }, 1000 * 13);
    }, 1000 * 3);
  } else {
    setTimeout(function () {
      html2canvas(document.querySelector("#wrapper")).then(function (canvas) {
        base2 = canvas.toDataURL();
        //console.log(base);
      });
      setTimeout(function () {
        $.ajax({
          url: 'http://60.205.6.0:4104/image/' + sUrl + uuid + '/三体漏斗监控',
          type: 'POST',
          dataType: 'json',
          data: {
            data: base2,
            date: loc
          }
        });
      }, 1000 * 13);
    }, 1000 * 3);
  }
}


//时间
function get_ServerTime() {
  $.ajax({
    type: 'get',
    dataType: 'json',
    url: 'http://60.205.6.0:4104/currenttime',
    success: function (json) {
      var localTime = Date.parse(new Date());
      var vDifference = localTime - json;
      setInterval(function () {
        var date = new Date(localTime + vDifference);
        var y = date.getFullYear();
        var mo = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        var w = date.getDay();

        if (w == 0) w = "Sun";
        if (w == 1) w = "Mon";
        if (w == 2) w = "Tue";
        if (w == 3) w = "Wed";
        if (w == 4) w = "Thu";
        if (w == 5) w = "Fri";
        if (w == 6) w = "Sat";

        var showTime = document.getElementById('show_time');
        showTime.innerHTML = y + '-' + mo + '-' + d + '  ' + w + '   ' + h + ':' + m + ':' + s;

        var loc = h + ':' + m + ':' + s;
        if (loc == '18:16:10' || loc == '12:16:10' || loc == '23:46:10') {
          var sUrl = 'upload2/';
          clearTimeout(Timer);
          var index = 1;
          var $_picn = $(".page").length;
          if ($_picn > 1) {
            $(".tab li").eq(0).addClass("checked");
            $(".page").eq(0).animate({
              opacity: '1',
              zIndex: '9'
            }, 500).siblings(".page").animate({
              opacity: '0',
              zIndex: '-1'
            }, 500, upLoad(y + '-' + mo + '-' + d + h, index, sUrl));
          }
          Timer = setInterval(function () {
            if (index == $_picn) {
              index = 1;
              clearInterval(Timer);
              loop();
            } else {
              show(index);
              index++;
              upLoad(y + '-' + mo + '-' + d + h, index, sUrl);
            }
          }, 1000 * 30);
        } else if (loc == '00:00:00' || loc == '02:00:00' || loc == '04:00:00' || loc == '06:00:00' || loc == '08:00:00' || loc == '10:00:00' || loc == '12:00:00' || loc == '14:00:00' || loc == '16:00:00' || loc == '18:00:00' || loc == '20:00:00' || loc == '22:00:00') {
          var sUr2 = 'upload4/';
          clearTimeout(Timer);
          $.ajax({
            url: 'http://60.205.6.0:4104/isHoliday',
            type: 'get',
            dataType: 'json',
            success: function (data) {
              if (data != 0) {
                var index = 1;
                var $_picn = $(".page").length;
                if ($_picn > 1) {
                  $(".tab li").eq(0).addClass("checked");
                  $(".page").eq(0).animate({
                    opacity: '1',
                    zIndex: '9'
                  }, 500).siblings(".page").animate({
                    opacity: '0',
                    zIndex: '-1'
                  }, 500, upLoad(y + '-' + mo + '-' + d + h, index, sUr2));
                }
                Timer = setInterval(function () {
                  if (index == $_picn) {
                    index = 1;
                    clearInterval(Timer);
                    loop();
                  } else {
                    show(index);
                    index++;
                    upLoad(y + '-' + mo + '-' + d + h, index, sUr2);
                  }
                }, 1000 * 30);
              }
            }
          });
        }
        localTime = Date.parse(new Date());
      }, 1000);
    }
  });
}

function _get_ServerTime() {
  $.ajax({
    type: 'get',
    dataType: 'json',
    url: 'http://60.205.6.0:4104/currenttime',
    success: function (response) {
      var localTime = Date.parse(new Date());
      var vDifference = localTime - response;
      setInterval(function () {
        var date = new Date(localTime + vDifference);
        var y = date.getFullYear();
        var mo = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        var w = date.getDay();

        if (w == 0) w = "Sun";
        if (w == 1) w = "Mon";
        if (w == 2) w = "Tue";
        if (w == 3) w = "Wed";
        if (w == 4) w = "Thu";
        if (w == 5) w = "Fri";
        if (w == 6) w = "Sat";

        var showTime = document.getElementById('show_time');
        showTime.innerHTML = y + '-' + mo + '-' + d + '  ' + w + '   ' + h + ':' + m + ':' + s;

        localTime = Date.parse(new Date());
      }, 1e3);
    }
  });
}

//初始化统计图
function fuAjaxChart(data) {
  $.ajax({
    type: 'get',
    dataType: 'jsonp',
    jsonp: 'callback',
    url: data.url,
    data: {},
    success: function (response) {
      var _aData = response.data;
      var _sTime = response.time.slice(11, 16);
      switch (data.name) {
        case 'channelOpenCard':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              data.rec = setXaxis(response.time);
              chartChannelOpenCard(_aData, data);
            }

          });
          break;
        case 'customizedOpenCard':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              data.rec = setXaxis(response.time);
              chartCustomizedOpenCard(_aData, data);
            }

          });
          break;
        case 'customizedSub':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              data.rec = setXaxis(response.time);
              chartCustomizedSub(_aData, data);
            }
          });
          break;
        case 'customizedInc':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              data.rec = setXaxis(response.time);
              chartCustomizedInc(_aData, data);
            }
          });
          break;
        case 'custom360Jie':
          $('#custom360Jie').prev('h3').find('time').text(_sTime);
          chartCustom360Jie(_aData, data);
          break;
        case 'custom360Rong':
          $('#custom360Rong').prev('h3').find('time').text(_sTime);
          chartCustom360Rong(_aData, data);
          break;
        case 'customKaNiu':
          $('#customKaNiu').prev('h3').find('time').text(_sTime);
          chartCustomKaNiu(_aData, data);
          break; //v1
        case 'sanTiOpenCard':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              data.rec = setXaxis(response.time);
              chartSanTiOpenCard(_aData, data);
            }
          });
          break;
        case 'authJj':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              data.rec = setXaxis(response.time);
              chartAuthJj(_aData, data);
            }
          });
          break;
        case 'authYy':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              data.rec = setXaxis(response.time);
              chartAuthYy(_aData, data);
            }
          });
          break;
        case 'authXy':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              data.rec = setXaxis(response.time);
              chartAuthXy(_aData, data);
            }
          });

          break;
        case 'subTrial':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              data.rec = setXaxis(response.time);
              chartSubTrial(_aData, data);
            }
          });
          break;
        case 'conRate':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              data.rec = setXaxis(response.time);
              chartConRate(_aData, data);
            }
          });
          break; //v2
        case 'shiChOpenCard':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              data.rec = setXaxis(response.time);
              chartShiChOpenCard(_aData, data);
            }
          });
          break;
        case 'shiChAuthJj':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              data.rec = setXaxis(response.time);
              chartShiChAuthJj(_aData, data);
            }
          });
          break;
        case 'shiChAuthYy':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              data.rec = setXaxis(response.time);
              chartShiChAuthYy(_aData, data);
            }
          });
          break;
        case 'shiChAuthXy':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              data.rec = setXaxis(response.time);
              chartShiChAuthXy(_aData, data);
            }
          });
          break;
        case 'shiChSubTrial':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              data.rec = setXaxis(response.time);
              chartShiChSubTrial(_aData, data);
            }
          });

          break;
        case 'shiChConRate':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              data.rec = setXaxis(response.time);
              chartShiChConRate(_aData, data);
            }
          });
          break; //v3
        case 'scChannel':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              var _sTimes = res.time.slice(11, 16);
              $('#scChannel').prev('h1').find('time').text(_sTimes);
              chartScChannel(_aData, data);
            }
          });
          break;
        case 'stChannel':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              var _sTimes = res.time.slice(11, 16);
              $('#stChannel').prev('h1').find('time').text(_sTimes);
              chartStChannel(_aData, data);
            }
          });
          break;
        case 'dzhChannel':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              var _sTimes = res.time.slice(11, 16);
              $('#dzhChannel').prev('h1').find('time').text(_sTimes);
              chartDzhChannel(_aData, data);
            }
          });
          break;
        case 'singularOfIncomingParts':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              data.rec = setXaxis(response.time);
              chartSingularOfIncomingParts(_aData, data);
            }
          });
          break;
        case 'validFeedSingular':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              data.rec = setXaxis(response.time);
              chartValidFeedSingular(_aData, data);
            }
          });
          break;
        case 'validWorkOrderAmount':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              data.rec = setXaxis(response.time);
              chartValidWorkOrderAmount(_aData, data);
            }
          });
          break;
        case 'rainbowRatingCumulative':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              data.rec = setXaxis(response.time);
              fnSelect('selectRRC', _aData[2], val);
              chartRainbowRatingCumulative(_aData, data);
            }
          });
          break;
        case 'termDistributionCumulative':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              data.rec = setXaxis(response.time);
              fnSelect('selectTDC', _aData[2], val);
              chartTermDistributionCumulative(_aData, data);
            }
          });
          break;
        case 'rainbowRating':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              data.rec = setXaxis(response.time);
              fnRadio('rainbowRating', _aData[9], val);
              chartRainbowRating(_aData, data);
            }
          });
          break;
        case 'termDistribution':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              data.rec = setXaxis(response.time);
              fnRadio('termDistribution', _aData[7], val);
              chartTermDistribution(_aData, data);
            }
          });
          break;
        case 'weightedDuration':
          $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://60.205.6.0:4104/common',
            data: {
              "tableName": data.tableName
            },
            success: function (res) {
              data.time = res.time;
              data.rec = setXaxis(response.time);
              fnRadio('weightedDuration', _aData[2], val);
              chartWeightedDuration(_aData, data);
            }
          });
          break;
        default:
      }
    }
  });
}


//设置横坐标时间组
function setXaxis(t) {
  var rec = [];
  var minu = t.substring(14, 16);
  var hours = t.substring(11, 13);

  for (var i = 0; i <= 24; i++) {
    rec.push(hours - Math.floor(i / 2));
  }
  if (minu < 30) {
    rec.splice(0, 1);
  } else {
    rec.splice(24, 1);
  }
  for (var j = 0; j < rec.length; j++) {
    if (rec[j] < 0) {
      rec[j] = rec[j] + 24;
    }
  }

  rec.reverse();

  if (rec[0] != rec[1]) {
    for (var k = 0; k < rec.length; k++) {
      if (i % 2 == 0) {
        rec[k] = rec[k] + ':30';
      } else {
        rec[k] = rec[k] + ':00';
      }
    }
  } else {
    for (var n = 0; n < rec.length; n++) {
      if (n % 2 == 0) {
        rec[n] = rec[n] + ':00';
      } else {
        rec[n] = rec[n] + ':30';
      }
    }
  }
  return rec;
}

var index = 1;

//页面轮播显示
function loop() {
  Timer = setTimeout(function () {
    show(index);
    index++;
    if (index == $_picn) {
      index = 0;
    }
    loop();
  }, 1e3 * 60 * 3);
}

function show(index) {
  $(".tab li").removeClass("checked").eq(index).addClass("checked");
  $(".page").eq(index).animate({
    opacity: '1',
    zIndex: '9'
  }, 500).siblings(".page").animate({
    opacity: '0',
    zIndex: '-1'
  }, 500);
}

$('.tab').hover(function () {
  clearInterval(Timer);
}, function () {
  loop();
});
$(".tab").on('click', ' li', function () {
  var ind = $(this).index() - 1;
  $(".tab li").removeClass("checked").eq(ind).addClass("checked");
  $(".page").eq(ind).animate({
    opacity: '1',
    zIndex: '9'
  }, 500).siblings(".page").animate({
    opacity: '0',
    zIndex: '-1'
  }, 500);
  index = ind + 1 < $_picn ? ind + 1 : 0;
});


//全屏启动
function requestFullScreen(element) {
  var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
  if (requestMethod) {
    requestMethod.call(element);
  } else if (typeof window.ActiveXObject !== "undefined") {
    var wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }
}






function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}



function generateId() {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var tmpid = [];
  var r;
  tmpid[8] = tmpid[13] = tmpid[18] = tmpid[23] = '-';
  tmpid[14] = '4';

  for (var i = 0; i < 36; i++) {
    if (!tmpid[i]) {
      r = 0 | Math.random() * 16;
      tmpid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
    }
  }
  document.cookie = "name=" + tmpid.join('');
}


function watermark(settings) {
  //默认设置
  var defaultSettings = {
    watermark_txt: "text",
    watermark_x: 20, //水印起始位置x轴坐标
    watermark_y: 80, //水印起始位置Y轴坐标
    watermark_rows: 10, //水印行数
    watermark_cols: 10, //水印列数
    watermark_x_space: 140, //水印x轴间隔
    watermark_y_space: 100, //水印y轴间隔
    watermark_color: '#aaa', //水印字体颜色
    watermark_alpha: 0.4, //水印透明度
    watermark_fontsize: '18px', //水印字体大小
    watermark_font: '微软雅黑', //水印字体
    watermark_width: 120, //水印宽度
    watermark_height: 30, //水印长度
    watermark_angle: 20 //水印倾斜度数
  };
  //采用配置项替换默认值，作用类似jquery.extend
  if (arguments.length === 1 && typeof arguments[0] === "object") {
    var src = arguments[0] || {};
    for (var key in src) {
      if (src[key] && defaultSettings[key] && src[key] === defaultSettings[key])
        continue;
      else if (src[key])
        defaultSettings[key] = src[key];
    }
  }

  var oTemp = document.createDocumentFragment();

  //获取页面最大宽度
  var page_width = Math.max(document.body.scrollWidth, document.body.clientWidth);
  //获取页面最大长度
  var page_height = Math.max(document.body.scrollHeight, document.body.clientHeight);

  //如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
  if (defaultSettings.watermark_cols == 0 || (parseInt(defaultSettings.watermark_x + defaultSettings.watermark_width * defaultSettings.watermark_cols + defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1)) > page_width)) {
    defaultSettings.watermark_cols = parseInt((page_width - defaultSettings.watermark_x + defaultSettings.watermark_x_space) / (defaultSettings.watermark_width + defaultSettings.watermark_x_space));
    defaultSettings.watermark_x_space = parseInt((page_width - defaultSettings.watermark_x - defaultSettings.watermark_width * defaultSettings.watermark_cols) / (defaultSettings.watermark_cols - 1));
  }
  //如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
  if (defaultSettings.watermark_rows == 0 || (parseInt(defaultSettings.watermark_y + defaultSettings.watermark_height * defaultSettings.watermark_rows + defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1)) > page_height)) {
    defaultSettings.watermark_rows = parseInt((defaultSettings.watermark_y_space + page_height - defaultSettings.watermark_y) / (defaultSettings.watermark_height + defaultSettings.watermark_y_space));
    defaultSettings.watermark_y_space = parseInt(((page_height - defaultSettings.watermark_y) - defaultSettings.watermark_height * defaultSettings.watermark_rows) / (defaultSettings.watermark_rows - 1));
  }
  var x;
  var y;
  for (var i = 0; i < defaultSettings.watermark_rows; i++) {
    y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i;
    for (var j = 0; j < defaultSettings.watermark_cols; j++) {
      x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j;

      var mask_div = document.createElement('div');
      mask_div.id = 'mask_div' + i + j;
      mask_div.className = 'mask_div';
      mask_div.appendChild(document.createTextNode(defaultSettings.watermark_txt));
      //设置水印div倾斜显示
      mask_div.style.webkitTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
      mask_div.style.MozTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
      mask_div.style.msTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
      mask_div.style.OTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
      mask_div.style.transform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
      mask_div.style.visibility = "";
      mask_div.style.position = "absolute";
      mask_div.style.left = x + 'px';
      mask_div.style.top = y + 'px';
      mask_div.style.overflow = "hidden";
      mask_div.style.zIndex = "999";
      //mask_div.style.border="solid #eee 1px";
      mask_div.style.opacity = defaultSettings.watermark_alpha;
      mask_div.style.fontSize = defaultSettings.watermark_fontsize;
      mask_div.style.fontFamily = defaultSettings.watermark_font;
      mask_div.style.color = defaultSettings.watermark_color;
      mask_div.style.textAlign = "center";
      mask_div.style.width = defaultSettings.watermark_width + 'px';
      mask_div.style.height = defaultSettings.watermark_height + 'px';
      mask_div.style.display = "block";
      oTemp.appendChild(mask_div);
    }
  }
  document.body.appendChild(oTemp);
}

function huanBis(dom, data) {
  if (data[1]) {
    $('#' + dom + '+em').html('↑' + fprice(data[2], 2) + '%');
    $('#' + dom + '+em').css('color', 'green');
  } else {
    $('#' + dom + '+em').html('↓' + fprice(data[2], 2) + '%');
    $('#' + dom + '+em').css('color', 'red');
  }
}

function fnSelect(dom, data, val) {
  data.forEach((v, i) => {
    $('#' + dom).append('<option value="' + v + '">' + v + '</option>');
    $("#" + dom).val(val);
  });
}

function fnRadio(dom, data, val) {
  data.forEach((item, index) => {
    if (val === item) {
      $('#' + dom).prev('ul').append('<label for="' + dom + index + '"><input id="' + dom + index + '" name="' + dom + '" type="radio" value="' + item + '" checked/>' + item + '</label>');
    } else {
      $('#' + dom).prev('ul').append('<label for="' + dom + index + '"><input id="' + dom + iindex + '" name="' + dom + '" type="radio" value="' + item + '" />' + v + '</label>');
    }
  });
}

//checked
function fPermission(phoneNum, aPermissions) {
  // $.ajax({
  //   url: 'http://60.205.6.0:4104/access',
  //   type: 'get',
  //   dataType: 'json',
  //   data: {
  //     "phoneNum": phoneNum
  //   },
  //   success: function (data) {
  var data = {
    access: [
      [],
      [1, 2]
    ]
  };
  var hivePermis = data.access[1];
  for (var i = 0; i < hivePermis.length; i++) {
    if (orOnline[hivePermis[i]]) {
      hivePermiss.push(hivePermis[i]);
    }
  }
  var len = hivePermiss.length;
  $_picn = len;
  $('.tab').hover(function () {
    $(this).css('height', 0.64 * (len + 1) + 'rem');
  }, function () {
    $(this).css('height', '.64rem');
  });
  hivePermis.map(function (v, i) {
    var aMessage;
    if (i == 0) {
      $('.tab').append(`<li class="checked">${aPermissions[v * 1 - 1].chinaName}</li>`);
      var l = aPermissions[v * 1 - 1].message.length;
      aMessage = aPermissions[v * 1 - 1].message;
      for (var ind = 0; ind < l; ind++) {
        aObj.push(aMessage[ind]);
      }
    } else {
      $('.tab').append(`<li>${aPermissions[v * 1 - 1].chinaName}</li>`);
      var len = aPermissions[v * 1 - 1].message.length;
      aMessage = aPermissions[v * 1 - 1].message;
      for (var _index = 0; _index < len; _index++) {
        aObj.push(aMessage[_index]);
      }
    }
    if (i == 4) {
      //数字跳动
      var options = {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.'
      };

      var numberChange0 = new CountUp('numberChange0', 0, 0, 0, 2.5, options);
      var numberChange1 = new CountUp('numberChange1', 0, 0, 0, 2.5, options);
      var numberChange2 = new CountUp('numberChange2', 0, 0, 2, 2.5, options);

      numberChange0.start();
      numberChange1.start();
      numberChange2.start();

      $.ajax({
        type: 'get',
        dataType: 'jsonp',
        jsonp: 'callback',
        url: 'http://60.205.6.0:31018/monitor/api/stzdh/v6/first',
        success: function (json) {
          var aData = json.data;
          numberChange0.update(aData[0][0]);
          huanBis('numberChange0', aData[0]);
          numberChange1.update(aData[1][0]);
          huanBis('numberChange1', aData[1]);
          numberChange2.update(aData[2][0]);
          huanBis('numberChange2', aData[2]);



          setInterval(() => {
            $.ajax({
              type: 'get',
              dataType: 'jsonp',
              jsonp: 'callback',
              url: 'http://60.205.6.0:31018/monitor/api/stzdh/v6/first',
              success: function (json) {
                var aData = json.data;
                numberChange0.update(aData[0][0]);
                huanBis('numberChange0', aData[0]);
                numberChange1.update(aData[1][0]);
                huanBis('numberChange1', aData[1]);
                numberChange2.update(aData[2][0]);
                huanBis('numberChange2', aData[2]);
              }
            });
          }, 1e3 * 60 * 5);
        }
      });

    }
    $('.visualArea').append(aPermissions[v * 1 - 1].html);
    $('.visualArea>div').css({
      'opacity': '0',
      'zIndex': '-1'
    });
    $('.visualArea>div:eq(0)').css({
      'opacity': '1',
      'zIndex': '9'
    });
  });
  aObj.map((item, i) => {
    fuAjaxChart(item);
  });
  setTimeout(() => {
    loop(); //启动轮播
  }, 1e3 * 2);
}
// });
// }

function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}
