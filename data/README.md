Serve up a backend with json-server.

Don't install json-server as a dependency (as per the default documentation, `npm i json-server`). Instead, just launch it with npx, `npx json-server -p 3500 -w data/db.json`

-   `-p`: port
-   `-w`: watch

Note that within the db file, the "id" keys are wrapped in quotes,which was not necessary when the data is hardcoded as JavaScript directly within the application.
