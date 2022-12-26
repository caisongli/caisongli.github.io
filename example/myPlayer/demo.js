/*  clock */
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');

/*  play button */
const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const playBtn = document.querySelector('.circle__btn');
const wave1 = document.querySelector('.circle__back-1');
const wave2 = document.querySelector('.circle__back-2');
const bthChange1 = document.querySelector('.btn__primary') //切歌
const bthChange2 = document.querySelector('.btn__secondary') // 重放

/*  rate slider */
const container = document.querySelector('.slider__box');
const btn = document.querySelector('.slider__btn');
const color = document.querySelector('.slider__color');
const tooltip = document.querySelector('.slider__tooltip');

/* 倒计时容器 */
const dateBox = document.querySelector('.nowDate');

// 获取歌词容器
const ul = $("#lrclist")[0];//获取ul

//主题按钮
const switch_1 = $('#switch-1')[0]

const switch_2 = $('#switch-2')[0]

clock = () => {
  let today = new Date();
  let h = (today.getHours() % 12) + today.getMinutes() / 59; // 22 % 12 = 10pm
  let m = today.getMinutes(); // 0 - 59
  let s = today.getSeconds(); // 0 - 59

  h *= 30; // 12 * 30 = 360deg
  m *= 6;
  s *= 6; // 60 * 6 = 360deg

  rotation(hours, h);
  rotation(minutes, m);
  rotation(seconds, s);

  // call every second
  setTimeout(clock, 500);
}

rotation = (target, val) => {
  target.style.transform = `rotate(${val}deg)`;
}

window.onload = clock();

let audio = document.getElementById('audio');

dragElement = (target, btn) => {
  target.addEventListener('mousedown', (e) => {
    onMouseMove(e);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  });

  onMouseMove = (e) => {
    e.preventDefault();
    let targetRect = target.getBoundingClientRect();
    let x = e.pageX - targetRect.left + 10;
    if (x > targetRect.width) { x = targetRect.width };
    if (x < 0) { x = 0 };
    btn.x = x - 10;
    btn.style.left = btn.x + 'px';

    // get the position of the button inside the container (%)
    let percentPosition = (btn.x + 10) / targetRect.width * 100;

    // color width = position of button (%)
    color.style.width = percentPosition + "%";

    // move the tooltip when button moves, and show the tooltip
    tooltip.style.left = btn.x - 5 + 'px';
    tooltip.style.opacity = 1;

    // show the percentage in the tooltip
    tooltip.textContent = Math.round(percentPosition) + '%';
    console.log(tooltip.textContent);
    audio.volume = Math.round(percentPosition) / 100
  };

  onMouseUp = (e) => {
    window.removeEventListener('mousemove', onMouseMove);
    tooltip.style.opacity = 0;

    btn.addEventListener('mouseover', function () {
      tooltip.style.opacity = 1;
    });

    btn.addEventListener('mouseout', function () {
      tooltip.style.opacity = 0;
    });
  };
};

dragElement(container, btn);

