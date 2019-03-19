function setBallList(playid, labels) {
  labels = labels ?
    Array.isArray(labels) ?
    labels :
    labels.length ?
    labels.split("") :
    [] :
    null;
    /******** 基础数据准备 **********/
    // 包选
  const productNum = (playid) => {
    let arr = [];
    switch(playid){
      case 1:
      arr = [
        { 
          card:[
            { lizi:'如',
              name:'对子',
              val:[
                {cardItem:'A',type:'spade'}, 
                {cardItem:'A',type:'heart'},
                {cardItem:'3',type:'heart'}
              ]
           }
          ]
        },
        {
          card:[
            { 
              name:'顺子',
              lizi:'如',
              val:[
                {cardItem:'A',type:'spade'},
                {cardItem:'2',type:'plum'},
                {cardItem:'3',type:'heart'}
              ]
            }
          ]
        },
        {
          card:[
            {
              name:'同花',
              lizi:'如',
              val:[
                {cardItem:'A',type:'spade'},
                {cardItem:'3',type:'spade'},
                {cardItem:'4',type:'spade'}
              ]
            }
          ]
        },
        { 
          card:[
            {
              name:'豹子',
              lizi:'如',
              val:[
                {cardItem:'A',type:'spade'},
                {cardItem:'A',type:'heart'},
                {cardItem:'A',type:'plum'}
              ]
            }
          ]
        },
        { 
          card:[
            {
              name:'同花顺',
              lizi:'如',
              val:[
                {cardItem:'A',type:'heart'},
                {cardItem:'2',type:'heart'},
                {cardItem:'3',type:'heart'}
              ]
            }
          ]
        }
      ]
      return arr;

      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      arr = [
        { name:'豹子',
          wanfa:'dx_bz',
          card:[
            {val:['A','A','A'],name:'AAA'},
            {val:['2','2','2'],name:'222'},
            {val:['3','3','3'],name:'333'},
            {val:['4','4','4'],name:'444'},
            {val:['5','5','5'],name:'555'},
            {val:['6','6','6'],name:'666'},
            {val:['7','7','7'],name:'777'},
            {val:['8','8','8'],name:'888'},
            {val:['9','9','9'],name:'999'},
            {val:['10','10','10'],name:'10 10 10'},
            {val:['J','J','J'],name:'JJJ'},
            {val:['Q','Q','Q'],name:'QQQ'},
            {val:['K','K','K'],name:'KKK'}
          ]
        },
        { name:'对子',
          wanfa:'dx_dz',
          card:[
            {val:['A','A'],name:'A A'},
            {val:['2','2'],name:'2 2'},
            {val:['3','3'],name:'3 3'},
            {val:['4','4'],name:'4 4'},
            {val:['5','5'],name:'5 5'},
            {val:['6','6'],name:'6 6'},
            {val:['7','7'],name:'7 7'},
            {val:['8','8'],name:'8 8'},
            {val:['9','9'],name:'9 9'},
            {val:['10','10'],name:'10 10'},
            {val:['J','J'],name:'J J'},
            {val:['Q','Q'],name:'Q Q'},
            {val:['K','K'],name:'K K'}
          ]
        },
        { name:'顺子',
          wanfa:'dx_sz',
          card:[
            {val:['A','2','3'],name:'A23'},
            {val:['2','3','4'],name:'234'},
            {val:['3','4','5'],name:'345'},
            {val:['4','5','6'],name:'456'},
            {val:['5','6','7'],name:'567'},
            {val:['6','7','8'],name:'678'},
            {val:['7','8','9'],name:'789'},
            {val:['8','9','10'],name:'8 9 10'},
            {val:['9','10','J'],name:'9 10 J'},
            {val:['10','J','Q'],name:'10 J Q'},
            {val:['J','Q','K'],name:'JQK'},
            {val:['Q','K','A'],name:'QKA'},
          ]
        },
        { name:'同花',
          card:[
            {val:'spade',name:'黑桃'},
            {val:'heart',name:'红心'},
            {val:'plum',name:'梅花'},
            {val:'block',name:'方块'}
          ]
        },
        { name:'同花顺',
          wanfa:'dx_ths',
          card:[
           {val:'spade',name:'黑桃'},
           {val:'heart',name:'红心'},
           {val:'plum',name:'梅花'},
           {val:'block',name:'方块'}
          ]
        },
      ]
      return arr;

      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
        arr = [
          {
            name:'任选',
            wanfa:'rx',
            card:[
              {val:'A',name:'A'},
              {val:'2',name:'2'},
              {val:'3',name:'3'},
              {val:'4',name:'4'},
              {val:'5',name:'5'},
              {val:'6',name:'6'},
              {val:'7',name:'7'},
              {val:'8',name:'8'},
              {val:'9',name:'9'},
              {val:'10',name:'10'},
              {val:'J',name:'J'},
              {val:'Q',name:'Q'},
              {val:'K',name:'K'}
            ]
          }
        ]
      return arr;
    }
  }
  
  const defaultFunc = (playid, type) => {
    let arr = productNum(playid)
    if(playid==1){
      return arr.map((item, index) => {
        return item.card.map((val,valIndex) => {
          return {
            label: val,
            value: index,
            selected: false,
            odds: false,
            name:val.name
          }
        })
      });
    }else{
      return arr.map((item, index) => {
        return item.card.map((val,valIndex) => {
          return {
            label: val,
            value: valIndex,
            selected: false,
            odds: false,
            name:val.name
          }
        })
      });
    }
  };
  /******* 渲染界面的数据 ********/
  const render_temp = [
    {
      option: defaultFunc(playid),
    }
  ]
  return render_temp
}

export default setBallList;
