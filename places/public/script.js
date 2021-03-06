'use strict';

var header = document.querySelector('header');
var hr = document.getElementsByTagName('h2');

var swiperPreBtn = document.querySelector('.swiper-button-prev');
var swiperNextBtn = document.querySelector('.swiper-button-next');
var swiperGroup1 = document.querySelector('.swiper-group1');
var swiperGroup2 = document.querySelector('.swiper-group2');
var swiperGroup3 = document.querySelector('.swiper-group3');
var swiperGroup4 = document.querySelector('.swiper-group4');
var swiperGroup5 = document.querySelector('.swiper-group5');

var dragSlider = document.querySelector('.drag-wrapper');
var dragPreBtn = document.querySelector('.drag-button-prev');
var dragNextBtn = document.querySelector('.drag-button-next');
var dragGroup1 = document.querySelector('.drag-group1');
var dragGroup2 = document.querySelector('.drag-group2');
var dragGroup3 = document.querySelector('.drag-group3');
var dragGroup4 = document.querySelector('.drag-group4');

var origin = document.querySelector('.origin-input');
var destination = document.querySelector('.destination-input');
var originList = document.querySelector('.origin-list');
var destinationList = document.querySelector('.destination-list');

// 스크롤시 header 배경색 변경
function scrollHandler() {
  var mainPhrase = document.querySelector(".control-header-point");
  var controlHeaderPoint = mainPhrase.offsetTop;
  var scrollPosition = window.pageYOffset;

  // header 관련 로직
  if (scrollPosition > controlHeaderPoint) {
    header.classList.add('dark-header');
  } else if (scrollPosition < controlHeaderPoint && scrollPosition !== 0) {
    header.classList.remove('dark-header');
  } else {
    return;
  }

  // 스크롤시 fade in 
  animationHandler();
}

var currentPosition = void 0;

function isElementUnderBottom(elem, triggerDiff) {
  var _elem$getBoundingClie = elem.getBoundingClientRect(),
      top = _elem$getBoundingClie.top;

  var _window = window,
      innerHeight = _window.innerHeight;

  currentPosition = top;
  return top > innerHeight + (triggerDiff || 0);
}

function animationHandler() {
  var elems = document.querySelectorAll('.fade-in');
  var LeftToRight = document.querySelectorAll('.left-to-right');
  var RightToLeft = document.querySelectorAll('.right-to-left');
  var expandPic = document.querySelectorAll('.expand');

  for (var i = 0; i < expandPic.length; i++) {
    if (isElementUnderBottom(expandPic[i], -20)) {
      expandPic[i].style.opacity = "0";
      expandPic[i].style.transform = 'scale(0.96, 0.96)';
    } else {
      expandPic[i].style.opacity = "1";
      expandPic[i].style.transform = 'scale(1)';
      expandPic[i].style.transition = 'all 1s ease';
    }
  }

  for (var _i = 0; _i < LeftToRight.length; _i++) {
    if (isElementUnderBottom(LeftToRight[_i], -20)) {
      LeftToRight[_i].style.opacity = "0";
      LeftToRight[_i].style.transform = 'translateX(-60px)';
    } else {
      LeftToRight[_i].style.opacity = "1";
      LeftToRight[_i].style.transform = 'translateX(0px)';
      LeftToRight[_i].style.transition = 'all 1s ease';
    }
  }

  for (var _i2 = 0; _i2 < RightToLeft.length; _i2++) {
    if (isElementUnderBottom(RightToLeft[_i2], -20)) {
      RightToLeft[_i2].style.opacity = "0";
      RightToLeft[_i2].style.transform = 'translateX(60px)';
    } else {
      RightToLeft[_i2].style.opacity = "1";
      RightToLeft[_i2].style.transform = 'translateX(0px)';
      RightToLeft[_i2].style.transition = 'all 1s ease';
    }
  }

  for (var _i3 = 0; _i3 < elems.length; _i3++) {
    if (isElementUnderBottom(elems[_i3], -20)) {
      elems[_i3].style.opacity = "0";
      elems[_i3].style.transform = 'translateY(30px)';
    } else {
      elems[_i3].style.opacity = "1";
      elems[_i3].style.transform = 'translateY(0px)';
      elems[_i3].style.transition = 'all 1s ease';
    }
  }
}