/*  play button  */
// 歌曲列表
let musicList = [
  {
    name:'失语者',
    url:'https://dl.stream.qqmusic.qq.com/M500003NhXRd1tWQKY.mp3?guid=859192147&vkey=AF571CB57161C6CD6F9F9A0C10AA75B80DA15D9CBEB939E7EFDB67DD0B77FC0AA5B9A9F6CC617E2873599BE74A14EDA0F4CCCD46E8D8D9CD&uin=&fromtag=120042'
  },
  {
    name:'我以为忘了想念',
    url:'https://dl.stream.qqmusic.qq.com/M500000Q4A4i1Orj7a.mp3?guid=1387828158&vkey=5EF0EB8ED60F2571E22BD0C04192F9FC46C3D6AA27E0AA7263EEF20DCA43F8D547F13F9773C0EDBBD0DD23CD9B4122F8598FD9277351EEAD&uin=&fromtag=120042'
  },
  {
    name:'搁浅',
    url:'https://dl.stream.qqmusic.qq.com/M500000rxj631zM9ua.mp3?guid=69932300&vkey=34B287007BE0345BFD27A3A8BAAEC8ED9C03517A22EC280E1F4BD8F8AAD9959F6F40BDDE8516300187C1F27E9962DC672C19E4FC6D487E3B&uin=&fromtag=120042'
  },
  {
    name:'把回忆拼好给你',
    url:'https://dl.stream.qqmusic.qq.com/M500000hHSFB0L29tq.mp3?guid=1031316101&vkey=4838F3471C27ADAEEA3A6638D0C064373BBB9AB4676F24BFC3AC2CF46F35F54BDE58E4F0E04D752BD9B8722B3754FB4CAADB082AEE037755&uin=&fromtag=120042'
  },
  {
    name:'水星记',
    url:'https://dl.stream.qqmusic.qq.com/M500000y9XtW2r4pcP.mp3?guid=639531518&vkey=24737E8523D6A16AF91E742F61F48E4D02E7C804EBA6948C37C3D42D32A89A47AAA3BA40875C219738A28203FEED578EABF671CC9F722A0F&uin=&fromtag=120042'
  },
  {
    name:'千年泪',
    url:'https://dl.stream.qqmusic.qq.com/M5000009fvJN3P2xm0.mp3?guid=2065885985&vkey=1647F244BA06E583AA4BD3CF7D7D5FF58F6850C308243797AE5B07C0CA6D4C5E8C1F945947A8332433F586F919A841E6ABE4F8CF28768035&uin=&fromtag=120042'
  },
  {
    name:'如果声音不记得',
    url:'https://dl.stream.qqmusic.qq.com/M500003AhbMH0rFPJ0.mp3?guid=849270996&vkey=523B04A661D0E526CC31AC9B281CB435BCB395969C4BBC2FA4C908152C65399FEEFA389C635B2B19E2B671D5BC7548C728EF4949EF45FF51&uin=&fromtag=120042'
  },
]

