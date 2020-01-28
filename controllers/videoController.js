
export const home = (req, res) =>
{
    
    res.render('home', {pageTitle:'Home', videos});
} 


export const search =  (req, res)=>{
    //const searchingBy = req.query.term;
    const {
        query:{term:searchingBy}
    } = req;

    res.render("search", {pageTitle:"search", searchingBy, videos});
}

export const upload = (req, res) =>{
    res.render('upload',{pageTitle:'upload'})

}
export const postUpload = (req, res) =>{
    const {
        body:{file, title, description}
    } = req;

    res.redirect(routes.videoDetail);
}

export const videoDetail = (req, res) =>{
    res.render('videoDetail')
}

export const editVideo = (req, res) =>{
    res.render('editVideo')
}

export const deleteVideo = (req, res) =>{
    res.render('')
}