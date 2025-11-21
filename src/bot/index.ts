import { Telegraf } from 'telegraf';

import { StartCommand } from './commands/start';
import { VladCommand } from './commands/vlad';
import { logMiddleware } from './middlwares/log';

export function createBot(token: string) {
  const startCommand = new StartCommand();
  const vladCommand = new VladCommand();

  const bot = new Telegraf(token);

  bot.use(logMiddleware);

  bot.start(startCommand.execute);
  bot.command('vlad', vladCommand.execute);

  return bot;
}
