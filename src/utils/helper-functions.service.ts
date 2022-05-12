import { Injectable } from '@nestjs/common';
import { ClientSession, Connection } from 'mongoose';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HelperFunctionsService {
  constructor(private readonly configService: ConfigService) {}

  hasOwnProperty<X extends unknown, Y extends PropertyKey>(
    obj: X,
    prop: Y,
  ): obj is X & Record<Y, unknown> {
    return Object.hasOwnProperty.call(obj, prop);
  }

  async mongooseTransaction<T>(
    connection: Connection,
    transaction: (session: ClientSession) => Promise<T>,
  ): Promise<T> {
    let result: T = null;

    await connection.transaction(async (session) => {
      result = await transaction(session);
    });

    return result;
  }

  private readonly mimeTypeToExtension = {
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      'docx',
    'application/msword': 'doc',
    'application/pdf': 'pdf',
    'image/jpeg': 'jpg',
  };

  getFileExtensionFromMimeType(mimeType: string): string {
    return this.mimeTypeToExtension[mimeType];
  }

  getTokenFromCookie(request: Request): string | null {
    let token = null;
    if (request?.cookies) {
      token = request.cookies[this.configService.get('cookieJwtKey')];
    }
    return token;
  }

  toFirstLowerLetter(name: string): string {
    const stringArray = name.split('');
    stringArray[0] = stringArray[0].toLowerCase();
    return stringArray.join('');
  }
}
