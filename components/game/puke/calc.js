// 3D  排列3  计算注数 文件
class Calc_Zhushu_Obj {
    constructor() {
      this.tag_js = 'xypk'
    }
    //计算注数
    calcBetNum(playid, arr) {
      switch (playid) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            return this.calc_danchengzhu(arr)
        case 8:
            return this.clac_renxuanTwo(arr)
        case 9:
            return this.clac_renxuanThree(arr)
        case 10:
            return this.clac_renxuanFour(arr)
        case 11:
            return this.calc_renxuanfive(arr)
        case 12:
            return this.calc_renxuanSix(arr)
      }
    }
    //包选/单选/任选一注数计算
    calc_danchengzhu(length){
        return length;
    }
    //任选二
    clac_renxuanTwo(length){
        switch(length){
            case 1:
                this.zhushu = 0
                return 0
            case 2:
                this.zhushu = 1
                return 1
            case 3:
                this.zhushu = 3
                return 3
            case 4:
                this.zhushu = 6
                return 6
            case 5:
                this.zhushu = 10
                return 10
            case 6:
                this.zhushu = 15
                return 15
            case 7:
                this.zhushu = 21
                return 21
            case 8:
                this.zhushu = 21
                return 21
            case 9:
                this.zhushu = 36
                return 36
            case 10:
                this.zhushu = 45
                return 45
            case 11:
                this.zhushu = 55
                return 55
            case 12:
                this.zhushu = 66
                return 66
            case 13:
                this.zhushu = 78
                return 78
        }
    }

    // 任选三
    clac_renxuanThree(length){
        switch(length){
            case 1:
                this.zhushu = 0
                return 0
            case 2:
                this.zhushu = 0
                return 0
            case 3:
                this.zhushu = 1
                return 1
            case 4:
                this.zhushu = 4
                return 4
            case 5:
                this.zhushu = 10
                return 10
            case 6:
                this.zhushu = 20
                return 20
            case 7:
                this.zhushu = 35
                return 35
            case 8:
                this.zhushu = 56
                return 56
            case 9:
                this.zhushu = 84
                return 84
            case 10:
                this.zhushu = 120
                return 120
            case 11:
                this.zhushu = 165
                return 165
            case 12:
                this.zhushu = 220
                return 220
            case 13:
                this.zhushu = 286
                return 286
        }
    }

     // 任选四
     clac_renxuanFour(length){
        switch(length){
            case 1:
                this.zhushu = 0
                return 0
            case 2:
                this.zhushu = 0
                return 0
            case 3:
                this.zhushu = 0
                return 0
            case 4:
                this.zhushu = 1
                return 1
            case 5:
                this.zhushu = 5
                return 5
            case 6:
                this.zhushu = 15
                return 15
            case 7:
                this.zhushu = 35
                return 35
            case 8:
                this.zhushu = 70
                return 70
            case 9:
                this.zhushu = 126
                return 126
            case 10:
                this.zhushu = 210
                return 210
            case 11:
                this.zhushu = 330
                return 330
            case 12:
                this.zhushu = 495
                return 495
            case 13:
                this.zhushu = 715
                return 715
        }
     } 
      
    //  任选五
    calc_renxuanfive(length){
        switch(length){
            case 1:
                this.zhushu = 0
                return 0
            case 2:
                this.zhushu = 0
                return 0
            case 3:
                this.zhushu = 0
                return 0
            case 4:
                this.zhushu = 0
                return 0  
            case 5:
            this.zhushu = 1
            return 1
            case 6:
            this.zhushu = 6
            return 6
            case 7:
            this.zhushu = 21
            return 21
            case 8:
            this.zhushu = 56
            return 56
            case 9:
            this.zhushu = 126
            return 126
            case 10:
            this.zhushu = 252
            return 252
            case 11:
            this.zhushu = 462
            return 462
            case 12:
            this.zhushu = 792
            return 792
            case 13:
            this.zhushu = 1287
            return 1287
        }
    }

    //任选六
    calc_renxuanSix(length){
        switch(length){
            case 1:
                this.zhushu = 0
                return 0
            case 2:
                this.zhushu = 0
                return 0
            case 3:
                this.zhushu = 0
                return 0
            case 4:
                this.zhushu = 0
                return 0
            case 5:
                this.zhushu = 0
                return 0
            case 6:
            this.zhushu = 1
            return 1
            case 7:
            this.zhushu = 7
            return 7
            case 8:
            this.zhushu = 28
            return 28
            case 9:
            this.zhushu = 84
            return 84
            case 10:
            this.zhushu = 210
            return 210
            case 11:
            this.zhushu = 462
            return 462
            case 12:
            this.zhushu = 924
            return 924
            case 13:
            this.zhushu = 1716
            return 1716
        }
    }
    
  }
  
  export default new Calc_Zhushu_Obj()
  