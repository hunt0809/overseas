window.onload = function () {
  // $('#myDiv').html('3456')
  // moduleA.a()
  // $.ajax({
  //     type: 'get',
  //     url: '/exchangeApi/sto/rates',
  //     data: {
  //         assetCode: 'USDT'
  //     },
  //     success: function (res) {
  //         console.log(res)
  //     },
  // });
  var thisUrl = window.location.href;
  if (thisUrl.indexOf('?') > 0) {
    var arrUrl = thisUrl.split('?');
    if (arrUrl[1] == '1001') {
      alert('无效验证码！');
    } else if (arrUrl[1] == '1002') {
      alert('输入验证码错误，请重新输入！');
    } else if (arrUrl[1] == '1003') {
      alert('登录过期失效 ！');
    } else if (arrUrl[1] == '1004') {
      alert('参数为空！');
    } else if (arrUrl[1] == '1000') {
      alert('无效地址!');
    }
  }
  var Timer = null;
  var countdown = 120;
  var phoneVal = null;
  $('button:eq(0)').on('click', function () {
    phoneVal = $('#phoneNum').val();
    var len = phoneVal.length;
    if (typeof (phoneVal * 1) != 'number' || len != 11) {
      $('#phoneNum').val('');
      alert('手机号码错误，请重新输入！');
    } else {
      $.ajax({
        url: '/code/santi-dzh',
        type: 'POST',
        dataType: 'text',
        data: {
          phoneNum: phoneVal
        },
        success: function (data) {
          var str = data;
          if (str == 'error1' || str == 'error2') {
            alert('该手机未注册，请联系管理员注册！');
          } else {
            $('button:eq(0)').css({
              'background': 'rgba(0, 0, 0, .2)',
              'color': '#000'
            });
            $('button:eq(0)').attr("disabled", true);
            machineCode(data);
            Timer = setInterval(function () {
              if (countdown >= 0) {
                $('button:eq(0)').html(countdown);
                countdown--;
              } else {
                $('button:eq(0)').html('再次获取');
                countdown = 120;
                $('button:eq(0)').css({
                  'background': '#2BBBAD',
                  'color': '#fff'
                });
                $('button:eq(0)').attr("disabled", false);
                clearInterval(Timer);
              }
            }, 1000);
          }
        }
      });
    }
  });
  $('button:eq(1)').on('click', function () {
    phoneVal = $('#phoneNum').val();
    var val = $('#authCode').val();
    var len = val.length;
    if (phoneVal.length == 0) {
      alert('请输入手机号并获取验证码！');
      return false;
    } else if (typeof (val * 1) != 'number') {
      alert('请重新输入验证码');
      return false;
    } else if (len == 0) {
      alert('请输入验证码');
      return false;
    } else if (i == 60) {
      $('#phoneNum').val('');
      $('#authCode').val('');
      alert('请获取验证码！');
      return false;
    } else {
      var machineNum = $('.machineNum').val();
      $.ajax({
        url: '/indonesia',
        type: 'GET',
        dataType: 'json',
        data: {
          phoneNum: phoneVal,
          authCode: val,
          machineCode: machineNum
        }
      });
    }
  });
};

function machineCode(data) {
  $('.machineNum').val(data);
}
