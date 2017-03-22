export default class Images {
    constructor() {
        this.display = this.checkDisplay()
        window.onresize = () => {
            this.checkLoader()
        }
        this.loadResponsive()
    }
    checkLoader() {
        let newView = this.checkDisplay()
        if(newView !== this.display) {
            this.display = newView
            this.loadResponsive()
            return
        }
    }
    checkDisplay() {
        let e = document.documentElement
        let g = document.getElementsByTagName('body')[0]
        let width = window.innerWidth || e.clientWidth || g.clientWidth

        if(width>=768) {
            return 'desktop'
        } else {
            return 'mobile'
        }
    }
    loadResponsive() {
        let element = document.querySelector('[data-image-preload-'+this.display+']')
        let preload = document.createElement('span')
        preload.classList.add('loading')
        if(element.firstChild) {
            element.replaceChild(preload, element.firstChild)                                 
        } else {
            element.appendChild(preload)
        }
        let imageSrc = element.getAttribute('data-image-preload-'+this.display)
        let image = new Image()
        image.src = imageSrc
        image.classList.add('fade-enter-active')
        image.onload = () => {
            element.classList.remove('loading')
            if(element.firstChild) {
                element.replaceChild(image,element.firstChild)                      
            } else {
                element.appendChild(image)
            }
        }
    }
}