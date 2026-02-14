# NestJS Request Lifecycle Playground

Repository nay dung de minh hoa request lifecycle trong NestJS, phu hop cho nguoi moi hoc.

## Request Flow

Request  
-> Middleware  
-> Guard  
-> Pipe  
-> Controller  
-> Interceptor  
-> Exception Filter (chi chay khi co loi)

## What Is Implemented

### 1. Middleware (`RequestIdMiddleware`)
- Gan `x-request-id` vao request/response.
- Neu client khong gui `x-request-id`, server tu sinh bang `randomUUID()`.
- Gan them `req.startRequest` de phuc vu logging/thoi gian xu ly.

File: `src/common/middleware/requestId.middleware.ts`

### 2. Guards
- `AuthorizationGuard`: chi cho phep request khi `req.payload` ton tai.
- `RoleGuard`: doc role tu decorator `@Roles(...)` va so sanh voi `req.payload.role`.

Files:
- `src/common/guard/authorization.guard.ts`
- `src/common/guard/role.guard.ts`
- `src/common/decorator/role.decorator.ts`

### 3. Validation Pipe
- Dang su dung global `ValidationPipe` cua Nest trong `main.ts`:
  - `whitelist: true`
  - `forbidNonWhitelisted: true`
  - `transform: true`
- Co them custom pipe demo (`src/common/pipe/validation.pipe.ts`) de minh hoa transform du lieu.

### 4. Interceptors
- `LoggingInterceptor`: log truoc/sau request va thoi gian xu ly.
- `TransformInterceptor`: chuan hoa response theo `ResponseMapping<T>` (hien co trong codebase, nhung chua duoc dang ky global trong `AppModule`).

Files:
- `src/common/interceptor/logging.interceptor.ts`
- `src/common/interceptor/transform.interceptor.ts`
- `src/type/mapping.type.ts`

### 5. Exception Filter
- Bat loi toan cuc va tra ve format error thong nhat:
  - `success`
  - `code`
  - `message`
  - `timestamp`
  - `path`
  - `method`
  - `requestId`

Files:
- `src/common/exception-filter/exception.error.ts`
- `src/type/error.type.ts`

## Routes

- `GET /` -> tra ve `"Hello World!"`
- `GET /data` -> can role `admin` qua `@Roles(['admin'])`

File: `src/app.controller.ts`

## Run Project

```bash
pnpm install
pnpm dev
```

Mac dinh app chay o: `http://localhost:3001`

## Notes

- Project nay tap trung vao cau truc va lifecycle, khong phai auth day du.
- `AuthorizationGuard` dang kiem tra `req.payload`; ban can co co che inject payload (VD: auth middleware/JWT guard) neu muon test end-to-end.
- Neu muon format response thanh cong theo `ResponseMapping<T>` cho tat ca route, dang ky `TransformInterceptor` trong `AppModule` bang `APP_INTERCEPTOR`.
