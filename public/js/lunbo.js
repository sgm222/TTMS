/*
 *轮播图组件
 *author:sgm
 */
class Slider{
    constructor(id){
        this.container=document.getElementById(id);
        this.items=this.container.querySelectorAll('.list-item,.list-item-one');
    }
    getSelectorItem(){  //获得当前展示的图片
        let selected=this.container.querySelector('.list-item-one');
        return selected;
    }
    getSelectorItemIndex(){  //当前选中的图片的位置
        return Array.from(this.items).indexOf(this.getSelectorItem());
    }
    slideTo(idx){   //跳转到idx这一张图片
        let selected=this.getSelectorItem();
        if(selected){
            selected.className="list-item";
        }
        let item=this.items[idx];
        if(item){
            item.className="list-item-one";
        }
    } 
    slideNext(){   //下一张
        let currentIdx=this.getSelectorItemIndex();
        let nextIdx=(currentIdx+1)%this.items.length;
        this.slideTo(nextIdx);
    }
    slidePrevious(){   //上一张
        let currentIdx=this.getSelectorItemIndex();
        let previousIdx=(this.item.length+currentIdx-1)%this.items.length;
        this.slideTo(previousIdx);
    }

}

let slider=new Slider('list');
setInterval(slider.slideNext.bind(slider),3000);