import { MongoClient } from "mongodb";

declare global {
    var _mongoClientPromise: Promise<MongoClient>;

    interface MongoDBOptions {
        useNewUrlParser: boolean;
        useUnifiedTopology: boolean;
    }

    var mongoDBOptions: MongoDBOptions;
}
