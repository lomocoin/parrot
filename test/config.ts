export default {
  "port": 3000,
  "auth": {
    "username": "custom-username",
    "password": "custom-password",
    "whiteList": [
      "/lists"
    ]
  },
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "noImplicitAny": true,
    "moduleResolution": "node",
    "sourceMap": true,
    "declaration": true,
    "baseUrl": ".",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "strictNullChecks": true,
    "paths": {
      "*": [
        "node_modules/*"
      ]
    },
    "typeRoots" : ["test/models"]
  },
  "include": [
    "test/models/**/*"
  ],
  "exclude": [
    "src"
  ]
}
