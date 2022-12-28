import Queue from 'bull';

import { getRedisUrl } from '../helpers/helpers';

const redisUrl = getRedisUrl();

export const lunchTopicMessageQueue = (scheduleTime: string, sendTopicMessage: any): void => {
  const lunchTopicMessageQueue = new Queue('lunch topic message', redisUrl);

  const data = {
    title: 'Where should I have lunch?',
    body: 'Open lunch picker in browser now!',
  };
  lunchTopicMessageQueue.add(data, { repeat: { cron: scheduleTime, tz: 'Asia/Hong_Kong' } });

  lunchTopicMessageQueue.process((job, done) => {
    if (job && job.data) {
      const title = job.data.title;
      const body = job.data.body;

      sendTopicMessage(title, body);

      done();
    }
  });
};
