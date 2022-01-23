import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import store from './store';
import App from './App';
import './design/index.less';


const Main = () => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </Provider>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'));