// drag 슬라이더 함수

var isDown = false;
var startX = void 0;
var scrollLeft = void 0;

dragSlider.scrollLeft = 0;
var clickNum = 0;

function dragSlide(e) {
  isDown = true;
  dragSlider.classList.add('active');
  startX = e.pageX - dragSlider.offsetLeft;
  scrollLeft = dragSlider.scrollLeft;
}

function cancelDrag() {
  isDown = false;
  dragSlider.classList.remove('active');
}

function mouseDrag(e) {
  var currentBtn = document.querySelector('.clicked');

  dragSlider.style.cursor = 'grabbing';
  if (!isDown) {
    return;
  }
  e.preventDefault();
  var x = e.pageX - dragSlider.offsetLeft;
  var walk = x - startX;
  var val = scrollLeft - walk;
  dragSlider.scrollLeft = val;
  dragSlider.style.scrollBehavior = 'auto';

  if (dragSlider.scrollLeft > 0 && dragSlider.scrollLeft < 1000) {
    currentBtn.classList.remove('clicked');
    dragGroup1.classList.add('clicked');
  } else if (dragSlider.scrollLeft >= 1000 && dragSlider.scrollLeft < 2007) {
    currentBtn.classList.remove('clicked');
    dragGroup2.classList.add('clicked');
  } else if (dragSlider.scrollLeft >= 2007 && dragSlider.scrollLeft < 2263) {
    currentBtn.classList.remove('clicked');
    dragGroup3.classList.add('clicked');
  } else if (dragSlider.scrollLeft >= 2263) {
    currentBtn.classList.remove('clicked');
    dragGroup4.classList.add('clicked');
  } else {
    return;
  }
};

function controlsSlider(num) {
  var currentBtn = document.querySelector('.clicked');
  var base = 336;
  dragSlider.scrollLeft = base * num;
  dragSlider.style.scrollBehavior = 'smooth';

  if (dragSlider.scrollLeft === 0) {

    currentBtn.classList.remove('clicked');
    dragGroup1.classList.add('clicked');
  } else if (dragSlider.scrollLeft === base * 3) {

    currentBtn.classList.remove('clicked');
    dragGroup2.classList.add('clicked');
  } else if (dragSlider.scrollLeft === base * 6) {

    currentBtn.classList.remove('clicked');
    dragGroup3.classList.add('clicked');
  } else if (num === 7) {

    currentBtn.classList.remove('clicked');
    dragGroup4.classList.add('clicked');
  } else {
    return;
  }
}

function getNextDragSlider() {

  if (clickNum < 7) {
    clickNum = clickNum + 1;
    controlsSlider(clickNum);
  } else {
    return;
  }
};

function getPrevDragSlider() {
  if (dragSlider.scrollLeft > 0) {
    clickNum === 0 ? clickNum : clickNum - 1;
    controlsSlider(clickNum);
  } else {
    return;
  }
};

function handleDragSlider(e) {
  var currentBtn = document.querySelector('.clicked');
  var target = e.target.classList.toString();
  var base = 336;
  dragSlider.style.scrollBehavior = 'smooth';

  if (target.indexOf('drag-group1') > -1) {
    clickNum = 0;
    dragSlider.scrollLeft = 0;

    currentBtn.classList.remove('clicked');
    dragGroup1.classList.add('clicked');
  } else if (target.indexOf('drag-group2') > -1) {
    clickNum = 3;
    dragSlider.scrollLeft = base * clickNum;

    currentBtn.classList.remove('clicked');
    dragGroup2.classList.add('clicked');
  } else if (target.indexOf('drag-group3') > -1) {
    clickNum = 6;
    dragSlider.scrollLeft = base * clickNum;

    currentBtn.classList.remove('clicked');
    dragGroup3.classList.add('clicked');
  } else if (target.indexOf('drag-group4') > -1) {
    clickNum = 7;
    dragSlider.scrollLeft = base * clickNum;

    currentBtn.classList.remove('clicked');
    dragGroup4.classList.add('clicked');
  } else {
    return;
  }
}

