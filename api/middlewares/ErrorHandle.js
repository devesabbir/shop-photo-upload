const ErrorHandle = (error,req,res,next) => {
    res.status(400).json({message:error._message,error:error.errors})
}

export default ErrorHandle; 