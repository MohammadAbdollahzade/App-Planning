let $ = document
let body = $.body

let i = 1

let boxWorks = $.querySelector('.box-works')
let titleWork = $.querySelector('.title-work')
let captionWork = $.querySelector('.caption-work')
let btnAdd = $.querySelector('.btn-add')
let TimeH = $.querySelector('.time-h')
let TimeS = $.querySelector('.time-s')
let deleteAll = $.querySelector('.delete-all')
let languages = $.querySelector('.languages')
let title = $.querySelector('.title')
let timeFa = $.querySelector('.time-fa')
let timeEn = $.querySelector('.time-en')

//language
if(localStorage.getItem('language') != null){
    if (localStorage.getItem('language') === 'En') {
        boxWorks.style.paddingRight = '0'
        body.style.fontFamily = 'Vazir'
        timeEn.style.display = 'none'
        timeFa.style.display = 'flex'
        title.innerHTML = 'اضافه کردن کار ها'
        btnAdd.innerHTML = 'اضافه کردن'
        deleteAll.innerHTML = 'پاک کردن همه'
        captionWork.setAttribute('placeholder','متن کار')
        titleWork.setAttribute('placeholder','موضوع')
        document.dir = 'rtl'
    }else{
        boxWorks.style.paddingRight = '1.6rem'
        body.style.fontFamily = 'Roboto'
        timeFa.style.display = 'none'
        timeEn.style.display = 'flex'
        languages.innerHTML = 'Fa'
        title.innerHTML = 'Add New Todo...'
        btnAdd.innerHTML = 'Add'
        deleteAll.innerHTML = 'Delete All'
        titleWork.setAttribute('placeholder','Title')
        captionWork.setAttribute('placeholder','Work text')
        document.dir = 'ltr'
    }
}
else{
    boxWorks.style.paddingRight = '0'
    body.style.fontFamily = 'Vazir'
    timeEn.style.display = 'none'
    timeFa.style.display = 'flex'
    title.innerHTML = 'اضافه کردن کار ها'
    btnAdd.innerHTML = 'اضافه کردن'
    deleteAll.innerHTML = 'پاک کردن همه'
    captionWork.setAttribute('placeholder','متن کار')
    titleWork.setAttribute('placeholder','موضوع')
    document.dir = 'rtl'
}


//Convert number to number work
const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen ']
const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']

const regex = /^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/

const getLT20 = (n) => a[Number(n)]
const getGT20 = (n) => b[n[0]] + ' ' + a[n[1]]

function numWords (input) {
const num = Number(input)
if (isNaN(num)) return ''
if (num === 0) return 'zero'

const numStr = num.toString()
if (numStr.length > 9) {
throw new Error('overflow') // Does not support converting more than 9 digits yet
}

const [, n1, n2, n3, n4, n5] = ('000000000' + numStr).substr(-9).match(regex) // left pad zeros

let str = ''
str += n1 != 0 ? (getLT20(n1) || getGT20(n1)) + 'crore ' : ''
str += n2 != 0 ? (getLT20(n2) || getGT20(n2)) + 'lakh ' : ''
str += n3 != 0 ? (getLT20(n3) || getGT20(n3)) + 'thousand ' : ''
str += n4 != 0 ? getLT20(n4) + 'hundred ' : ''
str += n5 != 0 && str != '' ? 'and ' : ''
str += n5 != 0 ? (getLT20(n5) || getGT20(n5)) : ''

return str.trim()
}

