const Controller = require('egg').Controller;
const puppeteer = require('puppeteer');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const data = { name: 'egg' };

    ctx.body = await ctx.renderView('home/index', data);
  }

  async share() {
    const { ctx } = this;
    const data = ctx.query;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const template = await ctx.renderView('globalpay/index', data);

    await page.setContent(template);

    const buffer = await page.screenshot({
      type: 'png',
      clip: {
        x: 0,
        y: 0,
        width: 285,
        height: 525,
      },
      // encoding: 'base64',
    });

    ctx.body = buffer;
  }
}

module.exports = HomeController;
