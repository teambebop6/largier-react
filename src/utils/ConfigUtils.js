/**
 * Created by Henry Huang on 2019/8/28.
 */
const Model = require('../models/configuration');

export const GROUP_NAME_GLOBAL = 'global';
export const NAME_PAST_CONCERT_NUM = 'pastConcertNum';
export const NAME_UPCOMING_CONCERT_NUM = 'upcomingConcertNum';

export const loadConcertsNumConfig = () => new Promise((resolve, reject) => {
  Model.findOne({ groupName: GROUP_NAME_GLOBAL }, (err, config) => {
    if (err) {
      reject(err);
    }
    const ret = {
      past: 5,
      upcoming: 5,
    };
    if (config) {
      if (config.items) {
        config.items.forEach((i) => {
          if (i.name === NAME_PAST_CONCERT_NUM) {
            ret.past = parseInt(i.value, 10);
          } else if (i.name === NAME_UPCOMING_CONCERT_NUM) {
            ret.upcoming = parseInt(i.value, 10);
          }
        });
      }
    }
    resolve(ret);
  });
});

export const createGlobalIfNotExisting = () => new Promise((resolve, reject) => {
  Model.findOne({ groupName: GROUP_NAME_GLOBAL }, (err, item) => {
    if (err) {
      reject(err);
    }
    if (!item) {
      const global = new Model({
        groupName: GROUP_NAME_GLOBAL,
        items: [
          {
            name: NAME_PAST_CONCERT_NUM,
            value: '5',
            title: 'Past concerts number shown',
          },
          {
            name: NAME_UPCOMING_CONCERT_NUM,
            value: '5',
            title: 'Upcoming concerts number shown',
          },
        ],
      });
      global.save().then(resolve);
    }
  });
});
