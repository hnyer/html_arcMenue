
<!--弹窗测试，-->
<!--支持 Safari 、chrome、ie、360等浏览器， 有问题 加QQ群 341760213  讨论 。 -->


var imagecanvas = document.createElement('canvas');
  var imagecontext = imagecanvas.getContext('2d');
  window.addEventListener('load', showPeople);

  /***********************定义变量*****************************************************************************/
  /**div 整个人脸*/
  var people_lay= document.getElementById("id_people");

  /**背景*/
  var backGround = document.getElementById("id_back");


  /**减号按钮*/
  var lookback= document.getElementById("id_lookback");
  /**加号按钮*/
  var lookfowar= document.getElementById("id_lookfoward");
  /**弹窗的出现坐标*/
  var popLocationX ;
  var popLocationY ;
  /**当前选中哪个部位*/
  var currentPart=1;
  /**全局只允许有一个弹窗*/
  var hasPop= false;

  var div = document.getElementById("id_people");
  /**列表*/
  var myUl;


  /**添加点击事件*/
  lookfowar.addEventListener("click" ,lookforward) ;
  lookback.addEventListener("click" , lookbackpic ) ;
  /**给图层添加点击事件 并获取点击坐标*/
  people_lay.addEventListener("click" ,getLocation ) ;



/***********************定义方法*****************************************************************************/
  /**手指触摸效果*/
  lookfowar.addEventListener("touchstart" , function(){
    lookfowar.src="girl/lookfoward_img.png"
  });

  lookfowar.addEventListener("touchend" , function(){
    lookfowar.src="girl/lookfoward.png"
  });

  lookback.addEventListener("touchstart" , function(){
    lookback.src="girl/lookback_img.png"
  });
  lookback.addEventListener("touchend" , function(){
    lookback.src="girl/lookback.png"
  });
  /**鼠标点击效果*/
  lookfowar.addEventListener("mousedown" , function(){
    lookfowar.src="girl/lookfoward_img.png"
  });

  lookfowar.addEventListener("mouseup" , function(){
    lookfowar.src="girl/lookfoward.png"
  });

  lookback.addEventListener("mousedown" , function(){
    lookback.src="girl/lookback_img.png"
  });
  lookback.addEventListener("mouseup" , function(){
    lookback.src="girl/lookback.png"
  });

  /**获取点击坐标*/
  function  getLocation(event){
    popLocationX =event.clientX ;
    popLocationY= event.clientY ;
    if(hasPop){
      //如果已经有弹窗，就先关闭，清除
      closeAndHidePopWindow();
    }
    newPopWindow();
    $("#id_lookback").wheelmenu();
/********************a***************************************************/
  }//end getLocation

  /**
   * 添加弹窗、应用css
   */
  function  newPopWindow(){
    hasPop =true;
    myUl= document.createElement("ul");
    myUl.setAttribute("id", "myUl");
    myUl.style.listStyle="none";
    for(var i=1;i<=6;i++){
      addElementLi(i);
    }
   div.appendChild(myUl);
  }


  /**
   * 移除、隐藏弹窗
   */
  function  closeAndHidePopWindow(event){
    hasPop =false;
    div.removeChild(myUl);

  }

  /**
   * 动态添加元素
   * @param index
   */
  function addElementLi(index) {
    var li = document.createElement("li");
    //设置 li 属性，如 id
    li.setAttribute("id",  index);
    switch (index){
      case 1:
        li.innerHTML="<img src='girl/hair_pic.png'       width='80px' height='80px'>"
        break ;
      case 2:
        li.innerHTML="<img src='girl/face_pic.png'       width='80px' height='80px'>"
        break ;
      case 3:
        li.innerHTML="<img src='girl/glasses_pic.png'       width='80px' height='80px'>"
        break ;
      case 4:
        li.innerHTML="<img src='girl/ld_pic.png'       width='80px' height='80px'>"
        break ;
      case 5:
        li.innerHTML="<img src='girl/background_pic.png'       width='80px' height='80px'>"
        break ;
    }

   /**给每一个小按钮添加点击事件*/
    li.onclick= function(event){
      currentPart =li.id;
      //阻止冒泡
      event.stopPropagation();
      closeAndHidePopWindow();
    };
    myUl.appendChild(li);
  }




  /**向左切换图片*/
  function  lookbackpic(event){
    //阻止事件冒泡
    event.stopPropagation();
    var partCode = parseInt(currentPart);
    switch (partCode){

      case 5 :
        backGround.src="girl/background.jpg";
        break;
    }
  }//end  lookbackpic

  /**
   * 向右切换图片
   * */
  function  lookforward(event ){
    event.stopPropagation();
    var partCode = parseInt(currentPart);
    switch (partCode){
      case 5 :
        //background
        backGround.src="girl/background2.jpg";
        break;
    }
  }//lookforward





  /**
   * 加载人物图层 并显示
   */
  function  showPeople(){
  //查找标记位mask的所有元素
  var allElements= document.querySelectorAll('.mask') ;
  //[]就是个数组，而且是用不到的空数组。用来就是为了访问它的数组相关方法.这是一种简写
  //Array.prototype.forEach.call(allElements, function(img){
  var loadedSize = 0;
  [].forEach.call(allElements, function(img){
    var newImg = document.createElement('img');
    newImg.src = img.src;

    newImg.onload = function() {
      var width  = newImg.width;
      var height = newImg.height;
      var mask = document.createElement('img');
      mask.src = img.getAttribute('data-mask');
      mask.onload = function() {
        imagecanvas.width  = width;
        imagecanvas.height = height;
        //顺序的问题 ， 先 img ，后mask
        imagecontext.drawImage(img, 0, 0);
        imagecontext.globalCompositeOperation = 'destination-in';
        imagecontext.drawImage(mask, 0, 0, width, height);
        img.src = imagecanvas.toDataURL();
        loadedSize++ ;
        //if(loadedSize===2){
          var div_loading =document.getElementById("id_loading");
          div.removeChild(div_loading);
        //}//
      }
    }
  });
}//showPeople

