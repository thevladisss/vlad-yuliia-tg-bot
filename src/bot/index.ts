import { Telegraf } from 'telegraf';

import { StartCommand } from './commands/start';
import { logMiddleware } from './middlwares/log';
import { type Context } from 'telegraf';

export function createBot(token: string) {
  const startCommand = new StartCommand();

  const bot = new Telegraf(token);

  bot.use(logMiddleware);

  bot.start(startCommand.execute);

  bot.on('vlad', (ctx: Context) => ctx.reply("Ты вызвал секретную команду!"));

  return bot;
}
