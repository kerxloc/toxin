import './styles/main.scss';

if (process.env.NODE_ENV !== 'production') {
  require('./index.pug');
  require('./pages/about.pug');
}
