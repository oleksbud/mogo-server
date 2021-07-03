import connectedMongo from '../libs/mongo';

const schema = new connectedMongo.Schema({
    id: 'number',
    name: 'string',
});

const Model = connectedMongo.model('author', schema);

export default Model;
