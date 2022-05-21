# Fakeddit - An @entria challenge

> **:warning: ATTENTION**
>
> Some scripts of each project have been written based on \*nix commands (cp, mv,
> etc), so if you are running this project on a Windows-based system, you can have
> some problems running it. It'll fix soon. Feel free to create an issue if you find
> or a PR that fixes this problem!

## How to run

### Developer environment

#### Setup Docker + MongoDB

```
docker run -d -p 27017:27017 --name fakeddit-mongo -d mongo:latest
```

#### Copying the environment variables

```
yarn copy-envs
```

And fill the environment variables on `@fakeddit/server` and `@fakeddit/web`
with the values.

#### Install the dependencies
First of all, install the dependencies.
```
yarn install
```

#### Running server

Generate the `schema.graphql` file running:

```
yarn workspace @fakeddit/server schema:generate
```

Now, run the server:

```
yarn workspace @fakeddit/server start:dev
```

#### Running the web app

First of all, generate the types (artifacts) from `relay-compiler`:

```
yarn workspace @fakeddit/web relay
```

And now, you can run the web project:

```
yarn workspace @fakeddit/web start:dev
```

### Running packages together

If you already do the necessary setup on the packages, you can run the packages
concurrently with just only one command:

```
yarn dev:all
```

To run the project as dev mode.

## References

- [Relay Realworld](https://github.com/sibelius/relay-realworld)
- [RBAF GraphQL API](https://github.com/daniloab/rbaf-graphql-api)
- [Dev Su](https://github.com/Tsugami/dev-su)
- [Fullstack Playground](https://github.com/daniloab/fullstack-playground)
