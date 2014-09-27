# Notes
We need the following indexes in mongo:

```bash
db.pasmo_locations.ensureIndex({name: "text"})
db.pasmo_locations.ensureIndex({deleted: 1})
db.pasmo_locations.ensureIndex({id: 1})
db.pasmo_locations.ensureIndex({loc: "2dsphere"})
```