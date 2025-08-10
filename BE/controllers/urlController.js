const Url = require("../models/urlModel");


exports.shortenUrl = async (req, res) => {

    const { originalUrl} = req.body;
    
    if(!originalUrl){
        return res.status(400).json({error: 'Original URL is required'});
    }
    
    try{
        const existingUrl = await Url.findOne({originalUrl});
        
        if(existingUrl){
            return res.status(200).json({
                shortenUrl : existingUrl.shortUrl,
                count : existingUrl.count,
            });
        }

        const newUrl = new Url({originalUrl});
        await newUrl.save();

        res.status(201).json({
            shortUrl: newUrl.shortUrl,
            count : newUrl.count,
        });

    }    
    catch (error) {
    console.error('Error shortening URL:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


exports.redirectUrl = async( req , res) =>{
    const url = await Url.findOne({shortUrl : `${process.env.BASE_URL}/${req.params.shortcode}`});
    console.log(url);
    console.log(req.params.shortcode);
    if(!url) return res.status(500).json({error:" Invalid Url"});

    url.click++;
    await url.save();

    res.redirect(url.originalUrl);
}