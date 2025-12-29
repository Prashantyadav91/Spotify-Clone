import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    bgColour:{
        type: String,
        ref: 'Song'
    },
    image:{
        type: String,
        required: true
    }
})

const albumModel = mongoose.model.album || mongoose.model('album', albumSchema);
export default albumModel;