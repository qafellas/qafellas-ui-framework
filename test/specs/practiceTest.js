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
})