/**11111111111111111111111111111*********************end定义方法*****************************************************************************/


  /**默认的配置*/
  var defaults = {
    animation: "fly",
    angle: [270,380]


  };
  /***********************定义方法*****************************************************************************/
  $.fn.centerAround = function (button) {

    this.css("position","fixed");
    this.css("left", popLocationX + "px");
    this.css("top", popLocationY + "px");
    //this.css("left", 200 + "px");
    //this.css("top", 800 + "px");
    return this;
  };


  /**
   * 弹窗展开的动画
   * @param el
   * @param button
   * @param width
   * @param height
   * @param angle
   * @param step
   * @param radius
   * @param settings
   */
  $.fn.flyIn = function (el, button, width, height, angle, step, radius, settings) {
    var d = 0;
    this.stop(true,true);
    this.each(function(index) {
      angle = (settings.angle[0] + (step * index)) * (Math.PI/180);
      var x = Math.round(  radius * Math.cos(angle)  );
      var y = Math.round(  radius * Math.sin(angle)  );

      $(this).animateRotate(360).css({
        position: 'absolute',
        opacity: 0,
        left: "50px",
        top: "50px"
        //marginLeft: "-" + 200,
        //marginTop: "-" + 0
      }).delay(d).animate({
        //不透明级别
        opacity:1,
        left: x + 'px',
        top: y + 'px'
      }, settings.animationSpeed[1]);
      d += settings.animationSpeed[0];
    });
  }




  /**
   * 弹窗关闭时的动画
   * @param el
   * @param button
   */
  $.fn.flyOut = function (el, button) {
    var d = 0;
    this.stop(true,true);
    $(this.get().reverse()).each(function() {
      $(this).animateRotate(-360).delay(d).animate({
        opacity:0,
        left: el.outerWidth() / 2 + "px",
        top: el.outerHeight() / 2 + "px"
      }, 150);
      d += 15;
    }).promise().done( function() {
      el.removeClass("active").css("visibility", "hidden").hide();
      button.removeClass("active")
    });
  } ;

  /**
   * 关闭弹窗
   * @param button
   * @param settings
   */
  $.fn.hideIcon = function (button, settings) {
    var fields = this.find("#myLi"),
        el = this;
    fields.flyOut(el, button);
  };


  /**
   * 展开弹窗
   * @param button
   * @param settings
   */
  $.fn.showIcon = function (button, settings) {
    var el = this;
    var zindex = '6';
    button.addClass("active").css({
      'z-index':zindex
    });

    el.show().css({
      position: 'absolute',
      'z-index': '5',
      'padding': '30px'
    }).centerAround(button);

    el.addClass("wheel active").css("visibility", "visible").show();

    /**圆弧半径*/
    var radius = 200;
    var fields = el.children("li");//children   find

    var width = 0,  height = 0, angle =  0;
    var  step = (settings.angle[1] - settings.angle[0]) / fields.length;
    fields.flyIn(el, button, width, height, angle, step, radius, settings) ;

  };// end showIcon


  /**
   * 旋转动画
   * @param angle
   * @param duration
   * @param easing
   * @param complete
   * @returns {*}
   */
  $.fn.animateRotate = function(angle, duration, easing, complete) {
    return this.each(function() {
      var $elem = $(this);

      $({deg: 0}).animate({deg: angle}, {
        duration: duration,
        easing: easing,
        step: function(now) {
          $elem.css({
            transform: 'rotate(' + now + 'deg)'
          });
        },
        complete: complete || $.noop
      });
    });
  };


  $.fn.wheelmenu = function( ){
    var settings = $.extend({}, defaults );
    // settings.animationSpeed = [75,700] ;//slow [75,700]  //fast [25,250];
    settings.animationSpeed =  [25,250] ;//slow [75,700]  //fast [25,250];


    if(popLocationX > 720/2  && popLocationY<1280/2){

      settings.angle ="SW"; //左下

    }else if(popLocationX > 720/2  && popLocationY>=1280/2){
      settings.angle ="NW"; //左上
    }else if(popLocationX <720/2  && popLocationY <1280/2){

      settings.angle ="SE"; //右下
    }else {
      settings.angle ="NE"; //右上
    }
    settings = setDirection(settings);

    var  myjquery= $(this);
    var myUL = $("#myUl");
    myUL.showIcon(myjquery, settings);//1

  };




  function setDirection (settings) {
        switch (settings.angle) {
          case 'NE':
            settings.angle = [270,380]
            break;
          case 'SE':
            settings.angle = [360,470]
            break;
          case 'SW':
            settings.angle = [90,200]
            break;
          case 'NW':
            settings.angle = [180,290]
            break;
        }
    return settings;
  }


  /***********************end定义方法*****************************************************************************/





