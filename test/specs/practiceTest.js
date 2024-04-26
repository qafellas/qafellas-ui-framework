import { browser, $ } from '@wdio/globals'
import { expect } from 'chai'

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


})
