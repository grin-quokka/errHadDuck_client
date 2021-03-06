import React, { Component } from 'react';
import axios from 'axios';
import { List, Row, Col } from 'antd';
import Makelist from './Makelist';

export default class BoardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ['목록을 불러오는 중입니다.']
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { history } = this.props;
    const instance = axios.create({
      withCredentials: true,
      timeout: 1000,
      baseURL: process.env.REACT_APP_API_KEY
    });

    if (match.params.mode === 'entire') {
      instance
        .get('/posts')
        .then(({ data }) => {
          this.setState(prev => {
            const oldObj = { ...prev };
            oldObj.list = data;
            return oldObj;
          });
        })
        .catch(() => {
          history.push('/404page');
        });
    } else if (match.params.mode === 'incompleted') {
      instance
        .get('/posts?iscomplete=false')
        .then(({ data }) => {
          this.setState(prev => {
            const oldObj = { ...prev };
            oldObj.list = data;
            return oldObj;
          });
        })
        .catch(() => {
          history.push('/404page');
        });
    } else if (match.params.mode === 'completed') {
      instance
        .get('/posts?iscomplete=true')
        .then(({ data }) => {
          this.setState(prev => {
            const oldObj = { ...prev };
            oldObj.list = data;
            return oldObj;
          });
        })
        .catch(() => {
          history.push('/404page');
        });
    }
  }

  render() {
    const { list } = this.state;
    return (
      <List
        grid={{ gutter: 24, column: 4 }}
        itemLayout="vertical"
        dataSource={list.reverse()}
        renderItem={ele => (
          <List.Item style={{ borderLeft: '1px dotted' }}>
            {' '}
            <Makelist
              key={ele.id + 1}
              created={ele.createdAt}
              postname={ele.postname}
              id={ele.id}
              iscomplete={ele.iscomplete}
            />
          </List.Item>
        )}
      />
    );
  }
}
