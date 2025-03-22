import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js'

//GET ALL /thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
    try{
        const thoughts = await Thought.find({});
        res.status(200).json(thoughts);
    } catch (err: any){
        res.status(500).json({message: err.message});
    }
}

//GET ONE /thoughts/:thoughtId/
export const getOneThought = async (req: Request, res: Response) => {
    try{
        const thought = await Thought.findById(req.params.thoughtId);
        if(thought){
            res.status(200).json(thought)
        }else{
            res.status(404).json({message: 'thought not found'});
        }
    } catch (err: any){
        res.status(500).json({message: err.message});
    }
}

//POST ONE /thoughts/
export const createThought = async (req: Request, res: Response) => {
    const {thoughtText, username, userId} = req.body;
    try{
        const thought = await Thought.create({
            thoughtText,
            username
        })
        await User.findOneAndUpdate(
            {_id: userId},
            {$addToSet: {thoughts: thought.id}},
            { runValidators: true, new: true }
        )
        res.status(200).json(thought);
    } catch (err: any){
        res.status(500).json({message: err.message});
    }
}

//PUT ONE /thoughts/:thoughId
export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {thoughtText: req.body.thoughtText,
             username: req.body.username
            },
            {new: true}
        );
        if(thought){
            res.status(200).json(thought)
        }else{
            res.status(404).json({message: 'thought not found'});
        }
    } catch (err: any){
        res.status(500).json({message: err.message});
    }
}

//DELETE ONE /thoughts/:thoughtId 
export const deleteThought = async (req: Request, res: Response) => {
    try{
        const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});
        await User.findOneAndUpdate(
            {thoughts: req.params.thoughtId},
            {$pull: {thoughts: req.params.thoughtId}},
            { runValidators: true, new: true }
        )
        if(thought){
            res.status(200).json(thought)
        }else{
            res.status(404).json({message: 'thought not found'});
        }
    } catch (err: any){
        res.status(500).json({message: err.message});
    }
}

//POST add reaction /thoughts/:thoughtId/reaction
export const createReaction = async (req: Request, res: Response) => {
    try{
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        );
        if(thought){
            res.status(200).json(thought)
        }else{
            res.status(404).json({message: 'thought not found'});
        }
    } catch (err: any){
        res.status(500).json({message: err.message});
    }
}

//Delete remove reaction /thoughts/:thoughtID/reaction/:reactionId
export const removeReaction = async (req: Request, res: Response) => {
    try{
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $pull: { reactions: {reactionId: req.params.reactionId}}},
            { runValidators: true, new: true }
        );    
        if(thought){
            res.status(200).json(thought)
        }else{
            res.status(404).json({message: 'thought not found'});
        }  
    } catch (err: any){
        res.status(500).json({message: err.message});
    }
}