// 歌词
let lrcList = [
  ["[00:00.00]失语者(治愈版) - Zkaaai","[00:00.13]词：小寒","[00:00.19]曲：蔡健雅","[00:00.27]编曲：伍威","[00:00.34]原唱：蔡健雅","[00:00.43]吉他：伍威","[00:00.51]制作人：刘羽伦","[00:00.62]和声：陈聆子","[00:00.71]混音/母带：刘羽伦","[00:00.84]总监：刘凯","[00:00.92]企划：方国庆","[00:01.01]统筹：芭芭拉","[00:01.10]发行人：方国庆","[00:01.20]宣传 推广：『会火 · 音乐推』@小程序","[00:01.45]【词曲已获授权】","[00:01.97]都怪我觉悟得太迟","[00:04.99]结束了爱你才开始","[00:07.82]","[00:09.85]如此讽刺","[00:13.96]","[00:15.22]我们总在 爱情里死不悔改","[00:21.68]选择苦挨 放逐他漂流人海","[00:27.62]把想说的 变胡扯","[00:30.95]一个个的失语者","[00:34.22]But we are","[00:36.41]","[00:37.08]We are no better","[00:41.93]","[00:49.28]那就不坚持 只好这样子","[00:54.90]","[00:55.82]爱失去延续的价值","[00:59.80]","[01:01.99]你我既炼不成钻石","[01:04.61]","[01:05.48]像揉皱锡箔纸","[01:07.97]","[01:09.62]不够奢侈","[01:12.69]","[01:15.23]和平不争执 就放开彼此","[01:20.76]","[01:21.61]是因为骄傲或潜意识","[01:25.67]","[01:27.95]想假装高尚的仁慈","[01:30.58]","[01:31.44]真心话都禁止","[01:34.09]","[01:35.58]不可一世","[01:40.07]","[01:41.23]我们总在 爱情里死不悔改","[01:47.67]选择苦挨 放逐他漂流人海","[01:53.63]把想说的 变胡扯","[01:56.89]一个个的失语者","[01:59.60]","[02:00.13]But we are","[02:01.97]","[02:03.00]We are no better","[02:07.62]我们总在 爱情里死不悔改","[02:13.03]","[02:13.57]选择苦挨 放逐他漂流人海","[02:19.02]","[02:19.59]把想说的 变胡扯","[02:22.81]一个个的失语者","[02:25.57]","[02:26.09]But we are","[02:28.21]","[02:29.04]We are no better","[02:33.75]总在爱情里我看不明白","[02:38.89]","[02:39.54]既然有爱 好歹也说个明白","[02:45.09]","[02:45.60]我嘲笑着 失败者","[02:48.77]是眼睁睁放手的","[02:51.38]","[02:52.06]But we are","[02:54.18]","[02:55.02]We are no better","[02:59.74]","[03:05.82]No better","[03:07.17]No better","[03:08.82]No better"],
  ["[00:00.00]我以为忘了想念 - 听特碎碎念","[00:00.22]词：盛哲","[00:00.28]曲：盛哲","[00:00.30]原曲：在你的身边 - 盛哲","[00:00.32]我以为忘了想念","[00:04.86]而面对夕阳希望你回到今天","[00:15.07]我记得捧你的脸","[00:19.66]在双手之间安静地看你的眼","[00:28.04]像秋天落叶温柔整个世界","[00:37.30]我想在你的身边","[00:44.48]我以为忘了想念","[00:48.88]而面对夕阳希望你回到今天","[00:59.05]我记得捧你的脸","[01:03.71]在双手之间安静地看你的眼","[01:11.87]像秋天落叶"],
  ["[00:00.00]搁浅 - 王浩然","[00:01.16]词：宋健彰","[00:02.33]曲：周杰伦","[00:03.49]编曲：杨阳","[00:04.66]原唱：周杰伦","[00:05.83]音乐总监：梁翘柏","[00:06.99]吉他:许德治TigeHui/Tommy@ZolarWind","[00:08.16]打击乐：王宏涛","[00:09.32]和声：樊竹青/曾嵘/柳静/毕见晟","[00:10.49]弦乐：靳海音®弦乐团","[00:11.66]PGM:孔潇一","[00:12.82]Bass:王笑冬","[00:13.99]鼓手：郝稷伦","[00:15.15]长号:TERENCE","[00:16.32]小号:Angus Gomm","[00:17.49]久未放晴的天空","[00:21.24]依旧留着你的笑容","[00:25.65]哭过却无法掩埋歉疚","[00:32.97]风筝在阴天搁浅","[00:36.87]想念还在等待救援","[00:41.25]我拉着线","[00:44.07]复习你给的温柔","[00:47.79]暴晒在一旁的寂寞","[00:51.81]笑我给不起承诺","[00:55.17]怎么会怎么会","[00:57.78]你竟原谅了我","[01:02.28]我只能永远读着对白","[01:06.87]读着我给你的伤害","[01:10.65]我原谅不了我","[01:13.41]就请你当作我已不在","[01:17.94]我睁开双眼看着空白","[01:22.53]忘记你对我的期待","[01:26.48]读完了依赖","[01:29.12]我很快就离开","[01:55.34]久未放晴的天空","[01:59.23]依旧留着你的笑容","[02:03.50]哭过却无法掩埋歉疚","[02:10.95]风筝在阴天搁浅","[02:14.81]想念还在等待救援","[02:19.19]我拉着线","[02:21.92]复习你给的温柔","[02:25.59]暴晒在一旁的寂寞","[02:29.64]笑我给不起承诺","[02:32.88]怎么会怎么会","[02:35.58]你竟原谅了我","[02:40.02]我只能永远读着对白","[02:44.67]读着我给你的伤害","[02:48.45]我原谅不了我","[02:51.24]就请你当作我已不在","[02:55.71]我睁开双眼看着空白","[03:00.30]忘记你对我的期待","[03:04.17]读完了依赖","[03:06.87]我很快就","[03:10.38]我只能永远读着对白","[03:16.00]读着我给你的伤害","[03:19.81]我原谅不了我","[03:22.61]就请你当作我已不在","[03:27.15]我睁开双眼看着空白","[03:31.64]忘记你对我的期待","[03:35.61]读完了依赖","[03:38.22]我很快就离开"],
  ["[00:00.00]把回忆拼好给你 (Live) - cici_","[00:00.20]词：童子-T/Shingo.S","[00:00.40]曲：童子-T","[00:00.60]原曲：总会有人捧着花向我走来","[00:00.80]独自收集两个人之间的回忆","[00:04.16]即使每当到这时候我都会哭泣","[00:07.60]为何一切","[00:09.24]变得如此","[00:11.01]无法回到过去","[00:14.35]但我仍愿意感谢你给过我爱情","[00:17.69]每一场风景都是我们爱的证明"],
  ["[00:00.00]水星记 - yihuik苡慧","[00:00.45]词：郭顶","[00:00.91]曲：郭顶","[00:01.37]原唱：郭顶","[00:01.83]还要多远才能进入你的心","[00:08.61]还要多久才能和你接近","[00:15.80]咫尺远近却","[00:18.11]无法靠近的那个人","[00:23.52]也等着和你相遇","[00:30.28]环游的行星","[00:33.74]怎么可以","[00:37.21]拥有你"],
  ["[00:00.00]千年泪 (Live) - 曹雨航","[00:00.16]词：李姚/吕建忠","[00:00.32]曲：吕建忠","[00:00.42]嘲笑的风 高唱的离别","[00:03.79]我却 听不见","[00:08.25]穿越千年的眼泪","[00:11.67]只有梦里看得见","[00:15.96]我多想再见你 哪怕一面"],
  ["[00:00.61]就让我对爱投降","[00:07.29]让我步履成霜","[00:10.03]归途日暮中跌跌撞撞","[00:16.73]一天又一天 一年又一年","[00:20.16]心有惊鸿 身如灰雁","[00:23.59]离去的少年","[00:25.33]风尘仆仆 见字如面","[00:30.15]春风秋雨 落笔成念","[00:33.46]心花一朵 山野烂漫","[00:37.36]落叶的缠绵","[00:39.12]风的甘愿","[00:40.70]心的花园荒芜一片","[00:44.22]倒数的温暖","[00:52.29]誓言总贪婪无当","[00:55.75]对稻草紧抓不放","[00:58.90]月光把泪吹凉","[01:03.09]爱和恨天各一方"]
]
var currentLine = 0;//当前播放到哪一句了
playBtn.addEventListener('click', function (e) {
  e.preventDefault();
  pause.classList.toggle('visibility');
  play.classList.toggle('visibility');
  playBtn.classList.toggle('shadow');
  wave1.classList.toggle('paused');
  wave2.classList.toggle('paused');
  e.target.parentElement.classList.value !== 'ionicon s-ion-icon play visibility' ? audio.play() : audio.pause()
});

