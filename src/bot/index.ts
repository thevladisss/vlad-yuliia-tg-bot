import { Telegraf } from 'telegraf';

import { ComplimentCommand } from './commands/compliment';
import { StartCommand } from './commands/start';
import { VladCommand } from './commands/vlad';
import { logMiddleware } from './middlwares/log';
import { SchedulerService } from './services/scheduler';

export function createBot(token: string) {
  const startCommand = new StartCommand();
  const vladCommand = new VladCommand();

  const bot = new Telegraf(token);

  bot.use(logMiddleware);

  // Initialize scheduler for hourly compliments
  const scheduler = new SchedulerService(bot);
  const complimentCommand = new ComplimentCommand(scheduler);

  // Start sending hourly messages
  scheduler.startHourlyMessages('You are the best');

  bot.start(startCommand.execute);
  bot.command('vlad', vladCommand.execute);
  bot.command('compliment', complimentCommand.execute);

  return bot;
}
