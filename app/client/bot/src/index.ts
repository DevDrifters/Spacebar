import { DatabagSDK } from 'databag-client-sdk';

class SmartAutomationBot {
  constructor(apiKey = null) {
    this.sdk = new DatabagSDK(apiKey);
    this.bot = null;
  }

  async initialize() {
    try {
      console.log('Initializing Databag Automation...\n');

      this.bot = await this.sdk.automate();

      console.log('Bot Connected Successfully!');
      console.log('Bot ID:', this.bot?.id || 'N/A');
      console.log('Bot Info:', this.bot);

      return this.bot;
    } catch (error) {
      console.error(' Initialization Failed:', error.message);
      throw error;
    }
  }

  async executeTask(taskName, callback) {
    try {
      console.log(`\n⚡ Running Task: ${taskName}`);

      const start = Date.now();

      const result = await callback();

      const end = Date.now();

      console.log(`Task Completed: ${taskName}`);
      console.log(`⏱ Time Taken: ${end - start}ms`);

      return result;
    } catch (error) {
      console.error(` Task Failed: ${taskName}`);
      console.error(error);
    }
  }

  async monitor() {
    console.log('\n📡 Monitoring Bot Status...\n');

    setInterval(() => {
      console.log({
        status: 'ACTIVE',
        timestamp: new Date().toLocaleTimeString(),
      });
    }, 5000);
  }
}

const run = async () => {
  const automation = new SmartAutomationBot('YOUR_API_KEY');

  await automation.initialize();

  await automation.executeTask('Fetch User Data', async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
      users: 120,
      active: 98,
    };
  });

  await automation.executeTask('AI Processing', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('🤖 AI Task Executed');
  });

  automation.monitor();
};

run();
