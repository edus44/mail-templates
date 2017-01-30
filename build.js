'use strict'

const fs = require('fs')
const cheerio = require('cheerio')
const del = require('del')
const mkdirp = require('mkdirp')
const inlineCss = require('inline-css')

//Html template file name
const name = process.argv[2]

if (!name)
    throw new Error('No template name defined')

//Get template content
const template = fs.readFileSync(__dirname+'/templates/'+name+'.html').toString()

//Output folder
const output = __dirname+'/output/'+name
del.sync(output)
mkdirp.sync(output)

//Init $ instance
let $ = cheerio.load(template)

//Find all template ids
let templateIds = []
let $containers = []
$('template-container').each(function(){
    $('template').each(function(){
        let id = $(this).attr('id')
        if (id && !~templateIds.indexOf(id))
            templateIds.push(id)
    })
})

//Iterate template ids
templateIds.forEach( id => {
    let $c = $('html').clone()
    let file = output+'/'+id+'.html'

    //Replace template-container with this template id content
    $c.find('template#'+id).each(function(){
        var content = $(this).html()
        $(this).parent().replaceWith(content)
    })

    //Clear posible template content with empty or default content
    $c.find('template-container').each(function(){
        var defaultContent = $(this).find('template[default]').html()
        var content = defaultContent  || '<!-- empty -->'
        $(this).replaceWith(content)
    })

    //Inline CSS and write the file
    inlineCss($c.html(),{url:'/'})
        .then(html=>{
            fs.writeFileSync(file,html)
            console.log('Writed '+file)
        })
        .catch(err=>{
            console.log('error',err)
        })
})
