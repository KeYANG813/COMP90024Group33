// # 2022 COMP90024 Group 33 

// # Team members:

// # Ke Yang (Student ID: 1219623) - city: Anhui

// # Yimeng Liu (Student ID: 1074206) - city: Guangdong

// # Jintong Liu (Student ID: 1074498) - city: Hebei

// # Keang Xu (Student ID: 1008807) - city: Hubei

// # Xinwei Qian (Student ID: 1068271) - city: Jiangsu



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

        var langChart = echarts.init(document.getElementById('echart2')); 
        var setiChart = echarts.init(document.getElementById('echart4')); 
        var incomeChart = echarts.init(document.getElementById('echart6')); 
        var wordCloud = echarts.init(document.getElementById('echart5')); 
        var wordseti = echarts.init(document.getElementById('echart3')); 
        var tweetseti = echarts.init(document.getElementById('echart1'));
  
        var myChart = echarts.init(document.getElementById('map_1'));

        //--------------------------- Variables Initialisation ---------------------------\\

        const mapData = [];
        var categoryData = [];
        var barData = [];
        var langdis_data = [];
        var wordlocationindex = 0
  
        for (var key in geoCoordMap) {
            mapData.push({
                "name": key,
                "value": city[key],
            });
            //console.log(city[key])
        } 

        for (var i = 0; i < mapData.length; i++) {
            barData.push(mapData[i].value); 
            categoryData.push(mapData[i].name.toUpperCase()); 
        }

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
                // color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab','#06b4ab','#06c8ab','#06dcab','#06f0ab'],
                // color: ['#4B0082', '#800080', "8B008B", "#9932CC", "#8A2BE2", "#6A5ACD", "#9370DB", "#7B68EE", "#BA55D3", "#DDA0DD", "#D8BFD8", "#E6E6FA"],
                color: ['#f0ddcc', '#f0c95a', '#f7b07e', '#cd5445', '#ffda8a', '#79b4b7', '#ff8600', '#ffb900','#bb5b14', '#c28c5e'],
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

            
            series: [langdis_data[0]],

        };
        
        fre_option = {
            legend: {},
            tooltip: {},
            dataset: {
              source: freq_data
            },
            xAxis: { type: 'category' },
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
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
            sizeRange: [14,30],
            // 12,25
            rotationRange: [-45, 90],
            rotationStep: 45,
            textRotation: [0, 45, 90, -45],
            shape: 'circle',
            left: 'center',
            top: 'center',
            right: null,
            bottom: null,
            width: '100%',
            height: '80%',
            layoutAnimation: false,
            textStyle: {
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                color: function(){
                    var color = ['#3772FF','#DF2935','#FDCA40','#E6E8E6','#ADC6FF', '#F4B8BC', '#FEE9AE', '#FFFFFF', '#77EBF8', '#17BEBB', '#D2FDFF', '#ADFBFF','#3ABEFF', '#F4EC90', '#DBB494']
                    // var color = ['#4B0082', '#800080', "8B008B", "#9932CC", "#8A2BE2", "#6A5ACD", "#9370DB", "#7B68EE", "#BA55D3", "#DDA0DD", "#D8BFD8", "#E6E6FA"]
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
        
          
          income_option = {
            xAxis: {
              type: 'category',
              axisLabel: {
                show: true,
                interval: 0,
                rotate: 60,
              },
              axisLine:{
                show: true,
                lineStyle:{
                    color: "#fff"
                }
              },
              data: ['Melbourne', 'Carlton', 'Box Hill', 'Parkville', 'Chadstone', 'Balwyn', 'Kew', 'South Yarra - West']
            },
            yAxis: {
              type: 'value',
              axisLine:{
                show: true,
                lineStyle:{
                    color: "#fff"
                }
              }
            },
            tooltip:{
                // type: "cross",
                trigger: 'axis',
            },
           
            grid: {
                
                left: '3%',
                right: '3%',
                bottom: '2%',
                containLabel: true
            },
            
            series: [
              {
                data: [28068, 36819, 37979, 45596, 47564, 49615, 59400, 65330],
                type: 'line',
                // lineStyle:{
                //     normal:{
                //         color: "#fff"
                //     }
                // }
              }
            ]
          };

          seti_option = {

            tooltip: {
              trigger: 'axis'
            },
            
            legend: {
                textStyle:{
                    color: '#fff',
                },
                data: ['Score_Compound', 'Score_Neutral', 'Score_Postive', 'Score_Negative']
            },
     
            grid: {
                left: '3%',
                right: '3%',
                bottom: '2%',
                containLabel: true
                },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              axisLabel: {
                show: true,
                interval: 0,
                rotate: 60,
              },
              axisLine:{
                show: true,
                lineStyle:{
                    color: "#fff"
                }
              },
              data: ['Melbourne', 'Carlton', 'Box Hill', 'Parkville', 'Chadstone', 'Balwyn', 'Kew', 'South Yarra - West']
            },
            yAxis: {
              type: 'value',
              axisLine:{
                show: true,
                lineStyle:{
                    color: "#fff"
                }
              },
            },
            series: [
              {
                name: 'Score_Compound',
                type: 'line',
                stack: 'Total',
                data: [0.13524705837203288,0.13246898489638217,0.08995380359612716,0.1136941245940361,0.017715952980688243,0.2383178410794603,0.15716871827411202, 0.14902319034852549]
              },
              {
                name: 'Score_Neutral',
                type: 'line',
                stack: 'Total',
                data: [0.8753614191963948,0.8450275728837369, 0.8478540802213,0.85736728668438, 0.8780319059613767, 0.7905412293853068, 0.8334022842639596,0.8253739946380705]
              },
              {
                name: 'Score_Postive',
                type: 'line',
                stack: 'Total',
                data: [0.09624118279157347,0.11135511064278181, 0.10007330567081606, 0.09964275169766747, 0.06891603694374478, 0.1765097451274362, 0.12780837563451777, 0.1245234584450403]
              },
              {
                name: 'Score_Negative',
                type: 'line',
                stack: 'Total',
                data: [0.02837853551828669, 0.04361766772040745, 0.05207745504840939, 0.042994390315913775, 0.05306045340050377, 0.03144377811094452, 0.03878870558375634, 0.050101206434316356]
              },
            ]
          };
          
          console.log(seti_data)
          live_seti_option = {
              
            tooltip: {
              trigger: 'axis'
            },
            
            legend: {
                textStyle:{
                    color: '#fff',
                },
                data: ['Score_Compound', 'Score_Postive', 'Score_Neutral','Score_Negative']
            },
     
            grid: {
                left: '3%',
                right: '3%',
                bottom: '2%',
                containLabel: true
                },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              axisLabel: {
                show: true,
                interval: 0,
                rotate: 60,
              },
              axisLine:{
                show: true,
                lineStyle:{
                    color: "#fff"
                }
              },
              data: ['Melbourne', 'Sydney', 'Brisbane', 'Darwin', 'Adelaide']
            },
            yAxis: {
              type: 'value',
              axisLine:{
                show: true,
                lineStyle:{
                    color: "#fff"
                }
              },
            },
            series: [
              {
                name: 'Score_Compound',
                type: 'line',
                stack: 'Total',
                data: seti_data[1][0]
                
              },
              {
                name: 'Score_Negative',
                type: 'line',
                stack: 'Total',
                data: seti_data[1][1]
              },
              {
                name: 'Score_Neutral',
                type: 'line',
                stack: 'Total',
                data: seti_data[1][2]
              },
              {
                name: 'Score_Postive',
                type: 'line',
                stack: 'Total',
                data: seti_data[1][3]
              },
              
              
            ]
            
          };

          
          tweet_seti_option = {
              
            tooltip: {
              trigger: 'axis'
            },
            
            legend: {
                textStyle:{
                    color: '#fff',
                },
                data: ['Avg_Score_Compound', 'Avg_Score_Postive', 'Avg_Score_Neutral', 'Avg_Score_Negative']
            },
     
            grid: {
                left: '3%',
                right: '3%',
                bottom: '2%',
                containLabel: true
                },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              axisLabel: {
                show: true,
                interval: 0,
                rotate: 60,
              },
              axisLine:{
                show: true,
                lineStyle:{
                    color: "#fff"
                }
              },
              data: ['Melbourne', 'Sydney', 'Brisbane', 'Darwin', 'Adelaide']
            },
            yAxis: {
              type: 'value',
              axisLine:{
                show: true,
                lineStyle:{
                    color: "#fff"
                }
              },
            },
            series: [
              {
                name: 'Avg_Score_Compound',
                type: 'line',
                stack: 'Total',
                data: senti_tweets[1][0]
                
              },
              {
                name: 'Avg_Score_Negative',
                type: 'line',
                stack: 'Total',
                data: senti_tweets[1][1]
              },
              {
                name: 'Avg_Score_Neutral',
                type: 'line',
                stack: 'Total',
                data: senti_tweets[1][2]
              },
              {
                name: 'Avg_Score_Postive',
                type: 'line',
                stack: 'Total',
                data: senti_tweets[1][3]
              },

            ]
            
          };

          optionXyMap01 = {
            title: {
                text: "Five city live tweets", 
                
                left: "left", 
                textStyle: {
                  
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#fff"
                }
            },
           
            tooltip: {
                trigger: 'item',
                formatter: (p) => {
                    let val = p.value[2];
                    if (window.isNaN(val)) {
                        val = 0;
                    }
                    let txtCon =
                        "<div style='text-align:left'>" + p.name + ":<br />Total Tweets：" + val + '</div>';
                    return txtCon;
                }
            },
            
                geo: { 
                    // nameProperty: "STATE_NAME",
                    show: true,
                    map: 'australia',
                    roam: false,
                    zoom: 1,
                    layoutCenter: ['50%', '50%'],
                    zlevel:1,
                    // If width-height ratio is larger than 1, then width is set to be 100.
                    // Otherwise, height is set to be 100.
                    // This makes sure that it will not exceed the area of 100x100
                    layoutSize: 480,
                    // center: [133.7751, -25.2744], 320
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
                                    color: 'rgba(147, 235, 248, 0)'  
                                }, {
                                    offset: 1,
                                    color: 'rgba(147, 235, 248, .2)' 
                                }],
                                globalCoord: false 
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
                
   
                series: [
                              {
                                name: 'Top 5',
                                type: 'effectScatter',
                                coordinateSystem: 'geo',
                                data: convertData(
                                  mapData
                                    .sort(function (a, b) {
                                      return b.value - a.value;
                                    })
                                    .slice(0, 6)
                                ),
                                symbolSize: function (val) {
                                  return val[2] / 3000;
                                },   
                                encode: {
                                  value: 2
                                },
                                showEffectOn: 'render',
                                rippleEffect: {
                                  brushType: 'stroke'
                                },
                               
                                label: {
                                  formatter: '{b}',
                                  position: 'right',
                                  show: true
                                },

                                itemStyle: {
                                    normal:{
                                        color:'#fcda9d',
                                    },
                                    shadowBlur: 10,
                                    shadowColor: '#fcda9d'
                                },
                                
                                emphasis: {
                                  scale: true
                                },
                                zlevel: 2
                              },

                        ]
            }
          
        //--------------------------- Charts Initialisation ---------------------------\\

        console.log(langdis_data[0])
        console.log(freq_data)

        langChart.setOption(lang_option);
        incomeChart.setOption(income_option);
        setiChart.setOption(seti_option);
        myChart.setOption(optionXyMap01, true);
        wordCloud.setOption(wordCloud_option);
        wordseti.setOption(live_seti_option);
        tweetseti.setOption(tweet_seti_option);
        
        window.addEventListener("resize",function(){
            langChart.resize();
            incomeChart.resize();
            setiChart.resize();
            myChart.resize();
            wordCloud.resize();
            wordseti.resize();
            tweetseti.resize()
        });

        myChart.on('click', function (params) {
            var city = params.name;
            // console.log(city)
            var index = keys.findIndex(function(item) {
                // console.log(item)
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