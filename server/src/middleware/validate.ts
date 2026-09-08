import { NextFunction,Request, Response, } from "express";
import {z} from "zod";

export const validate=(schema:z.ZodType)=>{
    return (req:Request, res:Response, next:NextFunction)=>{
        const result = schema.safeParse({
            body:req.body,
            params:req.params,
            query:req.query
        })

        if(!result.success){
            res.status(400).json({
                error:"Validation Failed",
                details:result.error.issues
            });
            return 
        }
        next()

    }
}