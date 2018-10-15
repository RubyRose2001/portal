import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';

const importScript = (url, fn) => {
  const head = document.getElementsByTagName('body')[0];
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  script.async = true;
  head.appendChild(script);
  script.onload = () => {
    fn();
  };
};

Vue.use(Router);
const routes = [];
const routerMap = [{
  path: '/',
  name: 'HelloWorld',
  resourceType: 'CATEGORY', // 类别
  component: HelloWorld,
  children: []
}, {
  path: '/button',
  name: 'button',
  dir: 'example',
  resourceType: 'CATEGORYASYNC', // 需要异步加载的模块
  children: []
}];

const Map = (routerMaps, route) => {
  routerMaps.forEach((item, index) => {
    if (item.resourceType === 'CATEGORYASYNC') {
      route.push({
        path: item.path,
        name: item.name,
        component: (reslove) => {
          importScript(`../../static/${item.dir}/static/js/${item.name}AsyncModule.js`, () => {
            // eslint-disable-next-line
            CoCo.store.registerModule(item.name, buttonAsyncModule.default.store);
            // eslint-disable-next-line
            reslove(buttonAsyncModule.default.views);
          });
        }
      });
    } else if (item.resourceType === 'CATEGORY') {
      routes.push({
        path: item.path,
        name: item.name,
        component: item.component
      });
    }
    if (item.children.length > 0) {
      routes[index].children = [];
      Map(item.children, routes[index].children);
    }
  });
};
Map(routerMap, routes);
export default new Router({
  routes
});
