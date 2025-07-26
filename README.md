# ArvUtil API

A NestJS application with MongoDB integration using Mongoose, featuring modular architecture with validation and configuration management.

## Features

- **NestJS Framework**: Modern Node.js framework with TypeScript support
- **MongoDB Integration**: Database backend using Mongoose ODM
- **Modular Architecture**: Each REST entity in its own module
- **Validation**: Request validation using class-validator and ValidationPipe
- **Configuration**: Environment-based configuration using ConfigModule
- **TypeScript**: Full TypeScript support with strict typing
- **Rate Limiting**: Global rate limiting at 50 requests per minute per IP
- **Proxy Trust**: Configured to trust proxy headers for proper IP detection
- **Payload Limits**: Request payload size limited to 1MB

## Project Structure

```
src/
├── tracking/               # Tracking module
│   ├── controller/        # REST controllers
│   ├── dtos/             # Data Transfer Objects with validation
│   ├── services/         # Business logic services
│   ├── models/           # Mongoose models
│   └── tracking.module.ts # Module definition
├── app.module.ts         # Root application module
└── main.ts              # Application entry point
```

## Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `env.example`:

   ```bash
   cp env.example .env
   ```

4. Update the `.env` file with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/arvutil-api
   PORT=3000
   NODE_ENV=development
   ```

## Running the Application

### Development Mode

```bash
npm run start:dev
```

### Production Mode

```bash
npm run build
npm run start:prod
```

### Debug Mode

```bash
npm run start:debug
```

## API Endpoints

### Tracking Module (`/v1/tr`)

- `POST /v1/tr` - Track an app event

  - **Body Parameters:**
    - `deviceName` (string, max 128 chars) - Name of the device
    - `appVersion` (string, max 64 chars) - Version of the application
    - `eventName` (string, max 64 chars, required) - Name of the event
    - `eventData` (object) - Free-form event data
  - **Response:** `{ success: boolean, id: string }`

## Module Structure

Each module follows this structure:

- **controller/**: REST API endpoints
- **dtos/**: Data Transfer Objects with validation decorators
- **services/**: Business logic and database operations
- **models/**: Mongoose schema definitions
- **module.ts**: Module configuration and dependencies

## Validation

The application uses `class-validator` for request validation. DTOs include validation decorators like:

- `@IsString()` - Validates string type
- `@IsEmail()` - Validates email format
- `@MinLength()` - Validates minimum length
- `@IsOptional()` - Makes fields optional

## Configuration

Environment variables are managed through `@nestjs/config`:

- Database connection string
- Application port
- Environment mode

## Security Features

- **Rate Limiting**: 50 requests per minute per IP address
- **Proxy Trust**: Configured to trust proxy headers (X-Forwarded-For, X-Real-IP)
- **Payload Limits**: Maximum request size of 1MB
- **Input Validation**: All inputs validated using class-validator decorators

## Database

MongoDB is used as the database with Mongoose ODM:

- Automatic schema validation
- TypeScript integration
- Timestamps and soft deletes
- Indexing support