//load info
for (let i = 1; i < 100000; i++) {
    if(localStorage.getItem('work' + i) != null){
        
                let newli = $.createElement('li')
                newli.setAttribute('id','work' + i)

                let boxText = $.createElement('div')
                boxText.setAttribute('class','box-text')

                let textWork = $.createElement('p')
                textWork.setAttribute('class','text-work')
                textWork.innerHTML = localStorage.getItem('work' + i)

                let timeWork = $.createElement('p')
                timeWork.setAttribute('class','time-work')
                timeWork.innerHTML = localStorage.getItem('time work' + i)

                let iconDelete = $.createElement('img')
                iconDelete.setAttribute('src','delete.png')
                iconDelete.setAttribute('class','delete')

                boxWorks.append(newli)
                newli.append(boxText,timeWork,iconDelete)
                boxText.append(textWork)

            iconDelete.addEventListener('click',(event)=>{
                    event.path[1].remove()
                    localStorage.removeItem(event.path[1].id)
                    let size = event.path[1].id.length
                    localStorage.removeItem('time work' + event.path[1].id[size -1])
            })
            deleteAll.addEventListener('click',()=>{
                let language = localStorage.getItem('language')
                localStorage.clear()
                localStorage.setItem('language',language)
            })
        }
        
        if(localStorage.getItem('captionWork' + i) != null && localStorage.getItem('titleWork' + i) != null){
            let boxTD = $.createElement('div')
            boxTD.setAttribute('class','t-d')
            boxTD.setAttribute('data-bs-toggle','collapse')
            boxTD.setAttribute('data-bs-target','#flush-collapse'+ numWords(i))
            boxTD.setAttribute('id', i)

            let containerT = $.createElement('div')
            containerT.setAttribute('class','accordion-item')

            let btnT = $.createElement('button')
            btnT.setAttribute('class','accordion-button collapsed')
            btnT.setAttribute('type','button')
            btnT.setAttribute('data-bs-toggle','collapse')
            btnT.setAttribute('data-bs-target','#flush-collapse'+ numWords(i))
            btnT.setAttribute('aria-expanded','false')
            btnT.setAttribute('aria-controls','flush-collapse'+ numWords(i))
            btnT.innerHTML = localStorage.getItem('titleWork' + i)

            let timeWork = $.createElement('p')
            timeWork.setAttribute('class','time-work')
            timeWork.innerHTML = localStorage.getItem('TimeTitleWork' + i) 

            let deleteIcon = $.createElement('img')
            deleteIcon.setAttribute('src','delete.png')
            deleteIcon.setAttribute('class','delete')

            let cDown = $.createElement('img')
            cDown.setAttribute('src','Chevron-down.png')
            cDown.setAttribute('class','chevron-down')          
            
            let containerD = $.createElement('div')
            containerD.setAttribute('id','flush-collapse'+ numWords(i))
            containerD.setAttribute('class','accordion-collapse collapse')
            containerD.setAttribute('aria-labelledby','flush-heading'+ numWords(i))
            containerD.setAttribute('data-bs-parent','#accordionFlushExample')
            
            let dBody = $.createElement('div')
            dBody.setAttribute('class','accordion-body')
            
            let description = $.createElement('p')
            description.innerHTML = localStorage.getItem('captionWork' + i)

            boxWorks.append(boxTD)
            boxTD.append(containerT,containerD)
            containerT.append(btnT,timeWork,deleteIcon,cDown)
            containerD.append(dBody)
            dBody.append(description)

            
            boxTD.addEventListener('click',()=>{
                if(cDown.style.transform != 'rotate(180deg)'){
                    cDown.style.transform = 'rotate(180deg)'
                }else{
                    cDown.style.transform = 'rotate(0deg)'
                }
            })
            
            deleteIcon.addEventListener('click',(event)=>{
                event.delegateTarget.remove()
                console.log(event)
                localStorage.removeItem('captionWork' + event.delegateTarget.id)
                localStorage.removeItem('titleWork' + event.delegateTarget.id)
            })

        }
    }


