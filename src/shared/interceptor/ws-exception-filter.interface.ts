import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch(WsException)
export class WSExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const callback = host.getArgByIndex(2);
    if (callback && typeof callback === 'function') {
      callback({ exception: exception.message });
    }
  }
}