// swiper 슬라이드 함수 


var swiperNum = 0;

function handleSwiper(e) {
  var swiperSlider = document.querySelector('.swiper-wrapper');
  var currentBtn = document.querySelector('.selected');
  var target = e.target.classList.toString();
  var baseDistance = -320;
  var val = void 0;
  if (target.indexOf('swiper-group1') > -1) {
    swiperNum = 0;
    val = -20;

    currentBtn.classList.remove('selected');
    swiperGroup1.classList.add('selected');
  } else if (target.indexOf('swiper-group2') > -1) {
    swiperNum = 3;
    val = swiperNum * baseDistance + 5;

    currentBtn.classList.remove('selected');
    swiperGroup2.classList.add('selected');
  } else if (target.indexOf('swiper-group3') > -1) {
    swiperNum = 6;
    val = swiperNum * baseDistance + 12;

    currentBtn.classList.remove('selected');
    swiperGroup3.classList.add('selected');
  } else if (target.indexOf('swiper-group4') > -1) {
    swiperNum = 9;
    val = swiperNum * baseDistance + 18;

    currentBtn.classList.remove('selected');
    swiperGroup4.classList.add('selected');
  } else if (target.indexOf('swiper-group5') > -1) {
    swiperNum = 12;
    val = swiperNum * baseDistance + 22;

    currentBtn.classList.remove('selected');
    swiperGroup5.classList.add('selected');
  }

  swiperSlider.style.transform = 'translateX(' + val + 'px)';
  swiperSlider.style.transition = 'all 1.3s ease';
}

function getPrevSwiper() {
  var swiperSlider = document.querySelector('.swiper-wrapper');
  var currentBtn = document.querySelector('.selected');
  var baseDistance = -320;
  var val = void 0;
  swiperNum = swiperNum - 1;

  switch (swiperNum) {
    case 0:
      {
        break;
      }
    case 1:
      {
        val = 0;
        currentBtn.classList.remove('selected');
        swiperGroup1.classList.add('selected');
        break;
      }
    case 2:
      {

        val = swiperNum * baseDistance;
        break;
      }
    case 3:
      {

        val = swiperNum * baseDistance + 3;
        break;
      }
    case 4:
      {

        val = swiperNum * baseDistance + 5;

        currentBtn.classList.remove('selected');
        swiperGroup2.classList.add('selected');
        break;
      }
    case 5:
      {

        val = swiperNum * baseDistance + 7;

        break;
      }
    case 6:
      {

        val = swiperNum * baseDistance + 12;
        break;
      }
    case 7:
      {

        val = swiperNum * baseDistance + 12;

        currentBtn.classList.remove('selected');
        swiperGroup3.classList.add('selected');
        break;
      }
    case 8:
      {

        val = swiperNum * baseDistance + 15;

        break;
      }
    case 9:
      {

        val = swiperNum * baseDistance + 15;

        break;
      }
    case 10:
      {

        val = swiperNum * baseDistance + 18;

        currentBtn.classList.remove('selected');
        swiperGroup4.classList.add('selected');
        break;
      }
    case 11:
      {

        val = swiperNum * baseDistance + 22;
        break;
      }case 12:
      {

        val = swiperNum * baseDistance + 22;
        break;
      }
    case 13:
      {

        val = swiperNum * baseDistance + 22;
        break;
      }
    default:
      break;
  }

  swiperSlider.style.transform = 'translateX(' + val + 'px)';
  swiperSlider.style.transition = 'all 0.2s linear';
}

