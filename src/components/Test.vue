<template>
    <ul id="main">
      <li v-for="(item, index) in circleData" :key="index" :class="{'active': item.is_latest_sign_user}">
        <div>
          <span>{{ item.nick_name }}</span>
          <span>签到</span>
        </div>
      </li>
    </ul>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        circleData: [],
        circleDom: [],
        circleArr: [],
        //初始化运动的最大宽和高，初始定义0
        maxW: 0,
        maxH: 0,
        timer: null,
        timerArr: [],
        count: 0,
      };
    },
    mounted() {
      this.getLatest_sign_users('init')
      this.timer = setInterval((i) => {
        this.count++
        this.getLatest_sign_users()
      }, 5000)
    },
    methods: {
      getLatest_sign_users(type = '') {
        let data = []
        // nick_name: 用户名
        // is_latest_sign_user: 是否是新签到用户
        // gender: 0-女 1-男
        if (this.count === 0) {
          data = [
            {
              id: '1',
              nick_name: '萧一',
              is_latest_sign_user: true,
              gender: 0
            },
            {
              nick_name: '杨二',
              is_latest_sign_user: true,
              gender: 0
            },
            {
              nick_name: '张三',
              is_latest_sign_user: true,
              gender: 0
            }
          ]
        } else if (this.count === 1) {
          data = [
            {
              nick_name: '萧一',
              is_latest_sign_user: false,
              gender: 0
            },
            {
              nick_name: '杨二',
              is_latest_sign_user: false,
              gender: 0
            },
            {
              nick_name: '张三',
              is_latest_sign_user: false,
              gender: 0
            },
            {
              nick_name: '李四',
              is_latest_sign_user: true,
              gender: 1
            },
            {
              nick_name: '王五',
              is_latest_sign_user: true,
              gender: 0
            },
            {
              nick_name: '徐六',
              is_latest_sign_user: true,
              gender: 1
            },
            {
              nick_name: '刘七',
              is_latest_sign_user: true,
              gender: 1
            }
          ]
        } else if (this.count === 2) {
          data = [
            {
              nick_name: '萧一',
              is_latest_sign_user: false,
              gender: 0
            },
            {
              nick_name: '杨二',
              is_latest_sign_user: false,
              gender: 0
            },
            {
              nick_name: '张三',
              is_latest_sign_user: false,
              gender: 0
            },
            {
              nick_name: '李四',
              is_latest_sign_user: false,
              gender: 1
            },
            {
              nick_name: '王五',
              is_latest_sign_user: false,
              gender: 0
            },
            {
              nick_name: '徐六',
              is_latest_sign_user: false,
              gender: 1
            },
            {
              nick_name: '刘七',
              is_latest_sign_user: false,
              gender: 1
            },
            {
              nick_name: '何八',
              is_latest_sign_user: true,
              gender: 0
            },
            {
              nick_name: '柳九',
              is_latest_sign_user: true,
              gender: 0
            },
            {
              nick_name: '甄十',
              is_latest_sign_user: true,
              gender: 1
            },
            {
              nick_name: '十一',
              is_latest_sign_user: true,
              gender: 1
            },
            {
              nick_name: '十二',
              is_latest_sign_user: true,
              gender: 1
            }
          ]
        } else {
          data = [
            {
              nick_name: '萧一',
              is_latest_sign_user: false,
              gender: 0
            },
            {
              nick_name: '杨二',
              is_latest_sign_user: false,
              gender: 0
            },
            {
              nick_name: '张三',
              is_latest_sign_user: false,
              gender: 0
            },
            {
              nick_name: '李四',
              is_latest_sign_user: false,
              gender: 1
            },
            {
              nick_name: '王五',
              is_latest_sign_user: false,
              gender: 0
            },
            {
              nick_name: '徐六',
              is_latest_sign_user: false,
              gender: 1
            },
            {
              nick_name: '刘七',
              is_latest_sign_user: false,
              gender: 1
            },
            {
              nick_name: '何八',
              is_latest_sign_user: false,
              gender: 0
            },
            {
              nick_name: '柳九',
              is_latest_sign_user: false,
              gender: 0
            },
            {
              nick_name: '甄十',
              is_latest_sign_user: false,
              gender: 1
            },
            {
              nick_name: '十一',
              is_latest_sign_user: false,
              gender: 1
            },
            {
              nick_name: '十二',
              is_latest_sign_user: false,
              gender: 1
            }
          ]
        }
        this.circleData = [...data]
        if (type === 'init') {//初次加载时默认全是新增签到用户
          data.forEach(item => item.is_latest_sign_user = true)
        }
        this.$nextTick(() => {
          if (data.length) {
            this.initBubble()
          }
        })
      },
      initBubble() {
        let main = document.getElementById("main");
        let divDom = main.getElementsByClassName("active"); //获取新增加的dom
        if (!divDom.length) return;
  
        //清理每个球得定时器
        this.timerArr.forEach(item => {
          clearInterval(item)
        })
        this.timerArr = []
  
        //给新增加的dom设置宽高
        for (let i = 0; i < divDom.length; i++) {
          let colors = [
            "#EF250A",
            "#830AF6"
          ];
          divDom[i].style.boxShadow = "0 0 20px" + " " + colors[this.circleData[i].gender] + " " + "inset";
          // 10个以上尺寸变小
          divDom[i].style.width = "46px";
          divDom[i].style.height = "46px";
          divDom[i].style.fontSize = "12px";
          divDom[i].style.lineHeight = "16px";
          this.circleDom.push(divDom[i])
        }
  
        //根据浏览器窗口的大小自动调节小球的运动空间
        window.onresize = () => {
          this.maxW = main.clientWidth - divDom[0].clientWidth; //为了让小球不卡在浏览器边缘
          this.maxH = main.clientHeight - divDom[0].clientHeight; // 所以要减去自身的宽高
        };
        onresize();
  
        //数组对象的初始化
        for (let i = 0; i < this.circleDom.length; i++) {
          let obj = {};
          console.log(this.circleDom[i]);
          if (this.circleDom[i].getAttribute("class") === 'active') {
            obj.x = Math.floor(Math.random() * (this.maxW + 1)); //初始x坐标
            obj.y = Math.floor(Math.random() * (this.maxH + 1)); //初始y坐标
            obj.cx = obj.x + this.circleDom[0].offsetWidth / 2;//圆心x坐标
            obj.cy = obj.y + this.circleDom[0].offsetHeight / 2;//圆心y坐标
            obj.movex = Math.floor(Math.random() * 2); //x轴移动方向
            obj.movey = Math.floor(Math.random() * 2); //y轴移动方向
            obj.speed = 0.2; //随机速度
            obj.timer = null; //计时器
            obj.index = i; //索引值
            this.circleArr.push(obj)
            //小球位置初始化
            this.circleDom[i].style.left = obj.x + 'px';
            this.circleDom[i].style.top = obj.y + 'px';
          } else {
            //保留之前数据得位置信息，不刷新位置
            obj = this.circleArr[i]
          }
          this.move(obj);
        }
      },
  
      //移动函数
      move(balls) {
        //每个球单独有定时器
        balls.timer = setInterval(() => {
          if (balls.movex === 1) {
            //如果往右跑，则一直加速度，碰到边界，改为反方向运动
            balls.x += balls.speed;
            if (balls.x + balls.speed >= this.maxW) {
              //防止小球出界
              balls.x = this.maxW;
              balls.movex = 0; //小球运动方向发生改变
            }
          } else {
            balls.x -= balls.speed; // 1和0表示正反方向
            if (balls.x - balls.speed <= 0) {
              balls.x = 0;
              balls.movex = 1;
            }
          }
          if (balls.movey === 1) {
            balls.y += balls.speed;
            if (balls.y + balls.speed >= this.maxH) {
              balls.y = this.maxH;
              balls.movey = 0;
            }
          } else {
            balls.y -= balls.speed;
            if (balls.y - balls.speed <= 0) {
              balls.y = 0;
              balls.movey = 1;
            }
          }
          if (this.circleDom[balls.index]) {
            balls.cx = balls.x + this.circleDom[0].offsetWidth / 2;//小球圆心等于：运动中x的值加上自身的半径
            balls.cy = balls.y + this.circleDom[0].offsetHeight / 2;
            this.circleDom[balls.index].style.left = balls.x + "px"; //小球相对于屏幕的位置
            this.circleDom[balls.index].style.top = balls.y + "px";
            this.crash(balls.index); //每个小球进行碰撞检测
          }
        }, 25);
        this.timerArr.push(balls.timer)
      },
      //碰撞函数
      crash(a) {
        let container = [...this.circleArr]
        let ball1x = container[a].cx; //在数组中任意球的圆心坐标
        let ball1y = container[a].cy;//思路：先随便拿一个球，然后遍历所有球，拿这个球和所有球的圆心距离比较
        for (let i = 0; i < container.length; i++) {
          if (i !== a) { //判断取出来的球不是本身，才能和其他球进行距离判断
            let ball2x = container[i].cx; //将其他球的圆心坐标赋值给球2
            let ball2y = container[i].cy;
            //圆心距 求两个点之间的距离,开平方
            let distence = Math.sqrt((ball1x - ball2x) * (ball1x - ball2x) + (ball1y - ball2y) * (ball1y - ball2y));
            if (distence <= this.circleDom[0].offsetWidth) { //球心距离和求直径比较
              if (ball1x > ball2x) { //当前位于未知求的右方
                if (ball1y > ball2y) {//预设未知球撞当前球，然后当前球改变运动
                  container[a].movex = 1; //1表示为正值，对应的右和下
                  container[a].movey = 1;//0表示为负值，对应的左和上
                } else if (ball1y < ball2y) {
                  container[a].movex = 1;
                  container[a].movey = 0;
                } else {
                  container[a].movex = 1;
                }
              } else if (ball1x < ball2x) {
                if (ball1y > ball2y) {
                  container[a].movex = 0;
                  container[a].movey = 0;
                } else if (ball1y < ball2y) {
                  container[a].movex = 0;
                  container[a].movey = 1;
                } else {
                  container[a].movex = 0;
                }
              } else {
                if (ball1y > ball2y) {
                  container[a].movey = 1;
                } else if (ball1y < ball2y) {
                  container[a].movey = 0;
                }
              }
            }
          }
        }
      }
    },
    beforeDestroy() {
      //清理每个球得定时器
      this.timerArr.forEach(item => {
        clearInterval(item)
      })
      //清理签到数据
      clearInterval(this.timer)
    }
  };
  </script>
  <style lang='less' scoped>
  #main {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 0;
  
    li {
      position: absolute;
      overflow: hidden;
      -moz-border-radius: 50%;
      -webkit-border-radius: 50%;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
  
      &.active {
        animation: scaleBox 1s 1;
      }
  
      @keyframes scaleBox {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.2);
        }
        100% {
          transform: scale(1);
        }
      }
  
      div {
        span {
          display: block;
          width: 100%;
          color: #fff;
          text-align: center;
        }
      }
    }
  }
  </style>
  