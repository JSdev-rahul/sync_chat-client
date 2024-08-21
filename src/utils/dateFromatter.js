import moment from 'moment';

const dateFormatter = date => {
  return moment(date).format('MMMM D, YYYY h:mm A');
};

export default dateFormatter;
