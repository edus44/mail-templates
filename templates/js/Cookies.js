export default class Cookies {
    constructor() {
        this.checkCookie()
        this.addListener()
    }
    acceptCookies() {
        console.log('Cookies accepted')
        window.localStorage.setItem('cookie', true)
    }
    checkCookie() {
        let cookies = document.querySelector('#cookies')
        window.localStorage.getItem('cookie') ? cookies.classList.add('hidden') : cookies.classList.add('show')
    }
    addListener() {
        let button = document.querySelector('#cookiesButton')
        button.addEventListener('click', () => {
            this.acceptCookies()
            this.checkCookie()
        })
        let close = document.querySelector('#cookiesClose')
        close.addEventListener('click', () => {
            document.querySelector('#cookies').classList.add('hidden')
        })
    }
}