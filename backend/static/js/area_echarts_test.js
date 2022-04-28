var colors = [
    ["#1DE9B6", "#EBEBEB", "#9DFBF8", "#FDCA40", "#FB95D5", "#BDA29A", "#6E7074", "#546570", "#C4CCD3"],
    ["#37A2DA", "#67E0E3", "#32C5E9", "#9FE6B8", "#FFDB5C", "#FF9F7F", "#FB7293", "#E062AE", "#E690D1", "#E7BCF3", "#9D96F5", "#8378EA", "#8378EA"],
    ["#DD6B66", "#759AA0", "#E69D87", "#8DC1A9", "#EA7E53", "#EEDD78", "#73A373", "#73B9BC", "#7289AB", "#91CA8C", "#F49F42"],
    ['#3772FF','#DF2935','#FDCA40','#E6E8E6','#ADC6FF', '#F4B8BC', '#FEE9AE', '#FFFFFF', '#77EBF8', '#17BEBB', '#D2FDFF', '#ADFBFF','#3ABEFF', '#F4EC90']
];

var colorIndex = 0;


// setTimeout(function(){
$(function () {
    setInterval(map,10000);
    // map();
    function map() {

        //var timeChart = echarts.init(document.getElementById('echart1')); //初始化语言分布图
        var langChart = echarts.init(document.getElementById('echart2')); //初始化语言分布图
        //var sentChart = echarts.init(document.getElementById('echart4')); //初始化语言分布图
        var wordCloud = echarts.init(document.getElementById('echart5')); //初始化语言分布图
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('map_1'));

        //--------------------------- Variables Initialisation ---------------------------\\

        const mapData = [
            { name: 'adelaide', value: 9 },
            { name: 'brisbane', value: 12 },
            { name: 'darwin', value: 12 },
            { name: 'melbourne', value: 12 },
            { name: 'sydney', value: 14 }

        ];

        console.log(mapData[0].value)
        var categoryData = [];
        var barData = [];
        var langdis_data = [];
        //var timedis_data = [];
        //var sentdis_data = [];
        var tophashtags_data = [];
        var wordyearindex = 3, wordlocationindex = 0
  
        
        var convertData = function(data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name.toUpperCase(),
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        };
        
        // var piecolor=['#00ffff','#00cfff','#006ced','#ffe000','#ffa800','#ff5b00','#ff3000']
        // Language Distribution Pie Chart
        for (var i = 0; i < keys.length; i++) {
            var keyname = keys[i].toUpperCase(); 
            console.log(lang_data[i])
            langdis_data.push({
                name: keyname, //city
                type: 'pie',
                hoverAnimation: 'false',
                radius: ['30%', '52%'],
                center: ['50%', '50%'],
                color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab','#06b4ab','#06c8ab','#06dcab','#06f0ab'],
                data: lang_data[i], //.sort(function (a, b) { return a.value - b.value; }),
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label:{
                    color: 'rgba(255, 255, 255, 0.9)',
                    // formatter: "{b}:{c}({d}%)",
                    formatter: "{b}: {d}%",
                    emphasis: {
                    //The label style displayed by the mouse on the ring
                    show: true,
                    textStyle: {
                        // color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab','#06b4ab','#06c8ab','#06dcab','#06f0ab'],
                        fontSize: '13',
                        fontWeight: 'bold'
                        }   
                    }                   
                },

                labelLine: {
                    lineStyle: {
                        // color: 'rgba(255, 255, 255, 0.3)'
                    },
                    show: true,
                    smooth: 0.2,
                    length: 12,
                    length2: 18,
                    minTurnAngle: 0,
                    maxSurfaceAngle: 0
                },
                itemStyle: {
                    // color: '#00abff',
                    // normal: {
                    //     borderWidth: 1,
                    //     borderColor: '#ff9900',
                    // },
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    // label:{  
                    //     show:true,
                    //     position: 'outer',  
                    //     formatter:'{d}%'  
                    // }, 
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            })
        }
        
 
        
        // 饼状图配置
        var lang_option = {
            // backgroundColor: '#2c343c',
            title: {
                zlevel: 2,
                // z:3,
                text: langdis_data[0]['name'],
                top: 'middle',
                left: 'center',
                textStyle: {
                    color: '#fff',
                    fontSize: '18'
                }
            },
            toolbox: {
                feature: {
                    saveAsImage: {
                        pixelRatio: 2
                    }
                }
            },
          
            tooltip: {
                trigger: 'item',

            },

            series: [langdis_data[0]]
        };
        
 
        console.log(hashtags_data['adelaide'])
        var wordCloud_option = {
            title: {
                zlevel: 2,
                // z:3,
                
                text: keys[wordlocationindex].toUpperCase(),
                // top: '2%',
                left: 'center',
                top: '1%',
                textStyle: {
                    color: '#fff',
                    fontSize: '20'
                }
            },
            toolbox: {
                feature: {
                    saveAsImage: {
                        pixelRatio: 2
                    }
                }
            },
            tooltip: {
                show: true
            },
            series: {
            type: 'wordCloud',
            sizeRange: [30, 70],//文字范围
            //文本旋转范围，文本将通过rotationStep45在[-90,90]范围内随机旋转
            rotationRange: [-45, 90],
            rotationStep: 45,
            textRotation: [0, 45, 90, -45],
            shape: 'circle',
            textStyle: {
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                color: function(){
                    var color = ['#3772FF','#DF2935','#FDCA40','#E6E8E6','#ADC6FF', '#F4B8BC', '#FEE9AE', '#FFFFFF', '#77EBF8', '#17BEBB', '#D2FDFF', '#ADFBFF','#3ABEFF', '#F4EC90', '#DBB494']
                    return color[Math.floor(Math.random() * color.length)];
                }
            },
            emphasis: {
                focus: 'self',
    
                textStyle: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: hashtags_data[keys[wordlocationindex]]
            }
        };        
        //--------------------------- Charts Initialisation ---------------------------\\

        console.log(langdis_data[0])
        // 初始化数据
        langChart.setOption(lang_option);
        wordCloud.setOption(wordCloud_option);
        window.addEventListener("resize",function(){
            langChart.resize();
            wordCloud.resize();
        });


        optionXyMap01 = {
            
            baseOption: {
                animation: true,
                animationDuration: 1000,
                animationEasing: 'cubicInOut',
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'cubicInOut',
                grid: {
                    right: '3%',
                    top: '15%',
                    bottom: '65%',
                    width: '20%'
                },

                toolbox: {
                    feature: {
                        // dataZoom: {
                        //     yAxisIndex: false
                        // },
                        saveAsImage: {
                            pixelRatio: 2
                        }
                    }
                },
                geo: { //地图设置
                    // nameProperty: "STATE_NAME",
                    show: true,
                    map: 'australia',
                    roam: false,
                    zoom: 1,
                    layoutCenter: ['50%', '50%'],
                    // If width-height ratio is larger than 1, then width is set to be 100.
                    // Otherwise, height is set to be 100.
                    // This makes sure that it will not exceed the area of 100x100
                    layoutSize: 500,
                    // center: [133.7751, -25.2744],
                    tooltip: {
                        trigger: 'item',
                        formatter: (p) => {
                            let val = p.value[2];
                            if (window.isNaN(val)) {
                                val = 0;
                            }
                            let txtCon =
                                "<div style='text-align:left'>" + p.name + ":<br />Total Tweets：" + val.toFixed(2) + '</div>';
                            return txtCon;
                        }
                    },
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            // areaColor: '#4c60ff',
                            // borderColor: '#002097',
                            borderColor: 'rgba(147, 235, 248, 1)',
                            borderWidth: 1,
                            areaColor: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            },
                            shadowColor: 'rgba(128, 217, 248, 1)',
                            // shadowColor: 'rgba(255, 255, 255, 1)',
                            shadowOffsetX: -2,
                            shadowOffsetY: 2,
                            shadowBlur: 10
                        },
                        emphasis: {
                            // areaColor: '#293fff',
                            areaColor: '#389BB7',
                            borderWidth: 0
                        }
                    }
                },
            },
            options: []

        };

        optionXyMap01.options.push({
                // backgroundColor: '#013954',
                title:
                    [

                        {
                            id: 'statistic',
                            text: 'Area Tweets',
                            left: '70%',
                            top: '8%',
                            textStyle: {
                                color: '#fff',
                                fontSize: 25
                            }
                        }
                    ],
                
                series: [
                    //地图
                    {
                        type: 'map',
                        map: 'australia',
                        geoIndex: 0,
                        aspectScale: 0.75, //长宽比
                        showLegendSymbol: false, // 存在legend时显示
                        // nameProperty: 'STATE_NAME',
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: '#031525',
                                borderColor: '#FFFFFF',
                            },
                            emphasis: {
                                areaColor: '#2B91B7'
                            }
                        },
                        animation: false,
                        data: mapData
                    },
                    //地图中闪烁的点
                    {
                        //  name: 'Top 5',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: convertData(mapData.sort(function(a, b) {
                            return b.value - a.value;
                        }).slice(0, 5)),
                        symbolSize: function(val) {
                            return val[2] / 10000;
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                color: 'rgba(255, 255, 255, 0.9)',
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: colors[colorIndex],
                                shadowBlur: 10,
                                shadowColor: colors[colorIndex]
                            }
                        },
                        zlevel: 1
                    },

                ]
            })
        //}
        myChart.setOption(optionXyMap01);
        window.addEventListener("resize",function(){
            myChart.resize();
        });


        myChart.on('click', function (params) {
            var city = params.name;
            console.log(city)
            var index = keys.findIndex(function(item) {
                console.log(item)
                return item == city.toLowerCase();
            });

            if (index !== -1){

                wordlocationindex = index
                lang_option['title']['text'] = langdis_data[index].name;
                lang_option['series'] = [langdis_data[index]];
                langChart.setOption(lang_option);

            }

            wordCloud_option['series']['data'] = hashtags_data[keys[wordlocationindex]]
            wordCloud_option['title']['text'] = keys[wordlocationindex].toUpperCase()

            wordCloud.setOption(wordCloud_option);
        });

        window.addEventListener("resize",function(){
            langChart.resize();
        });

    }

})
// },10000)
