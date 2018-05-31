


// 再次启程
$(function(){
    
$('.goindex').on('click',function(){
    alert(1)
    window.location.reload();
})
    // 一起看分享
$('.goshare').on('click',function(){

    $('.fixed').show();
})

$('.fixed').on('click',function(){

     $('.fixed').hide();
})



// 强制横竖屏

    var set = null;hs = false;
    $container = $("#container");
    $shuping =$(".shuping");
    function orientationF() {
        var html = document.documentElement;
        var w = html.clientWidth, h = html.clientHeight;
        if (h < w) {//横屏
            if(/iPad|iPhone|iPod/.test(navigator.userAgent)){
                videoPlayer&&videoPlayer.pause();
                $shuping.show();
            }
            html.style.fontSize = w / 1334 * 100 + "px";
            $shuping.css({ "width": "auto","height":"100%", "webkitTransform": "none", "transform": "none" });
            hs = false;

        }
        else {//竖屏
            if(/iPad|iPhone|iPod/.test(navigator.userAgent)){
                videoPlayer&&videoPlayer.play();
                $shuping.hide();
            }

            html.style.fontSize = h / 1334 * 100 + "px";
            $container.css({ "width": h,"height":w, "webkitTransform": "rotate(90deg) translate(0,-" + w + "px)", "transform": "rotate(90deg) translate(0,-" + w + "px)" });
            hs = true;
        }
    }

    function orientationfn() {
        clearTimeout(set);
        set = setTimeout(function () {
            orientationF()
        }, 500);
    }
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", orientationfn, false);
    orientationfn();



//换图片
function shakeChangeImg(index) {
    var myShakeEvent = new Shake({threshold: 4});
    myShakeEvent.start();
    window.addEventListener('shake', shakeEventDidOccur, false);
    function shakeEventDidOccur () {
        var  srcStr = '';
        if(index===0){
            srcStr='img/pingxi';
        }else if(index===1){
            srcStr='img/taibei';
        }else if(index===2){
            srcStr='img/hualian';
        }else if(index===3){
            srcStr='img/kending';
        }
        var oImg = Math.floor(Math.random()*3+1);
        $('.photoborder img').attr("src", srcStr+oImg+'.jpg');
        $('.result').show();

    };
}

//先加载视频组件配置
var srcArr=['http://data.video.qiyi.com/videos/other/20180530/f3/39/3569dac3d551948f5f83d8ae660ad52e.mp4?pv=0.2','http://data.video.qiyi.com/videos/other/20180530/d1/47/a856caa0384ecd855adb9e76b41ee014.mp4?pv=0.2','http://data.video.qiyi.com/videos/other/20180530/a1/7e/fb27af9be5eea069ad9ca91184d82eb8.mp4?pv=0.2','http://data.video.qiyi.com/videos/other/20180530/71/cd/d01464e44d65e0a1d4485bcf3e483ae6.mp4?pv=0.2'];
function videocontrol(src,index) {
    var videoPlayer=new MMD.VideoPlayer(
        {
            videoElement: document.getElementById('video'),//[必填],video元素;
            src: src,//[必填],video src;
            loop: false,//[可选],是否循环,默认false,true为循环;
            muted: false,//[可选],是否静音,默认false,IOS下只有IOS10生效,安卓生效;
            poster: '',//[可选],video默认图片;
            tryMultipleVideoPlayAtTheSameTime: true,//[可选],尝试同时播放多个视频,默认false;
            onStart: function () {
                console.log('video start');
                $('#animation_container').fadeOut(1000);
                $('.pass').css('display', 'block');

            },//[可选],video第一个画面出现回调;
            onEnd: function () {
                console.log('video end');
                $('.videobox').hide();
                $('.pass').hide();
                
                videoPlayer.pause();

                $('#shake').css('display', 'block');

                $('.shakeinner1').css('display', 'block');
                //		摇一摇功能
                shakeChangeImg(index);
            }
        });

    return videoPlayer;
}

// (function(){
//   var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
//   var ratio = window.devicePixelRatio || 1;
//   var screen = {
//     width : window.screen.width * ratio,
//     height : window.screen.height * ratio
//   };
//   if (iOS && screen.width == 1125 && screen.height === 2436) {
//     $('.video-box').addClass('on')//修复ipx横版bug
//   }else{
//   }
// })();
    // 再次启程
    // $('.goindex').click(function() {
    //
    //     window.location.replace('index.html');
    //      // alert(2);
    // });
    // 一起看分享
    // $('.goshare').click(function() {
    //         $('.fixed').css({
    //     'display': 'block',

    //         });
    // });
//[可选],video播放完成回调;

//点击按钮对应视频播放
var tagnum=0;
var videoPlayer = '';
var index = ''
$('.page1').children().click(function(){
    tagnum++;
    if(tagnum>1) return;
    $('#animation_container').fadeOut(1000);
	$(this).parent().fadeOut(1000);
	index=$(this).index();
    videoPlayer=videocontrol(srcArr[index],index);
    videoPlayer.play();
});


//跳过视频
$('.pass').on('click',function(){
    $('.videobox').hide();
    $('.pass').hide();
    videoPlayer.pause();
    $('#shake').css('display','block');
    $('.shakeinner1').css('display','block');
    // // 跳过视频  摇一摇功能
    shakeChangeImg(index)
});
})



// window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
//     if (window.orientation === 180 || window.orientation === 0) {
//         // alert('竖屏状态！');
//         $('.shuping').hide();
//     }
//     if (window.orientation === 90 || window.orientation === -90 ){
//         // alert('横屏状态！');
//         $('.shuping').show();
//         // $('.videobox').hide();
//         // $('#animation_container').hide();
//         // $('.page1').hide();
//         // $('.shakebox').hide();
//         // $('.fixed').hide();

//         setTimeout(function(){
//           $(location).attr({'href': 'index3.html',});  
//         },12000)
        
//     }
// }, false);
