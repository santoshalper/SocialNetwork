import { Request, Response } from 'express';
import { User } from '../models/index.js'
//GET ALL /user
export const getAllUsers = async (_req: Request, res: Response) => {
    try{
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err: any){
        res.status(500).json({message: err.message});
    }
}
//GET ONE /user/:userId/
export const getOneUser = async (req: Request, res: Response) => {
    try{
        const user = await User.findById(req.params.userId);
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({message: 'user not found'});
        }
    } catch (err: any){
        res.status(500).json({message: err.message});
    }
}
//POST ONE /user/
export const createUser = async (req: Request, res: Response) => {
    try{
        const user = await User.create(req.body);
        res.status(200).json(user)
    } catch (err: any){
        res.status(500).json({message: err.message});
    }
}
//PUT ONE /user/:userId
export const updateUser = async (req: Request, res: Response) => {
    try {
       const user = await User.findOneAndUpdate(
        { _id: req.params.userId  },
        { username: req.body.username,
          email: req.body.email
        },
        { new: true}
       );
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({message: 'user not found'});
        }
    } catch (err: any){
        res.status(500).json({message: err.message});
    }
}
//DELETE ONE /user/:userId
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({message: 'user not found'});
        }
    } catch (err: any){
        res.status(500).json({message: err.message});
    }

}

//ADD Friends POST /user/:userId/friends/:friendsID
export const addFriend =  async (req: Request, res: Response) => {
    const { userId, friendsId } = req.params;
    if (userId !== friendsId) {
        try{
            const user = await User.findOneAndUpdate(
                {_id: userId},
                {$addToSet: {friends: friendsId}},
                { runValidators: true, new: true }
            );
            if(user){
                res.status(200).json(user)
            }else{
                res.status(404).json({message: 'user not found'});
            }
        } catch (err: any){
            res.status(500).json({message: err.message});
        }
    } else {
        res.status(500).json({message: 'Cannot friend yourself'})
    }
}

//Delete Friends Delete /user/:userId/friends/:friendsID
export const removeFriend = async (req: Request, res: Response) => {
    const { userId, friendsId } = req.params;
    try{
        const user = await User.findOneAndUpdate(
            {_id: userId},
            {$pull: { friends: friendsId}},
            { runValidators: true, new: true }
        );
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({message: 'user not found'});
        }
    }catch (err: any){
        res.status(500).json({message: err.message});
    }
}
