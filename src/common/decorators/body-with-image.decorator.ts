import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import DataURIParser from 'datauri/parser';
import { Request } from 'express';
import path from 'path';

export const BodyWithImage = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const parser = new DataURIParser();

    if (request.files) {
      request.body.url = parser.format(
        path.extname(request.files[0].originalname),
        request.files[0].buffer,
      ).content;
    }

    return request.body;
  },
);
