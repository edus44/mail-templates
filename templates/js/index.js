import Cookies from './Cookies'
import Images from './Images'

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        let image = new Images()
        let cookies = new Cookies()
    }
}