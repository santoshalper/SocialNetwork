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
        //@ts-ignore
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date: Date)=> {
                return date.toLocaleDateString();
            },
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
        //@ts-ignore
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date: Date)=> {
                return date.toLocaleDateString();
            },
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virutals: true
        }
    }
)

thoughtSchema.virtual('reactionCount').get(function(this: IThought) {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

export default Thought;