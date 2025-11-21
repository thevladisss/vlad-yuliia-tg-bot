import { type ICommand } from './types';
import { type SchedulerService } from '../services/scheduler';
import { type Context } from 'telegraf';
import { type Update } from 'telegraf/typings/core/types/typegram';

export class ComplimentCommand implements ICommand {
  private readonly message = 'Ты самая лучшая! 💕';

  constructor(private scheduler: SchedulerService) {}

  public execute = async (ctx: Context<Update>): Promise<void> => {
    if (ctx.chat?.id) {
      const chatId = ctx.chat.id;

      if (this.scheduler.hasChatId(chatId)) {
        await ctx.reply('Вы уже подписаны на комплименты! 💕');
        return;
      }

      this.scheduler.addChatId(chatId);
      await ctx.reply('Ты самая лучшая! 💕');
      await ctx.reply('Теперь вы будете получать комплименты каждый час! 💕');
    }
  };
}
