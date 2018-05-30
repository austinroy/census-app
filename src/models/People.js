import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = Schema({
  firstname: String,
  lastname: String,
  birthyear: String,
});

const People = mongoose.model('People', schema);

export default People;
