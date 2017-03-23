'use strict'

const fs = require('fs-extra')
const cheerio = require('cheerio')
const del = require('del')
const mkdirp = require('mkdirp')
const templates = require('./data/dataTemplates.js')

//Html template file name
const name = process.argv[2]

if (!name)
    throw new Error('No template name defined')

//Get template content
const template = fs.readFileSync(__dirname+'/templates/'+name+'.html').toString()

//Output folder
const output = __dirname+'/output/'
del.sync(output)
mkdirp.sync(output)

//Copy assets
fs.copy(__dirname+'/templates/assets/', __dirname+'/output/assets/', (error)=>{
    if(error) {
        console.log('error',error)
    } else {
        console.log('assets copied')
    }
});


//Init $ instance
let $ = cheerio.load(template)

templates.forEach( item => {
    let $c = $('html').clone()
    let dest = output + item.id + '/'
    mkdirp.sync(dest)
    let file = dest + 'index.html'

    //GTM
    let gtm = item.gtm
    let funString = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtm}');`
    $c.find('#gtm').append(funString)

    //Write title
    $c.find('title').append(item.title)

    //Write header
    $c.find('#desktop').attr('data-image-preload-desktop', item.header.desktop)
    $c.find('#mobile').attr('data-image-preload-mobile', item.header.mobile)

    //Write section
    $c.find('section h2').append(item.section.title)
    $c.find('section p').append(item.section.text)
    $c.find('section a').append(item.section.buttonText).attr("href", item.section.link)

    //Write footer
    let links = item.footer.links
    let list = links.reduce((prev, cur) => prev  + '<li><a href="' + cur.link + '" target="_blank">' + cur.text + '</a></li>', '')
    $c.find('footer ul').append(list)
    $c.find('footer p').append(item.footer.legals)

    //Write cookies
    $c.find('#cookies h3').append(item.cookies.title)
    $c.find('#cookies .content').append(item.cookies.text)
    $c.find('#cookies button').append(item.cookies.buttonText)

    //Write html file
    fs.writeFileSync(file,$c.html())
    console.log('Writed '+file)
})