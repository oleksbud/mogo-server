import async from 'async';
import appLogger from './libs/appLogger';
import connectedMongo from './libs/mongo';
import AuthorModel from './models/author';
import BookModel from './models/book';
import {Author, Book} from './types/models';
import {EXIT_CODE} from './constants';

const log = appLogger(module);

/**
 * Create task sequent (use connected Mongo DB)
 * 1. drop database [+]
 * 2. create authors collection [+]
 * 3. create books collection, linked to authors [+]
 * 4. close [+]
 */

const dropDatabase = (callback: any) => {
    connectedMongo.connection.dropDatabase()
        .then(() => {
            log.info('DB is dropped');
            callback();
        })
        .catch((e: Error) => {
            log.error(`Unable to drop DB: ${e.message}`)
            callback(e);
        });
};

const createAuthors = (callback: any) => {
    // faker.js can be used here
    const authors: Author[] = [
        { id: 1, name: 'Robert Asprin'},
        { id: 2, name: 'Garry Garrison'}
    ];
    AuthorModel.create(authors)
        .then(() => {
            log.info(`Authors are successfully created: ${authors.length} record${ authors.length > 1 ? 's' : '' }`);
            callback();
        })
        .catch((e) => {
            log.error(`Can\'t create Authors: ${e.message}`)
            callback(e);
        })
};

const createBooks = async (callback: any) => {
    // faker.js can be used here
    const initialBooks: Book[] = [
        { id: 1, title: 'Myth', initialAuthorId: 1},
        { id: 2, title: '50/50', initialAuthorId: 2}
    ];

    const authors: Author[] = await AuthorModel.find({});
    log.info(`Authors retrieved: ${authors.length}`)

    const books: Book[] = initialBooks.map((book: Book) => {
        const bookAuthor = authors.find((author) => author.id === book.initialAuthorId);
        const authorId =  bookAuthor ? bookAuthor._id : '';
        return {
            ...book,
            authorId,
        }
    });

    BookModel.create(books)
        .then(() => {
            log.info(`Books are successfully created: ${books.length} record${ books.length > 1 ? 's' : '' }`);
            callback();
        })
        .catch((e) => {
            log.error(`Can\'t create Books: ${e.message}`)
            callback(e);
        })
};

const finishSequence = (error?: Error | null) => {
    connectedMongo.disconnect()
        .then(() => {
            const errorCode = error ? EXIT_CODE.ERROR : EXIT_CODE.OK;
            if (errorCode) {
                log.error(`Error [${errorCode}]: ${error?.message}`)
            }
            process.exit(errorCode);
        });
};

async.series([
    dropDatabase,
    createAuthors,
    createBooks,
], finishSequence);