let index = 0;
bthChange1.addEventListener('click', function (e) {
  index++
  if (index < musicList.length) {
    audio.src = musicList[index].url
    // cleanMusicLrc()
    createLrcObj(lrcList[index])
  } else {
    index = 0
    audio.src = musicList[index].url
    createLrcObj(lrcList[index])
  }
  dateBox.innerHTML = musicList[index].name
  cleanMusicLrc()
  reloadHtml()
  
})

bthChange2.addEventListener('click', function (e) {
  audio.load() // 重播
  cleanMusicLrc()
})

audio.addEventListener('pause', function (e) {
  console.log('暂停了');
})

//设置进入全屏
let fullscreen;
let fsEnter = document.getElementById('fullscr');
fsEnter.addEventListener('click', function (e) {
  e.preventDefault();
  if (!fullscreen) {
    fullscreen = true;
    document.documentElement.requestFullscreen();
    fsEnter.innerHTML = "退出全屏";
  }
  else {
    fullscreen = false;
    document.exitFullscreen();
    fsEnter.innerHTML = "全屏";
  }
});
// 倒计时
const station = (x, y, z) => {
  //当前时间
  var now = Date.now(),
    //结束时间
    end = new Date(x, y - 1, z),
    ends = end.getTime();
  var ss = ends - now;
  var s = Math.floor(ss / 1000);
  //相差天数
  var day = Math.floor(s / 60 / 60 / 24);
  //相差小时数
  var hours = Math.floor(s / 60 / 60 % 24);
  //相差分钟数
  var min = Math.floor(s / 60 % 60);
  //相差秒数
  var sec = Math.floor(s % 60);
  var html = "距离元旦：" + day + "天" + hours + "时" + min + "分" + sec + "秒";
  // dateBox.innerHTML = html;
}

setInterval(function () {
  station(2022, 12, 31);
}, 1000);


