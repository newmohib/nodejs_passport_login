

   const checkAuthenticated=(req, res, next) =>{
        //console.log('checkAuthenticated', req.isAuthenticated());
        if (req.isAuthenticated()) {
           // console.log('authenticated');
            return next();
        }
        res.redirect("/login");
    };
    const  checkNotAuthenticated=(req, res, next)=> {
        if (req.isAuthenticated()) {
            return res.redirect("/login")
        }
        return next()
    }


module.exports={checkAuthenticated,checkNotAuthenticated}