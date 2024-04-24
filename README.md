NestJS + Apollo Studio with RESTDataSources example with a focus on request-scoped providers.

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
