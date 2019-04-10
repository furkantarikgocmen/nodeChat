const redisClient = require('../redisClient');

function Users() {
    this.client = redisClient.getClient()
}

module.exports = new Users();


Users.prototype.upsert = function (connectionId, meta) {
    this.client.hset(
        'online',
        meta._id,
        JSON.stringify({
            connectionId,
            meta,
            when: Date.now()
        }),
        err => {
            if(err)
                console.log(err)
        }
    )
};


Users.prototype.remove = function (_id) {
    this.client.hdel(
        'online',
        _id,
        err => {
            if(err) {
                console.log(err);
            }
        }
    )
};


Users.prototype.list = function (callback) {
    let active = [];
    this.client.hgetall('online', function (err, users) {
        if(err){
            console.log(err);
            return callback([])
        }

        for(let user in users){
            active.push(JSON.parse(users[user]));
        }

        return callback(active);
    })
};