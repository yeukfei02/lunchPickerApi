import Queue from 'bull';

import { getRedisUrl } from '../helpers/helpers';

const redisUrl = getRedisUrl();

export const dinnerTopicMessageQueue = (scheduleTime: string, sendTopicMessage: any): void => {
  const dinnerTopicMessageQueue = new Queue('dinner topic message', redisUrl);

  const data = {
    title: 'Find your dinner place now!',
    body: 'Open lunch picker in browser now!',
  };
  dinnerTopicMessageQueue.add(data, { repeat: { cron: scheduleTime, tz: 'Asia/Hong_Kong' } });

  dinnerTopicMessageQueue.process((job, done) => {
    if (job && job.data) {
      const title = job.data.title;
      const body = job.data.body;

      sendTopicMessage(title, body);

      done();
    }
  });
};
