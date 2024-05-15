

const getHomePage = (req, res) =>{
    res.send('Hello World')
}

const getABC = (req, res) =>{
    res.send("Check abc")
}
  const getThanhPage = (req, res) => {
   res.render('sample.ejs');
  }

module.exports = {
    getHomePage,
    getABC,
    getThanhPage
}