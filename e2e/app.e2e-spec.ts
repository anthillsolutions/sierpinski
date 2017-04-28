import { SierpinskiPage } from './app.po';

describe('sierpinski App', () => {
  let page: SierpinskiPage;

  beforeEach(() => {
    page = new SierpinskiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
