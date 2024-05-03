import { browser, $ } from '@wdio/globals'
import { expect } from 'chai'
import path from 'path'
const __dirname = path.resolve()

describe('UI Actions', ()=>{
    beforeEach('setUp', async()=>{
        await browser.url('https://testautomationpractice.blogspot.com/')//Navigate to website
        await browser.pause(1000)//stop for 5s
    })

    afterEach('tearDown', async()=>{
        console.log('after each hook...')
    })

    it('should navigate to website', async()=>{
        const title = await browser.getTitle()// get web page's title
        console.log(title)
        expect(title).to.equal('Automation Testing Practice')

        const url = await browser.getUrl()// get current page's url
        console.log(url)
        expect(url.includes('testautomation')).to.be.true
    })

    it('should enter text in a text box', async()=>{
        //Enter text into text box. if there is a previous value in the box, setValue deletes it and enter the new value
        await $('//input[@id="name"]').setValue("Webdriverio is so cooool!") 
        await browser.pause(5000)

       //Enter text into text box. It does not clean the previous value if any.
        await $('//input[@id="email"]').addValue('abc@gmail.com')
        await browser.pause(5000)
    })

    it('should click on web element', async()=> {
        await $('//button[text()="New Browser Window"]').click()
        await browser.pause(3000)
    })

    it('should click on multyiple options by using web elements', async()=>{
        // $$ is used for web elemets to store
        const checkBoxes = await $$('//label[text()="Days:"]//..//input[@type="checkbox"]')
        console.log(checkBoxes.length)
        for (const checkBox of checkBoxes) {
           // await checkBox.scrollIntoView()
            await checkBox.click()
        }
        await browser.pause(3000)

    })

    it('should select option on dropdown menu', async()=> {
        const countryDropDown = await $('select[id="country"]')

        await countryDropDown.selectByVisibleText('Germany')//Germany
        await browser.pause(3000)

        await countryDropDown.selectByAttribute("value", "japan")//Japan
        await browser.pause(3000)

        await countryDropDown.selectByIndex(2)// UK
        await browser.pause(3000)

    })

    it('should handle alerts', async()=> {
        await $('//button[text()="Confirm Box"]').click()
        await browser.pause(2000)

        const alertText = await browser.getAlertText()
        expect(alertText).to.equal("Press a button!")
        await browser.pause(2000)

        const alertVisibilty = await browser.isAlertOpen()
        expect(alertVisibilty).to.be.true

        await browser.acceptAlert()
        await browser.pause(3000)

        await $('//p[@id="demo"]//preceding-sibling::button[1]').click()
        await browser.pause(2000)

        await browser.sendAlertText("Orhan Demirci")
        await browser.pause(2000)

        await browser.dismissAlert()
        await browser.pause(2000)
    })

    it('should double-click on the webelement', async()=>{
        await $('//button[text()="Copy Text"]').doubleClick()
        await browser.pause(3000)
    })

    it('should drag and drop web elemet', async()=>{
        await $('#draggable').dragAndDrop(await $('#droppable'))
        await browser.pause(3000)

    })

    it('should upload file', async()=>{
        await browser.url('https://the-internet.herokuapp.com/')
        await browser.pause(3000)

        await $('a[href="/upload"]').click()
        await browser.pause(2000)
       
       const entirePath = path.join(__dirname, '/data/Yusuf Eymen - Davetiye.png')
       console.log(entirePath)
       await $('#file-upload').setValue(entirePath)
       await browser.pause(2000)

       await $('#file-submit').click()
       await browser.pause(2000)
    })

    it('should handle new browser tab', async()=>{
        await $('//button[text()="New Browser Window"]').click()
        await browser.pause(2000)


        const windowTabs = await browser.getWindowHandles()
        console.log(windowTabs)
        
        // We swicth to the second window
        await browser.switchToWindow(windowTabs[1])
        await browser.pause(2000)

        console.log(await browser.getTitle())

        await $('input[placeholder="Search"]').addValue("Iphone")
        await browser.pause(2000)

        const mp3PlayerMenu = await $('//a[text()="MP3 Players"]')
        await mp3PlayerMenu.moveTo()
        await browser.pause(2000)

        await browser.switchToWindow(windowTabs[0])
        console.log(await browser.getTitle())

    })

    it('should wait until element displayed for a web element', async()=>{
        await $('#textarea').waitForDisplayed({timeout: 10000})
        await $('#textarea').setValue('123 Main Street')

        //waitUntil

        await browser.pause(3000)
    })

    it('should wait until specific condition to be met', async()=>{
        await $('//button[text()="New Browser Window"]').click()
        const windowTabs = await browser.getWindowHandles()
        console.log(windowTabs)
        
        // We swicth to the second window
        await browser.switchToWindow(windowTabs[1])

        await browser.waitUntil(async function () {
            return (await $('//img[@alt="MacBookAir"]//..//..//..').getAttribute('class')) === 'carousel-item active'//condition
          }, {
            timeout: 5000,//ms
            timeoutMsg: 'expected attribute value to be different after 5s'
          })

        
    })

    it('should get text of web element', async()=> {
        const text = await $('//button[text()="Copy Text"]//following-sibling::p').getText()
        expect(text).to.equal('Double click on button, the text from Field1 will be copied into Field2.')

        await browser.pause(3000)

    })

})
