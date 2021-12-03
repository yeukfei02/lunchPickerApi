import Queue from 'bull';

import { getRedisUrl } from '../helpers/helpers';

const redisUrl = getRedisUrl();

export const breakfastTopicMessageQueue = (scheduleTime: string, sendTopicMessage: any): void => {
  const breakfastTopicMessageQueue = new Queue('breakfast topic message', redisUrl);

  breakfastTopicMessageQueue.process((job, done) => {
    if (job && job.data) {
      const title = job.data.title;
      const body = job.data.body;

      sendTopicMessage(title, body);

      done();
    }
  });

  const data = {
    title: "Let's look for breakfast!",
    body: 'Open lunch picker in browser now!',
  };
  breakfastTopicMessageQueue.add(data, { repeat: { cron: scheduleTime } });
};
