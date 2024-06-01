


const getHomePage = (req, res) =>{
    res.render('home.ejs')
}

const getABC = (req, res) =>{
    res.send("Check abc")
}

export {getHomePage, getABC}