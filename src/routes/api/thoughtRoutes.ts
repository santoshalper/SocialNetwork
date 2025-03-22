import { Router } from "express";
const router = Router();
import {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction
} from '../../controllers/thoughtController.js'

router.route('/').get(getAllThoughts).post(createThought)

router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought)

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)
export {router as thoughtRouter};