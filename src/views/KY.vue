<template>

        <div class="coniner">
            <div class="coniner_center">
                <div class="header_logo"></div>
                <div class="header_input">
                <input type="text" v-model="search " @keyup="keyup($event)" @keydown="keydown($event)" ref="search">
                </div>
                <div class="bau" @click="BD">自己百度</div>
                <div class="header_input_no" v-if="Judge">{{searchNo}}</div>
                <ul class="coniner_ul" v-if="UlArrJudge">
                <li  v-for="(item,index) in UlArr" :key="index" @click="cluck($event)">{{item}}</li>
                </ul>
            </div>
        </div>
</template>

<script>
    export default {
        name: "KY.vue",
        data(){
            return{
                search:'',
                searchNo:'暂未搜索到数据',
                UlArr:[],
                Judge:false,
                UlArrJudge:false,
                listIndex:-1  //设置初始索引，数组从0开始，因此初始值为-1
            }
        },
        mounted(){
            this.$refs.search.focus()
        },
        methods:{
            //这个函数我们在input标签输入关键词的时候不断的给百度服务器发送请求获取搜索词条，并且不断的复制给data中的数组arr
            keyup(event){
                //如果我按的是上下键，那么就不发送请求了
                if(event.keyCode==38 || event.keyCode==40 || event.keyCode==37 || event.keyCode== 39 ||event.keyCode== 32) return;
                const url=`${this.HOST}pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1420,21098,29523,29520,29098,29568,29220,26350,29072&wd=${this.search}`
                this.$ajax({
                    method:'get',
                    url:url,
                }).then((response) =>{          //这里使用了ES6的语法
                    //console.log(response.data.g)       请求成功返回的数据
                    //再复制之前先清除数组现有数据
                    this.UlArr.splice(0,this.UlArr.length)
                    const Arr=response.data.g;
                    if(Arr.length<1){
                            this.Judge=true
                    }else{
                        this.UlArrJudge=true
                        for(let i=0;i<Arr.length;i++){
                            this.UlArr.push(Arr[i].q)
                        }
                    }

                }).catch((error) =>{
                 //   console.log(error)       请求失败返回的数据
                })

            },
            keydown(event){
                //下键：40 上键：38
                if(event.keyCode==38){
                    this.listIndex --;
                    if(this.listIndex<0){
                        this.listIndex=this.UlArr.length-1

                    }
                    this.search=this.UlArr[this.listIndex]
                }else if(event.keyCode==40){
                    this.listIndex ++;
                    if(this.listIndex>this.UlArr.length-1){
                        this.listIndex=0
                    }
                    this.search=this.UlArr[this.listIndex];
                }else if(event.keyCode==13){
                    //如果你按的是enter，那么就跳转到百度搜索结果
                    window.open(`https://www.baidu.com/s?wd=${this.search}`)
                }
            },
            cluck(event){
                //监听鼠标的点击事件
                //如果点击某一行的空白处,则点击事件中的event.target.data代表关键词   undefined
                //如果鼠标点击某一行的文字，则点击事件中的event.target.innerText代表关键词  出现关键字
                console.log(event.target.innerText)
                if(event.target.data!=undefined){
                    this.search=event.target.data
                    window.open(`https://www.baidu.com/s?wd=${this.search}`)
                }else if(event.target.innerText!=undefined){
                    this.search=event.target.innerText
                    window.open(`https://www.baidu.com/s?wd=${this.search}`)
                }
            },
            BD(){
                window.open(`https://www.baidu.com/s?wd=${this.search}`)
            }
        },
        watch:{
            //
            // search: (val) => {
            //
            // }
        }

    }
</script>

<style scoped lang="scss">
.coniner{
    width:900px;
    height:700px;
    position: absolute;
    left:50%;
    top: 50%;
    margin-left: -450px;
    margin-top: -350px;
        .coniner_center{
            width: 500px;
            height:700px;
            margin: 0 auto;
            .header_logo{
                width: 500px;
                height: 300px;
                background: url("../assets/baidulogo.png");
            }
            .header_input{
                width: 500px;
                left:50%;

            }
            input{
                width: 396px;
                height: 25px;
                margin-top: 1rem;
                float: left;
            }
            .header_input_no{
                width: 496px;
                height: 25px;
                border: black solid 1px;
                border-top: none;
            }
            .coniner_ul{
                width: 396px;
                text-align: left;
                margin: 0 auto;
                float: left;
                list-style-type: none;
                border: solid 1px black;
                border-top: none;
                padding-left: 0;

            }
            .bau{
                background-color: yellowgreen;
                width: 100px;
                height: 30px;
                float: right;
                margin-top: 1rem;
                line-height: 30px;

            }

        }


    }
.coniner_ul>li:hover{
    background-color: #eee;
}
</style>