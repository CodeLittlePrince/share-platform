const initPuppeteerPool = require('./util/puppeteer-pool');
const { EventEmitter } = require('events');
EventEmitter.defaultMaxListeners = 30;

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务
    this.app.pool = initPuppeteerPool();
  }

  async beforeClose() {
    if (this.app.pool.drain) {
      await this.app.pool.drain().then(() => this.app.pool.clear());
    }
  }
}
module.exports = AppBootHook;
