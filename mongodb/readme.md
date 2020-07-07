# mongodb app
docker build -t mongo .

# adding users

## mongo users
### test connection
mongo localhost:27017/appdb --username appdb --password example
### simple auth
mongo --username root --password example
### select db
use appdb
### create new user notice role
https://docs.mongodb.com/manual/reference/built-in-roles/

db.createUser({
    user: "appdb",
    pwd: "example",
    roles: [ { role: 'readWrite', db: "appdb" } ]
})

### edit the docker-entrypoint.sh to create users on db start

### example:
```bash
rootAuthDatabase='appdb'
"${mongo[@]}" "$rootAuthDatabase" <<-EOJS
    db.createUser({
        user: $(_js_escape "$MONGO_INITDB_APP_ROOT_USERNAME"),
        pwd: $(_js_escape "$MONGO_INITDB_APP_ROOT_PASSWORD"),
        roles: [ { role: 'readWrite', db: $(_js_escape "$rootAuthDatabase") } ]
    })
EOJS
```

