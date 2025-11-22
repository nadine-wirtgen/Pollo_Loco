class StatusBar extends DrawableObject{
  IMAGES = [
    '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
    '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
    '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
    '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
    '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
    '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
  ];
  percentage = 100;

  constructor(){
    super();
    this.x = 100;
    this.y = 100;
    this.width = 200;
    this.height = 40;
    this.loadImages(this.IMAGES);
    this.setPercentage(100);
  }

  setPercentage(percentage){
    this.percentage = percentage;
    let imagePath = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[imagePath];
  }

  resolveImageIndex(){
    if(this.percentage == 100){
      return 5;
    } else if (this.percentage > 80){
      return 4;
    } else if (this.percentage > 60){
      return 3;
    } else if (this.percentage > 40){
      return 2;
    } else if (this.percentage > 20){
      return 1;
    } else {
      return 0;
    }
  }

}