// # 2022 COMP90024 Group 33 

// # Team members:

// # Ke Yang (Student ID: 1219623) - city: Anhui

// # Yimeng Liu (Student ID: 1074206) - city: Guangdong

// # Jintong Liu (Student ID: 1074498) - city: Hebei

// # Keang Xu (Student ID: 1008807) - city: Hubei

// # Xinwei Qian (Student ID: 1068271) - city: Jiangsu

var ec_result = echarts.init(document.getElementById('analysisResult'))
var ec_result_option = {
    title: {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
                {value: 1048, name: '搜索引擎'},
                {value: 735, name: '直接访问'},
                {value: 580, name: '邮件营销'},
                {value: 484, name: '联盟广告'},
                {value: 300, name: '视频广告'}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

ec_result.setOption(ec_result_option)