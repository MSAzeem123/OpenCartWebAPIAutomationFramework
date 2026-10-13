import {test, expect} from '../src/fixtures/pagefixtures';
import { HomePage } from '../src/pages/HomePage';
import { ProductInfoPage } from '../src/pages/ProductinfoPage';
import { SearchResultsPage } from '../src/pages/SearchResultsPage';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
   //  await loginPage.doLogin('Mjindia@pw.com', 'pw123');
   await loginPage.doLogin(process.env.USER_NAME, process.env.PASSWORD);
});

test('verify product header', async ({ homePage, searchResultsPage, productInfoPage}) => {
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    expect(await productInfoPage.getProductHeader()).toBe('MacBook Pro');
});

test('verify the product img count', async ({ homePage, searchResultsPage, productInfoPage}) => {
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    let countImg= (await productInfoPage.getProductImagesCount());
    expect(countImg).toBe(4);
    console.log('Number of IMG displayed for the selected product: ', countImg );
})

test('verify product information/data', async({ homePage, searchResultsPage, productInfoPage}) => {
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');

    let actualProductInfoMap = await productInfoPage.getProductInfo();
    console.log('Acutal Product Details', actualProductInfoMap);

    //header assertions
    expect.soft(actualProductInfoMap.get('productheader')).toBe('MacBook Pro');
    expect.soft(actualProductInfoMap.get('productimagescount')).toBe(4);
    //meta data asserations
    expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
    expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
    expect.soft(actualProductInfoMap.get('Reward Points')).toBe('800');
    expect.soft(actualProductInfoMap.get('Availability')).toBe('Out Of Stock');
    //priceing assertions
    expect.soft(actualProductInfoMap.get('productprice')).toBe('$2,000.00');
    expect.soft(actualProductInfoMap.get('extaxprice')).toBe('$2,000.00');
})