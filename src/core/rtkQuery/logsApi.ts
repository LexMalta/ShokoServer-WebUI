import { concat } from 'lodash';
import moment from 'moment';
import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { LogLineType } from '../types/api/common';
import {
  HttpTransportType,
  HubConnectionBuilder,
  JsonHubProtocol,
  LogLevel,
} from '@microsoft/signalr';
import { RootState } from '../store';

const formatStamp = date => moment(date).format('YYYY-MM-DD HH:mm:ss');
const formatTimestamps = (lines: LogLineType[]): LogLineType[] => lines.map<LogLineType>(item => ({ ...item, timeStamp: formatStamp(item.timeStamp) }));

export const logsApi = createApi({
  reducerPath: 'logs',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: build => ({
    getLogs: build.query<LogLineType[], void>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(arg, { updateCachedData, cacheEntryRemoved, getState }) {
        const connectionLogHub = '/signalr/logging';
        const protocol = new JsonHubProtocol();
        // eslint-disable-next-line no-bitwise
        const transport = HttpTransportType.WebSockets | HttpTransportType.LongPolling;
        const apikey = (getState() as RootState).apiSession.apikey;
        const options = {
          transport,
          logMessageContent: true,
          logger: LogLevel.Warning,
          accessTokenFactory: () => apikey,
        };
        
        const connectionLog = new HubConnectionBuilder().withUrl(connectionLogHub, options).withHubProtocol(protocol).build();
        connectionLog.on('GetBacklog', (lines: LogLineType[]) =>  updateCachedData(draft => concat(draft, formatTimestamps(lines)) ));
        connectionLog.on('Log', (lines: LogLineType[]) =>  updateCachedData(draft => concat(draft, formatTimestamps(lines)) ));
        await connectionLog.start();
        
        await cacheEntryRemoved;
        await connectionLog?.stop();
      },
    }),
  }),
});

export const { useGetLogsQuery } = logsApi;