export const cors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method == "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, PATCH, GET");
        return res.status(200).json({});
    }
    next();
}