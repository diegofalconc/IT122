import mongoose from 'mongoose';
const { Schema } = mongoose;
import {connectionString} from "../credentials.js";

// For security, connectionString should be in a separate file and excluded from git

mongoose.connect(connectionString, {
    dbName: 'sccprojects',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const movieSchema = new Schema({
 movie: { type: String, required: true },
 director: String,
 year: Date,
 theme: String
});

export const Movie = mongoose.model('Movie', movieSchema);