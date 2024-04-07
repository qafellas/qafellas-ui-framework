import { browser, $ } from '@wdio/globals'
import { expect } from 'chai'

describe('UI Actions', ()=>{
    it('should navigate to website', async()=>{
        await browser.url('https://testautomationpractice.blogspot.com/')//Navigate to website
        await browser.pause(10000)//stop for 10s

        const title = await browser.getTitle()// get web page's title
        expect(title).to.equal('Automation Testing Practice')

        const url = await browser.getUrl()// get current page's url
        expect(url.includes('testautomation')).to.be.true
    })
})
