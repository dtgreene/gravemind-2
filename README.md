NestJS + Apollo Studio with RESTDataSources example. The problem I had with the official NestJS docs were that they didn't cover context access or request-scoped providers.

Schema first example:
https://github.com/nestjs/nest/tree/master/sample/12-graphql-schema-first

Code first example:
https://github.com/nestjs/nest/tree/master/sample/23-graphql-code-first

### gql-data-source.ts
```typescript
interface GqlContext {
  token?: string
  jwt?: {}
}

export class GqlDataSource extends RESTDataSource {
  constructor(public readonly context: GqlContext) {
    super();
  }

  protected willSendRequest(path: string, options: AugmentedRequest) {
    // Forward the incoming request's token to all outbound requests made via
    // the RESTDataSource.
    options.headers['My-Token-Header'] = this.context.token;
  }
}
```

### pokemon.api.ts
```typescript
@Injectable({ scope: Scope.REQUEST })
export class PokemonAPI extends GqlDataSource {
  baseURL = 'https://pokeapi.co';

  constructor(@Inject(CONTEXT) context: GqlContext) {
    super(context);
  }

  async getPokemon() {
    const { results } = await this.get('/api/v2/pokemon');

    return results;
  }
}
```
