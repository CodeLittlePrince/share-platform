const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const data = { name: 'egg' };

    ctx.body = await ctx.renderView('home/index', data);
  }
}

module.exports = HomeController;
