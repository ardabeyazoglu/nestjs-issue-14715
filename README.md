# Test project to reproduce nestjs issue #14715

Run `npm i` and `npm run start` to run the app first.

Open <http://localhost:3000> and send a post request using the code below:

```typescript
await fetch("/v1/webhooks", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({name: "value"})
})
```

You should receive the following console error output:

```text
dto args undefined
[Nest] 2840  - 28/02/2025, 15:23:13   ERROR [ExceptionsHandler] TypeError: Cannot read properties of undefined (reading 'name')
    at new WebhookDto (Q:\Works\personal\nestjs-test\dist\apps\api\webpack:\api\src\webhook\dto\webhook.dto.ts:18:22)
    at TransformOperationExecutor.transform (Q:\Works\personal\nestjs-test\node_modules\src\TransformOperationExecutor.ts:160:22)
    at ClassTransformer.plainToInstance (Q:\Works\personal\nestjs-test\node_modules\src\ClassTransformer.ts:77:21)
    at Object.plainToInstance (Q:\Works\personal\nestjs-test\node_modules\src\index.ts:84:27)
    at ValidationPipe.transform (Q:\Works\personal\nestjs-test\node_modules\@nestjs\common\pipes\validation.pipe.js:60:39)
    at Q:\Works\personal\nestjs-test\node_modules\@nestjs\core\pipes\pipes-consumer.js:16:33
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
```
