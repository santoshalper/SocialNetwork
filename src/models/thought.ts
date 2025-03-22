import { Schema, model, Document, Types} from "mongoose";

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: Schema.Types.ObjectId[];
}

function getDate(date: Date): any {
    const Y = date.getUTCFullYear();
    const M = date.getUTCMonth();
    const D = date.getUTCDate();
    const H = date.getUTCHours() - 4;
    let AMPM = ''
    if (H>12) {
        AMPM = 'PM'
    } else{
        AMPM = 'AM'
    }
    const h = H % 12;
    const Mi = date.getUTCMinutes();
    return `posted on ${M}/${D}/${Y} at ${h}:${Mi} ${AMPM}`
}

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength:280,
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: getDate
        }
    }
)

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength:280,
        },  
        createdAt: {
            type: Date,
            default: Date.now,
            get: getDate
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
)

thoughtSchema.virtual('reactionCount').get(function(this: IThought) {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

export default Thought;