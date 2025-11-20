import { type Context } from 'telegraf';
import { type Update } from 'telegraf/typings/core/types/typegram';

import { type ICommand } from './types';

export class StartCommand implements ICommand {
  public execute = async (ctx: Context<Update>): Promise<void> => {
    await ctx.reply('Привет солнце. Я еще в стадии разработки но я скоро буду готов для тебя. ❤️️.');
  };
}
