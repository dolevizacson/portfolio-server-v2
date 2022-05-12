import { ClientSession, Connection } from 'mongoose';
import { Request } from 'express';

export interface Helpers {
  hasOwnProperty: <X extends unknown, Y extends PropertyKey>(
    obj: X,
    prop: Y,
  ) => obj is X & Record<Y, unknown>;

  mongooseTransaction: <T>(
    connection: Connection,
    transaction: (session: ClientSession) => Promise<T>,
  ) => Promise<T>;

  getFileExtensionFromMimeType: (mimeType: string) => string;

  getTokenFromCookie: (req: Request) => string;
}

export const hasOwnProperty = <X extends unknown, Y extends PropertyKey>(
  obj: X,
  prop: Y,
): obj is X & Record<Y, unknown> => {
  return Object.hasOwnProperty.call(obj, prop);
};

export const mongooseTransaction = async <T>(
  connection: Connection,
  transaction: (session: ClientSession) => Promise<T>,
): Promise<T> => {
  let result: T = null;

  await connection.transaction(async (session) => {
    result = await transaction(session);
  });

  return result;
};

const mimeTypeToExtension = {
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'docx',
  'application/msword': 'doc',
  'application/pdf': 'pdf',
  'image/jpeg': 'jpg',
};

export const getFileExtensionFromMimeType = (mimeType: string): string => {
  return mimeTypeToExtension[mimeType];
};

export const getTokenFromCookie = (request: Request): string | null => {
  let token = null;
  if (request?.cookies) {
    token = request.cookies['jwt'];
  }
  return token;
};
