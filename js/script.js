(function () {
  //面向对象（组合模式）
  function Puzzle() {//放私有属性
    this.ctx = canvas.getContext("2d");//画笔
    this.imgList = document.querySelectorAll('img');
    this.imgArray = Array.from(this.imgList);
  }
  Puzzle.prototype = {
    //初始化（进行图片的切图并导出）
    init: function (url) {
      var img = new Image();
      img.src = url;
      img.onload = function () {
        this.randomImg();
        this.renderImg(img);
        this.dragEvent();
      }.bind(this);
      this.renderImg(img);
    },
    //进行图片的切图并导出
    renderImg: function (image) {
      var index = 0;
      for(var i = 0; i < 3; i++ ){//y的坐标变化
        for(var j = 0; j < 3; j++){
          //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
          this.ctx.drawImage(image, 300 * j, 300 * i, 300, 300, 0, 0, 150, 150);
          //将画布导出为图片
          this.imgArray[index].src = canvas.toDataURL('images/jpeg');
          this.imgArray[index].id = index;
          index++;
        }
      }
    },
    //图片的随机排序
    randomImg: function () {
      //Array.prototype.slice.call();
     this.imgArray.sort(function () {
       return Math.random() - Math.random();
     })
    },
    //拖拽事件
    dragEvent: function () {
     //事件代理
     var contain = document.getElementById("game");
     contain.addEventListener('dragstart', function (e) {
       var target = e.target;
       if(target.tagName.toLowerCase() == 'img'){
         e.dataTransfer.setData('id', target.id);
       }
     }, false);

      contain.addEventListener('dragover', function (e) {
        e.preventDefault();//阻止dragover默认事件的发生，才可以发生drop事件
      }, false);

      contain.addEventListener('drop', function (e) {
        var target = e.target;
        if(target.tagName.toLowerCase() == 'img'){
          var originObj = document.getElementById(e.dataTransfer.getData('id'));
          var endObj = e.target;
          [originObj.src, endObj.src] = [endObj.src, originObj.src];
          [originObj.id, endObj.id] = [endObj.id, originObj.id];
        }
      }, false);
    }
  }
  var puzzle = new Puzzle();
  puzzle.init('/jigsaw_puzzle/img/7.jpeg');
})();