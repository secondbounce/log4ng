@echo off

if "%1"=="angular" goto angular
goto end

:angular
echo Updating angular - press any key...
pause
npm install --save-dev @angular/common@4
npm install --save-dev @angular/compiler@4
npm install --save-dev @angular/compiler-cli@4
npm install --save-dev @angular/core@4
npm install --save-dev @angular/platform-browser@4
npm install --save-dev @angular/platform-browser-dynamic@4

npm install --save-dev @angular/common
npm install --save-dev @angular/core
npm install --save-dev @angular/platform-browser
npm install --save-dev @angular/platform-browser-dynamic
npm install --save-dev @angular/compiler
npm install --save-dev @angular/compiler-cli
npm install --save-dev @angular/router
npm install --save-dev @angular/language-service
npm install --save-dev @angular/forms
npm install --save-dev @angular/http
npm install --save-dev @angular/animations
npm install --save-dev @angular/cli

npm install --save-dev @types/node@6.0
npm install --save-dev core-js
npm install --save-dev zone.js
npm install --save-dev rxjs
npm install --save-dev rimraf
npm install --save-dev typescript
npm install --save-dev tslint
npm install --save-dev codelyzer
npm install --save-dev @types/jasmine
npm install --save-dev @types/jasminewd2
npm install --save-dev jasmine-core
npm install --save-dev jasmine-spec-reporter

npm install --save-dev karma
npm install --save-dev rollup
npm install --save-dev rollup-plugin-commonjs
npm install --save-dev jsrsasign
npm install --save-dev ng2-completer

if %1==angular goto end

:end
echo on
