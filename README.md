# HealthTrackPro
The repository from the striped squad from TechLabs winter term 23/24

Install nx: npm install nx -g

Go into the health-track-pro folder and run following command: npm start

(alternatively: nx run-many -t serve -p express-ts react)

common naming convention for branches

feat - feature fix - solving an issue chore - technical debt

https://www.conventionalcommits.org/en/v1.0.0/


/// TEST USER LOGIN ///

Email: wany1979@cuvox.de Passowrd: Abc123456!

=> if you want to try the API using Postman, you need to copy the cookie you get from localhost:4200 after logging in. Right-click -> "Untersuchen" -> "Anwendungen" (upper navbar) -> copy the cookie value -> on Postman click "cookies" -> add "localhost" as domain -> click "add cookie" -> set "cookie_1" to "appSession" and "value" to the value you copied