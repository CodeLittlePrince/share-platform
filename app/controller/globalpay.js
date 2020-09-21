const Controller = require('egg').Controller;

class GlobalpayController extends Controller {
  async share() {
    const { ctx, service } = this;

    try {
      const imageBuffer = await service.globalpay.share();

      ctx.body = imageBuffer;
    } catch (error) {
      ctx.logger.error(new Error(error));

      ctx.body = 'Home share action error';
    }
  }
}

module.exports = GlobalpayController;
