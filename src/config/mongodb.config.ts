import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

export default () => ({
  mongoConnectionSetting: <MongoConnectionOptions>{
    type: 'mongodb',
    url: process.env.MONGODB_URL,
    useUnifiedTopology: true,
    autoLoadEntities: true,
    // TODO: remove after typeOrm fixes compatibility with mongodb driver v4
    writeConcern: {
      j: true,
    },
  },
});
