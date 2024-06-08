

const mainCtrl = {
    home: async(req, res ) => {
        const locals = {
            title: "Notion App with Node.js and MongoDb"
        }

        res.render('index', {locals, layout: "../views/layouts/front-page"})
    }  ,
    about :  async(req, res ) => {
        const locals = {
            title: "About page notion app"
        }

        res.render('index', {locals})
    } 
}
module.exports = mainCtrl;