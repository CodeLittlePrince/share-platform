const initPuppeteerPool = require('./util/puppeteer-pool');
const { EventEmitter } = require('events');
EventEmitter.defaultMaxListeners = 30;

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  /**
   * 文件加载完成
   */
  async didLoad() {
    this.app.pool = initPuppeteerPool(this.app);
  }

  /**
   * 应用即将关闭
   */
  async beforeClose() {
    if (this.app.pool.drain) {
      await this.app.pool.drain().then(() => this.app.pool.clear());
    }
  }
}
module.exports = AppBootHook;
