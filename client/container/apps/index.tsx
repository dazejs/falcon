import React, { useEffect } from 'react'
import { Breadcrumb, Card } from 'antd'
import { Link } from 'react-router-dom'
import './index.less'
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default function () {

  

  return (
    <>
      <div className="breadcrumb-box">
        <Breadcrumb>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/apps">应用概览</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="breadcrumb-title">
          应用概览
        </div>
      </div>
      <div className="content-box">
        <Card title={"Dazejs"}>
          <div className="app-box">
            <div className="cpu item">
              <ReactEchartsCore
                echarts={echarts}
                style={{
                  width: 200,
                  height: 200
                }}
                option={{
                  tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {d}%'
                  },
                  series: [
                    {
                      name: 'CPU 使用率',
                      type: 'pie',
                      radius: ['50%', '70%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          // formatter: '{b}:{d}%',
                          textStyle: {
                            fontSize: '15',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      data: [
                        { value: 20, name: '空闲', itemStyle: { color: '#91c7ae' } },
                        { value: 80, name: '使用', itemStyle: { color: '#c23531' } },
                      ]
                    }
                  ]
                }}
              />
              <div className="tit">CPU 使用率</div>
              <div className="con">40%</div>
            </div>
            <div className="mem item">
              <div className="tit">内存使用率</div>
              <div className="con">50%</div>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}