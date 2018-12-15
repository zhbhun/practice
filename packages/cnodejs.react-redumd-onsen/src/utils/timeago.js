import timeago from 'timeago.js';

export default date => {
  const timeagoInstance = timeago(Date.now());
  return timeagoInstance.format(date, 'zh_CN');
};