//btnadd
btnAdd.addEventListener('click',(event)=>{
        event.preventDefault()
         if (captionWork.value == '' && titleWork.value != '') {
            if(localStorage.getItem('i') !== null){
                i = localStorage.getItem('i')
           }else{
            i = 1
           }
            let newli = $.createElement('li')
            newli.setAttribute('id','work' + i)

            let boxText = $.createElement('div')
            boxText.setAttribute('class','box-text')

            let textWork = $.createElement('p')
            textWork.setAttribute('class','text-work')
            textWork.innerHTML = localStorage.getItem('work' + i)

            let timeWork = $.createElement('p')
            timeWork.setAttribute('class','time-work')
            
            let iconDelete = $.createElement('img')
            iconDelete.setAttribute('src','delete.png')
            iconDelete.setAttribute('class','delete')
            
            deleteAll.addEventListener('click',()=>{
                let language = localStorage.getItem('language')
                localStorage.clear()
                localStorage.setItem('language',language)
            })
            boxWorks.append(newli)
            newli.append(boxText,timeWork,iconDelete)
            boxText.append(textWork)
            
            iconDelete.addEventListener('click',(event)=>{
                event.path[1].remove()
                localStorage.removeItem(event.path[1].id)
                let size = event.path[1].id.length
                localStorage.removeItem('time work' + event.path[1].id[size -1])
            })

            timeWork.innerHTML = TimeH.value + " : " + TimeS.value 
            textWork.innerHTML = titleWork.value
            localStorage.setItem('work' + i, textWork.innerHTML)
            localStorage.setItem('time work' + i, timeWork.innerHTML)
            titleWork.value = ''
            captionWork.value = ''
            TimeH.value = ''
            TimeS.value = ''
            i++
            localStorage.setItem('i',i)
        }

        if (titleWork.value != '' && captionWork.value != '') {
            
            if(localStorage.getItem('i') !== null){
                i = localStorage.getItem('i')
           }else{
               i = 1
            }
            //BOXTD

            let boxTD = $.createElement('div')
            boxTD.setAttribute('class','t-d')
            boxTD.setAttribute('data-bs-toggle','collapse')
            boxTD.setAttribute('data-bs-target','#flush-collapse'+ numWords(i))
            boxTD.setAttribute('id', i)

            let containerT = $.createElement('div')
            containerT.setAttribute('class','accordion-item')

            let btnT = $.createElement('button')
            btnT.setAttribute('class','accordion-button collapsed')
            btnT.setAttribute('type','button')
            btnT.setAttribute('data-bs-toggle','collapse')
            btnT.setAttribute('data-bs-target','#flush-collapse'+ numWords(i))
            btnT.setAttribute('aria-expanded','false')
            btnT.setAttribute('aria-controls','flush-collapse'+ numWords(i))
            btnT.innerHTML = titleWork.value
            localStorage.setItem('titleWork' + i,btnT.innerHTML)
            
            let timeWork = $.createElement('p')
            timeWork.setAttribute('class','time-work')
            timeWork.innerHTML = TimeH.value + " : " + TimeS.value 
            localStorage.setItem('TimeTitleWork' + i,timeWork.innerHTML)
            
            let deleteIcon = $.createElement('img')
            deleteIcon.setAttribute('src','delete.png')
            deleteIcon.setAttribute('class','delete')

            let cDown = $.createElement('img')
            cDown.setAttribute('src','Chevron-down.png')
            cDown.setAttribute('class','chevron-down')   

            let containerD = $.createElement('div')
            containerD.setAttribute('id','flush-collapse'+ numWords(i))
            containerD.setAttribute('class','accordion-collapse collapse')
            containerD.setAttribute('aria-labelledby','flush-heading'+ numWords(i))
            containerD.setAttribute('data-bs-parent','#accordionFlushExample')
            
            let dBody = $.createElement('div')
            dBody.setAttribute('class','accordion-body')
            
            let description = $.createElement('p')
            description.innerHTML = captionWork.value
            localStorage.setItem('captionWork' + i,description.innerHTML)

            boxWorks.append(boxTD)
            boxTD.append(containerT,containerD)
            containerT.append(btnT,timeWork,deleteIcon,cDown)
            containerD.append(dBody)
            dBody.append(description)

            
            boxTD.addEventListener('click',()=>{
                if(cDown.style.transform != 'rotate(180deg)'){
                    cDown.style.transform = 'rotate(180deg)'
                }else{
                    cDown.style.transform = 'rotate(0deg)'
                }
            })
            
            deleteIcon.addEventListener('click',(event)=>{
                event.delegateTarget.remove()
                console.log(event)
                localStorage.removeItem('captionWork' + event.delegateTarget.id)
                localStorage.removeItem('titleWork' + event.delegateTarget.id)
            })
            titleWork.value = ''
            captionWork.value = ''
            TimeH.value = ''
            TimeS.value = ''
            i++
            localStorage.setItem('i',i)
            
                        
        }
})
  

//btn languages
languages.addEventListener('click',(event)=>{
    if (languages.innerHTML == 'En') {
        boxWorks.style.paddingRight = '1.6rem'
        body.style.fontFamily = 'Roboto'
        timeFa.style.display = 'none'
        timeEn.style.display = 'flex'
        languages.innerHTML = 'Fa'
        title.innerHTML = 'Add New Todo...'
        btnAdd.innerHTML = 'Add'
        deleteAll.innerHTML = 'Delete All'
        titleWork.setAttribute('placeholder','Title')
        captionWork.setAttribute('placeholder','Work text')
        document.dir = 'ltr'
    }
    else{
        boxWorks.style.paddingRight = '0'
        body.style.fontFamily = 'Vazir'
        timeEn.style.display = 'none'
        timeFa.style.display = 'flex'
        languages.innerHTML = 'En'
        title.innerHTML = 'اضافه کردن کار ها'
        btnAdd.innerHTML = 'اضافه کردن'
        deleteAll.innerHTML = 'پاک کردن همه'
        captionWork.setAttribute('placeholder','متن کار')
        titleWork.setAttribute('placeholder','موضوع')
        document.dir = 'rtl'
    }
    localStorage.setItem('language',languages.innerHTML)
    event.preventDefault()
})

//btn delete all
deleteAll.addEventListener('click',()=>{
    let language = localStorage.getItem('language')
    localStorage.clear()
    localStorage.setItem('language',language)
})
