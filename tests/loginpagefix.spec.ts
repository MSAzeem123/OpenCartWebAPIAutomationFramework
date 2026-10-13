
import { CsvHelper } from '../src/Utils/CsvHelper';
import { ExcelHelper } from '../src/Utils/ExcelHelper';
import { JsonHelper } from '../src/Utils/JsonHelper';
import { test, expect } from '../src/fixtures/pagefixtures';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
});

//AAA
test('login page title test', async ({ loginPage }) => {
    let pageTitle = await loginPage.getLoginPageTitle();
    console.log('Login page title: ', pageTitle);
    expect(pageTitle).toBe('Account Login');    
});

test('forgot pwd link exist test', async ({ loginPage }) => {
    expect(await loginPage.isForgottenPwdLinkExist()).toBeTruthy();
})

test('user is able to login to app', async ({ loginPage, homePage}) => {
    // await loginPage.doLogin('pwapril@pw.com', 'pw123');
    //await loginPage.doLogin('Mjindia@pw.com', 'pw123');
    await loginPage.doLogin(process.env.USER_NAME, process.env.PASSWORD);
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy;
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
});

test('is New Customer heading is exist', async ({ loginPage }) => {
    expect(await loginPage.isNewCustomerTitleExist()).toBeTruthy();
})

test('is Returning Customer is exist', async ( { loginPage } ) => {
    expect(await loginPage.isreturningCustomerTitleExist()).toBeTruthy();
})

//pros
//1. light weight, easy to maintain/read, 3rd parth lib avbl, no license, flat files, good for large set of test data
//DataDriven_1: read csv data direclty from the CSV file and loop the test method row wise...
let testCSVData = CsvHelper.readCsv('src/testdata/logindata.csv');
for(let row of testCSVData){ 
test(`login to app with invalid credentials with CSV data - ${row.username} - ${row.password}`, async ({ loginPage, homePage}) => {
    await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
});
};

//cons:
//1. maintenance 
//2. need MS licenses
//DataDriven_2: read xlsx data direclty from the excel file and loop the test method row wise...
let testExcelData = ExcelHelper.readExcel('src/testdata/opencarttestdata.xlsx', 'login');
for(let row of testExcelData){ 
    test(`login to app with invalid credentials with Excel Data - ${row.username} - ${row.password}`, async ({ loginPage, homePage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
};

//Pros:
//1. inbuild method: parse, lightweight, smaller set of data source
//DataDriven_3: read JSON data direclty from the JSON file and loop the test method row wise...
let testJSONData = JsonHelper.readJson('src/testdata/logindata.json');
for(let row of testJSONData) { 
    test(`login to app with invalid credentials with JSON Data - ${row.username} - ${row.password}`, async ({ loginPage, homePage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
};