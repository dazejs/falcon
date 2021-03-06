import React, { useState, useEffect } from 'react'
import { Breadcrumb, Card, Statistic, Button, Modal, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './index.less'
// import ReactEchartsCore from 'echarts-for-react/lib/core';
// import echarts from 'echarts/lib/echarts';
// import 'echarts/lib/chart/pie';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';
import { PlusOutlined } from '@ant-design/icons'

function useFetchAppApi () {
  const [data, setData] = useState([]);
  const [url] = useState(
    'http://localhost:9797/api/apps',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get(url);

        console.log(result)

        setData(result.data);
      } catch (error) {
        console.log(error)
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, isLoading, isError };
}

export default function () {

  const [isShowAppAddModal, setShowAppAddModal] = useState(false)

  const [appForm] = Form.useForm()

  const { data } = useFetchAppApi() 

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

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
        {
          data?.map((item: any) => {
            return (
              <Card title={item.name} key={item.id} extra={
                <a>详细信息</a>
              }>
                <div className="app-box">

                  <div className="item">
                    <Statistic title="网络 - IN" suffix="kb/s" value="123"></Statistic>
                  </div>
                  <div className="item">
                    <Statistic title="网络 - OUT" suffix="kb/s" value="87"></Statistic>
                  </div>
                  <div className="item">
                    <Statistic title="CPU 使用率" suffix="%" value="60"></Statistic>
                  </div>
                  <div className="item">
                    <Statistic title="内存使用率" suffix="%" value="30"></Statistic>
                  </div>
                  <div className="item">
                    <Statistic title="磁盘使用率" suffix="%" value="10"></Statistic>
                  </div>
                </div>
              </Card>
            )
          })
        }
        <Button type="dashed" style={{
          width: '100%',
          backgroundColor: '#eee',
          marginTop: 20
        }} onClick={() => {
          setShowAppAddModal(true)
        }}>
          添加应用 <PlusOutlined/>
        </Button>
      </div>
      <Modal
        title="添加应用"
        visible={isShowAppAddModal}
        onCancel={() => {
          setShowAppAddModal(false)
        }}
        onOk={() => {
          appForm.submit()
        }}
      >
        <Form {...layout} form={appForm} name="app-form" onFinish={(values) => {
          console.log('Success:', values);
        }}>
          <Form.Item name="appname" label="应用名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}


{/* <div className="cpu item">
              <ReactEchartsCore
                echarts={echarts}
                style={{
                  width: 100,
                  height: 100
                }}
                option={{
                  // tooltip: {
                  //   trigger: 'item',
                  //   formatter: '{a} <br/>{b}: {d}%'
                  // },
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
                            fontSize: '13',
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
            </div> */}