import moment from 'moment';

export default {
  getData() {
    return moment()
      .subtract(3, 'hours')
      .format('YYYY-MM-DD HH:mm:ss');
  },
};