let lrcArr = [];
var oLRC = {
  ti: "", //歌曲名
  ar: "", //演唱者
  al: "", //专辑名
  by: "", //歌词制作人
  offset: 0, //时间补偿值，单位毫秒，用于调整歌词整体位置
  ms: [] //歌词数组{t:时间,c:歌词}
};
function createLrcObj(lrc) {
  oLRC.ms = []
  if (lrc.length === 0) return;
  let lrcs 
  if(Array.isArray(lrc)){
    lrcs = lrc
  }else{
    lrcs = lrc.split('\n');//用回车拆分成数组
  }
  for (var i in lrcs) {//遍历歌词数组
    if (lrcs.hasOwnProperty(i)) {
      lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
      var t_lrc = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]"));//取[]间的内容
      var s_text = t_lrc.split(":");//分离:号前后的文字
      if (isNaN(parseInt(s_text[0]))) { //不是数值，基本上是歌曲名、作者等信息
        for (var j in oLRC) {
          if (j !== "ms" && j === s_text[0].toLowerCase()) {
            oLRC[j] = s_text[1];
          }
        }
      } else { //是数值，基本上就是歌词时间点
        var arr = lrcs[i].match(/\[(\d+:.+?)\]/g);//提取时间字段，可能有多个
        var start = 0;
        for (var lrc_position in arr) {
          if (arr.hasOwnProperty(lrc_position)) {
            start += arr[lrc_position].length; //计算歌词位置
          }
        }
        var content = lrcs[i].substring(start);//获取歌词内容
        for (var k in arr) {
          if (arr.hasOwnProperty(k)) {
            var t = arr[k].substring(1, arr[k].length - 1);//取[]间的内容
            var s = t.split(":");//分离:前后文字
            oLRC.ms.push({//对象{t:时间,c:歌词}加入ms数组
              t: parseFloat(s[0].substr(0, 2)) * 60 + parseFloat(s[1].substring(0, 6)),//注意转换成number格式
              c: content
            });
          }
        }
      }
    }
  }
}
//调用
createLrcObj(lrcList[0])

var lrcTime = [];//歌词对应的时间数组

var i = 0;

var $li = '';
function reloadHtml(){
  // ul.empty()
  ul.innerHTML = ''
  
  for (var n in oLRC.ms) {//遍历ms数组，把歌词加入列表
    ul.innerHTML += "<li><p>" + oLRC.ms[n].c + "</p></li>";//ul里填充歌词
  }
  //加入歌词时间
  for (var x = 0; x < oLRC.ms.length; x++) {
    lrcTime[x] = oLRC.ms[x].t;
  }
  
  lrcTime[lrcTime.length] = lrcTime[lrcTime.length - 1] + 3;//如不另加一个结束时间，到最后歌词滚动不到最后一句

  $li = $("#lrclist>li")


}
reloadHtml()

// var $li = $("#lrclist>li");//获取所有li
var currentTime;//当前播放的时间
var ppxx;//保存ul的translateY值

//audio时间改变事件
audio.ontimeupdate = function () {
  currentTime = audio.currentTime;
  // $li.remove( )
  for (j = currentLine, len = lrcTime.length; j < len; j++) {
    if (currentTime < lrcTime[j + 1] && currentTime > lrcTime[j]) {
      currentLine = j;
      ppxx = 30 - (currentLine * 32); //滚动位置
      ul.style.transform = "translateY(" + ppxx + "px)";
      $li.get(currentLine - 1).className = "";
      // console.log("on" + currentLine);
      // console.log($li.get(currentLine).innerHTML);
      // $li.get(currentLine).className = "on";
      $li.get(currentLine).classList.add('on');
      break;
    }
  }
};

//audio进度更改后事件
audio.onseeked = function () {
  currentTime = audio.currentTime;
  console.log("  off" + currentLine);
  $li.get(currentLine).className = "";
  for (k = 0, len = lrcTime.length; k < len; k++) {
    if (currentTime < lrcTime[k + 1] && currentTime < lrcTime[k]) {
      currentLine = k;
      break;
    }
  }
}

function cleanMusicLrc() {
  ul.style.transform = "translateY(0px)"
  currentLine = 0;//当前播放到哪一句了
  $li.removeClass('on')
}

//换背景颜色
let swichNum = 0
switch_1.addEventListener('click',function(){

 swichNum === 0 ? switchColor2() : switchColor1()

})

function switchColor1(){
  swichNum = 0
  $('body')[0].style.setProperty('--greyLight-1','#e4ebf5')
}
function switchColor2(){
  swichNum = 1
  $('body')[0].style.setProperty('--greyLight-1','#152a48')
}