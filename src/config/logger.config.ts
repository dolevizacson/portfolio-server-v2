import { Params } from 'nestjs-pino';
import { hasOwnProperty } from 'src/common/helpers/helpers.functions';

export default () => ({
  loggerConfiguration: <Params>{
    pinoHttp: {
      prettyPrint: process.env.NODE_ENV !== 'production' && {
        messageFormat: (log) => {
          // TODO: move to helpers functions file

          if (
            log.req &&
            typeof log.req === 'object' &&
            hasOwnProperty(log.req, 'method') &&
            hasOwnProperty(log.req, 'url')
          ) {
            return `${log?.req?.method} request to - ${log?.req?.url} - in ${log?.responseTime}ms : ${log.msg}`;
          }
          return `[${log?.context}] ${log?.msg}`;
        },
        ignore: 'req,res,context,responseTime',
        translateTime: true,
      },
    },
  },
});
