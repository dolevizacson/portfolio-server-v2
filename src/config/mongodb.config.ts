import { MongooseModuleOptions } from '@nestjs/mongoose';
import mongooseLeanDefaults from 'mongoose-lean-defaults';

export default () => ({
  mongoConnectionSetting: <MongooseModuleOptions>{
    uri: process.env.MONGODB_URL,
    connectionFactory: (connection) => {
      connection.plugin(mongooseLeanDefaults);
      return connection;
    },
  },
});
