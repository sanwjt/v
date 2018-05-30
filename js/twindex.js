


// var ResourceLoader=function(){var self=this;var repImg=/\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/i;var repCss=/\.css$/i;var repScript=/\.js$/i;self.loaded=0;self.total=0;var head=document.querySelector('head');for(var i=0;i<arguments.length;i++){var url=arguments[i];var elem;if(repImg.test(url)){elem=new Image();needAppend=true;elem.src=url}else if(repCss.test(url)){elem=document.createElement('link');elem.setAttribute('href',url);elem.setAttribute('rel','stylesheet');head.appendChild(elem)}else if(repScript.test(url)){elem=document.createElement('script');elem.src=url;head.appendChild(elem)}if(elem){self.total++;elem.addEventListener('load',function(){self.loaded++;self.onchange&&self.onchange(self.loaded/self.total)});elem.addEventListener('error',function(){self.loaded++;self.onchange&&self.onchange(self.loaded/self.total)})}}}
// function gS(s){return document.querySelector(s);}
// var Gpath='img/';
// var loader = new ResourceLoader(
//     Gpath+'hualian1.jpg',
//     Gpath+'hualian2.jpg',
//     Gpath+'hualian3.jpg',
//     Gpath+'kending1.jpg',
//     Gpath+'kending2.jpg',
//     Gpath+'kending3.jpg',
//     Gpath+'pingxi1.jpg',
//     Gpath+'pingxi2.jpg',
//     Gpath+'pingxi3.jpg',
//     Gpath+'taibei1.jpg',
//     Gpath+'taibei2.jpg',
//     Gpath+'taibei3.jpg',
//     Gpath+'shakebg.jpg',
// );
// var nowNum=0;
// var sfwc=false;
// loader.onchange = function(num){
//     var _num=parseInt(num*100);
//     if(flag)window.clearInterval(flag);
//     var n=nowNum;
//     var flag=window.setInterval(function(){
//         if(n>=_num){
//             window.clearInterval(flag);
//             nowNum=_num;
//             return;
//         }else{
//             ++n;
//             //需要显示百分比的地方

//             $('.percent').html (n+"%");
//             if(n==100){
//                 $('.loading').css({
//                     alert(1)
//                     'display': 'none',
//                 });
//                 $('.page1').show();
//             }
//         };
//     },20);
// }

// var u = navigator.userAgent;
// var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
// var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
// alert('是否是Android：'+isAndroid);
// alert('是否是iOS：'+isiOS);

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
    var myShakeEvent = new Shake({threshold: 15});
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
            // timesParam:[
            //     {name:'showSkipBtn',time:1}
            //     ],//
            // onTimes: function (name) {
            //    console.log(name)
            //     switch (name)
            //     {
            //         case 'showSkipBtn':
            //             //to do;
            //             document.getElementById('toEnd').style.display='block';
            //             break;
            //     }
            // },//[可选],video currenttime回调;
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
    $('.goshare').click(function() {
            $('.fixed').css({
        'display': 'block',

            });
    });
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

// 再次启程
$('.goindex').click(function() {

         window.location.replace('index.html');
        // alert(1);
    });
    // 一起看分享
    $('.goshare').click(function() {
            $('.fixed').css({
        'display': 'block',

            });
    });
 $('.fixed').click(function(event) {
        $('.fixed').hide();
 });



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
