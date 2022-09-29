import { notification } from 'antd';


notification.config({
  duration: 5,
  placement: 'topRight',
  maxCount: 5,
});

const legalTypes = ['success', 'error', 'warn', 'info'];

const isNumber = (number) => {
  return typeof number === 'number' && number >= 0;
};

const messageMap = {
  success: 'Успешно',
  error: 'Ошибка',
  info: 'Info',
  warn: 'Warning',
};

export const notifier = ({ message, description, type = 'success', duration }) => {
  const legalType = legalTypes.includes(type) ? type : 'info';
  notification.open({
    message: message || messageMap[type],
    description,
    type: type,
    duration: isNumber(duration) ? duration : 5,
  });
};
