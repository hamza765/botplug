import pg from 'pg';
pg.defaults.poolSize = 25;
const conString = "postgres://vbgqlfpjfnnnkf:df3903e05d4711ce45db00b3fccde25e1e74c6805e97a92cc05c1a3f9d703444@ec2-54-243-197-180.compute-1.amazonaws.com:5432/d88the3bl2c30r"


export default function(q, callback) {
    pg.connect(conString, function(err, client, done) {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            client.query(q, function(err, result) {
                done();
                callback(err, result);
            });
        }
    });
}
