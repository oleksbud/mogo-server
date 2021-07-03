import connectedMongo from '../libs/mongo';

const schema = new connectedMongo.Schema({
    id: 'number',
    title: 'string',
    authorId: 'string'
});

const Model = connectedMongo.model('book', schema);

export default Model;
