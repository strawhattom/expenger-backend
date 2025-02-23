## Setup

### Environment

In a .env file at the root of the project:
```
MONGOOSE_URL = <your_mongodb_url>
JWT_SECRET = <your_secret>
```

### Install Nest CLI
```
npm install -g @nestjs/cli
```

### Install NPM dependencies
```
npm install
nest start
```

## Running

### Dev

```
nest start --env-file .env --watch
```