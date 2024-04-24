import { AugmentedRequest, RESTDataSource } from '@apollo/datasource-rest';
import { v4 as uuid } from 'uuid';
import { GqlContext } from './gql-context.interface';

const IDENT_HEADER = 'X-Shipt-Identifier';
const IDENT_HEADER_LOWER = IDENT_HEADER.toLowerCase();
const JWT_HEADER = 'X-User-OktaJWT';
const REQUEST_ID_HEADER = 'X-Request-Id';
const REQUEST_ID_HEADER_LOWER = REQUEST_ID_HEADER.toLowerCase();

export class GqlDataSource extends RESTDataSource {
  public readonly context: GqlContext
  
  protected willSendRequest(_path: string, options: AugmentedRequest) {
    const shiptIdent = this.getShiptIdentifer(options.headers);
    const identHeaderValue = `gravemind-apollo/${shiptIdent || 'unknown'}`;
    options.headers[REQUEST_ID_HEADER] = this.getRequestId(options.headers);
    options.headers[IDENT_HEADER] = identHeaderValue;

    // if (this.context.token) {
    //   options.headers[JWT_HEADER] = this.context.token;
    // }
  }

  private getShiptIdentifer(headers: Record<string, string>) {
    const vals = headers[IDENT_HEADER_LOWER];
    return Array.isArray(vals) ? vals[0] : vals;
  }

  private getRequestId(headers: Record<string, string>) {
    const vals =
      headers[REQUEST_ID_HEADER_LOWER] ?? headers[REQUEST_ID_HEADER] ?? uuid();
    return Array.isArray(vals) ? vals[0] : vals;
  }

  // override caching for now
  protected cacheOptionsFor() {
    return { ttl: 0 };
  }
}