function getNextSwiper() {
  var swiperSlider = document.querySelector('.swiper-wrapper');
  var currentBtn = document.querySelector('.selected');
  var baseDistance = -320;
  var val = void 0;
  swiperNum = swiperNum + 1;

  switch (swiperNum) {
    case 0:
      {
        val = swiperNum * baseDistance;
        break;
      }
    case 1:
      {
        val = swiperNum * baseDistance;
        break;
      }
    case 2:
      {
        val = swiperNum * baseDistance + 3;

        currentBtn.classList.remove('selected');
        swiperGroup2.classList.add('selected');
        break;
      }
    case 3:
      {
        val = swiperNum * baseDistance + 5;

        break;
      }
    case 4:
      {
        val = swiperNum * baseDistance + 7;

        break;
      }
    case 5:
      {
        val = swiperNum * baseDistance + 12;

        currentBtn.classList.remove('selected');
        swiperGroup3.classList.add('selected');
        break;
      }
    case 6:
      {
        val = swiperNum * baseDistance + 12;

        break;
      }
    case 7:
      {
        val = swiperNum * baseDistance + 15;

        break;
      }
    case 8:
      {
        val = swiperNum * baseDistance + 15;

        currentBtn.classList.remove('selected');
        swiperGroup4.classList.add('selected');
        break;
      }
    case 9:
      {
        val = swiperNum * baseDistance + 18;

        break;
      }
    case 10:
      {
        val = swiperNum * baseDistance + 22;

        break;
      }
    case 11:
      {
        val = swiperNum * baseDistance + 22;

        currentBtn.classList.remove('selected');
        swiperGroup5.classList.add('selected');
        break;
      }
    case 12:
      {
        val = swiperNum * baseDistance + 22;
        break;
      }

    default:
      break;
  }

  swiperSlider.style.transform = 'translateX(' + val + 'px)';
  swiperSlider.style.transition = 'all 0.2s linear';
}

// list option 열고 닫고 

var showDestinationList = false;
var showOriginList = false;

function openDestinationList() {

  var icon = document.querySelector('.to-arrow');

  if (!showDestinationList) {
    destinationList.style.display = 'block';
    originList.style.display = 'none';
    icon.style.transform = 'rotate(180deg)';
    origin.style.border = '1px solid #d1d1d1';
    showDestinationList = true;
    showOriginList = false;
  } else {
    destinationList.style.display = 'none';
    icon.style.transform = 'rotate(360deg)';
    destination.style.border = '1px solid #09c752';
    showDestinationList = false;
  }
}

function openOriginList() {

  var icon = document.querySelector('.from-arrow');

  if (!showOriginList) {
    originList.style.display = 'block';
    destinationList.style.display = 'none';
    icon.style.transform = 'rotate(180deg)';
    destination.style.border = '1px solid #d1d1d1';
    showOriginList = true;
    showDestinationList = false;
  } else {
    originList.style.display = 'none';
    icon.style.transform = 'rotate(360deg)';
    origin.style.border = '1px solid #09c752';

    showOriginList = false;
  }
}

window.addEventListener('scroll', scrollHandler);

dragGroup1.addEventListener('click', handleDragSlider);
dragGroup2.addEventListener('click', handleDragSlider);
dragGroup3.addEventListener('click', handleDragSlider);
dragGroup4.addEventListener('click', handleDragSlider);

swiperGroup1.addEventListener('click', handleSwiper);
swiperGroup2.addEventListener('click', handleSwiper);
swiperGroup3.addEventListener('click', handleSwiper);
swiperGroup4.addEventListener('click', handleSwiper);
swiperGroup5.addEventListener('click', handleSwiper);

swiperPreBtn.addEventListener('click', getPrevSwiper);
swiperNextBtn.addEventListener('click', getNextSwiper);

dragPreBtn.addEventListener('click', getPrevDragSlider);
dragNextBtn.addEventListener('click', getNextDragSlider);

dragSlider.addEventListener('mouseup', cancelDrag);
dragSlider.addEventListener('mouseleave', cancelDrag);
dragSlider.addEventListener('mousedown', dragSlide);
dragSlider.addEventListener('mousemove', mouseDrag);

origin.addEventListener('click', openOriginList);
destination.addEventListener('click', openDestinationList);
