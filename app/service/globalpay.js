const Service = require('egg').Service;

class UserService extends Service {
  async share() {
    const { ctx, app } = this;
    const data = ctx.query;

    const imageBuffer = await app.pool.use(async instance => {
      // 1. 创建一个新窗口
      const page = await instance.newPage();
      const template = await ctx.renderView('globalpay/index', data);
      await page.setContent(template);
      // 2. 截图参数，截图
      const buffer = await page.screenshot({
        type: 'png',
        clip: {
          x: 0,
          y: 0,
          width: 285,
          height: 525,
        },
      });
      return buffer;
    });

    return imageBuffer;
  }
}

module.exports = UserService;
