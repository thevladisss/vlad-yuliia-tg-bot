import { type Telegraf } from 'telegraf';

export class SchedulerService {
  private intervalId: NodeJS.Timeout | null = null;
  private chatIds: Set<number> = new Set();

  constructor(private bot: Telegraf) {}

  public addChatId(chatId: number): void {
    this.chatIds.add(chatId);
  }

  public removeChatId(chatId: number): void {
    this.chatIds.delete(chatId);
  }

  public hasChatId(chatId: number): boolean {
    return this.chatIds.has(chatId);
  }

  public startHourlyMessages(message: string): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    // Send immediately on start (optional)
    this.sendMessages(message);

    // Then send every hour (3600000 ms)
    this.intervalId = setInterval(() => {
      this.sendMessages(message);
    }, 3600000); // 1 hour = 3600000 milliseconds
  }

  public stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private async sendMessages(message: string): Promise<void> {
    for (const chatId of this.chatIds) {
      try {
        await this.bot.telegram.sendMessage(chatId, message);
      } catch (error) {
        console.error(`Failed to send message to chat ${chatId}:`, error);
      }
    }
  }
}

