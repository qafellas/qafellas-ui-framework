import { browser, $ } from '@wdio/globals'
import { expect } from 'chai'
import path from 'path'
const __dirname = path.resolve()

describe('UI Actions', ()=>{
    it('should navigate to website', async()=>{
        await browser.url('https://testautomationpractice.blogspot.com/')//Navigate to website
        await browser.pause(5000)//stop for 5s

        const title = await browser.getTitle()// get web page's title
        console.log(title)
        expect(title).to.equal('Automation Testing Practice')

        const url = await browser.getUrl()// get current page's url
        console.log(url)
        expect(url.includes('testautomation')).to.be.true
    })

    it('should enter text in a text box', async()=>{
        await browser.url('https://testautomationpractice.blogspot.com/')
        await browser.pause(5000)

        //Enter text into text box. if there is a previous value in the box, setValue deletes it and enter the new value
        await $('//input[@id="name"]').setValue("Webdriverio is so cooool!") 
        await browser.pause(5000)

       //Enter text into text box. It does not clean the previous value if any.
        await $('//input[@id="email"]').addValue('abc@gmail.com')
        await browser.pause(5000)
    })

    it('should click on web element', async()=> {
        await browser.url('https://testautomationpractice.blogspot.com/')
        await browser.pause(3000)

        await $('//button[text()="New Browser Window"]').click()
        await browser.pause(3000)
    })

    it('should click on multyiple options by using web elements', async()=>{
        await browser.url('https://testautomationpractice.blogspot.com/')
        await browser.pause(3000)
        
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
        await browser.url('https://testautomationpractice.blogspot.com/')
        await browser.pause(3000)
        
        const countryDropDown = await $('select[id="country"]')

        await countryDropDown.selectByVisibleText('Germany')//Germany
        await browser.pause(3000)

        await countryDropDown.selectByAttribute("value", "japan")//Japan
        await browser.pause(3000)

        await countryDropDown.selectByIndex(2)// UK
        await browser.pause(3000)

    })

    it('should handle alerts', async()=> {
        await browser.url('https://testautomationpractice.blogspot.com/')
        await browser.pause(3000)

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
        await browser.url('https://testautomationpractice.blogspot.com/')
        await browser.pause(3000)

        await $('//button[text()="Copy Text"]').doubleClick()
        await browser.pause(3000)
    })

    it('should drag and drop web elemet', async()=>{
        await browser.url('https://testautomationpractice.blogspot.com/')
        await browser.pause(3000)

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


})
