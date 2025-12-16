const errorHandler = (err,req,res,next) => {

    const statusCode = err.statusCode || 500;
    
    if(err.name === ""){
        return res.status(statusCode).json({
            success: false,
            error: err.message
        });
    }

    return res.status(statusCode).json({
        success: false,
        error: err.message
    });
    
}

export default errorHandler;