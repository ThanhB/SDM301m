

const getHomePage = (req, res) =>{
    res.render('home.ejs')
}

const getABC = (req, res) =>{
    res.send("Check abc")
}

module.exports = {
    getHomePage,
    getABC
}