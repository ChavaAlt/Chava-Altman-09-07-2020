import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IUser } from '../modules/users/model';
import UserService from '../modules/users/service';
import e = require('express');
import * as jwt from 'jsonwebtoken'
import enviornment from '../enviornment';
import Roles from '../enviornment'

export class UserController {

    private user_service: UserService = new UserService();

    public register(req: Request, res: Response) {
        if (req.body.firstName && req.body.lastName &&
            req.body.userName &&
            req.body.password &&
            req.body.email &&
            req.body.phone
        ) {
            const user_params: IUser = {

                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                password: req.body.password,
                email: req.body.email,
                phone: req.body.phone,
                roleType:parseInt(req.body.roleType) 


            };
            this.user_service.register(user_params, (err: any, user_data: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('Registration is done ', user_data, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public login(req: Request, res: Response) {

        let loginData = req.header('xx-auth');
        if (loginData) {
            const user_filter = { "password": loginData.substring(0, 64),"userName": loginData.substring(64, loginData.length) };

            this.user_service.filterUser(user_filter, (err: any, user_data: IUser) => {
                            if (err) {
                                 mongoError(err, res);
                             } else if(user_data!=null) {
                                let token=jwt.sign({id: user_data._id}, 'my secret')
                                res.header('xx-auth', token);
                                successResponse('get user successfull', user_data, res);
                             }
                             else{
                                 failureResponse("invalid user",user_data,res)
                             }
                         });
         
        }else {
            failureResponse("login failed",req.body,res)
        }
       
    }





}