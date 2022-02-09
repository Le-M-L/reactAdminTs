export default [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome',
    name: 'welcome',
    exact: true,
    icon: 'smile',
    component: './Welcome',
  },
];
