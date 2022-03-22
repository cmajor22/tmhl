const { email } = require("../constants");

module.exports = (express, connection) => {
  var router = express.Router();
  const nodemailer = require("nodemailer");
  let transporter = nodemailer.createTransport({
    host: email.host,
    port: email.port,
    secure: email.secure,
    auth: {
      user: email.user,
      pass: email.pass,
    },
  });

  router.put('/', function(req, res, next) {
    const {name,address,city,postalCode,email,phone,mobile,age,division,position,levelPlayed,lastYear,people,comments} = req.body;
    
    console.log(req.body)
    transporter.sendMail({
      from: 'emails@tottenhammensleague.com',
      to: "c.major88@live.com",
      subject: `Player Registration ${division && `(${division})`}: ${name}`,
      html: `${emailContent(req.body)}`,
    });

    const sql = `INSERT INTO totte873_tmhlwp.waitinglist 
      (name,address,city,postalCode,email,phone,mobile,age,division,position,level,lastYear,people,comments,createdTime)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,now());`;

    connection.query(sql, [
        name,
        address??'',
        city??'',
        postalCode??'',
        email,
        phone??'',
        mobile??'',
        age??'',
        division??'',
        position??'',
        levelPlayed??'',
        lastYear??'',
        people??'',
        comments
      ], function (err, rows) {
      if (err) throw {err};
      res.send(rows);
    });
  });

  function emailContent(info) {
    return `A new player has registered for the TMHL ${info.division && `${info.division} league`}
      <br /><br />
      <b>Name:</b> ${info.name}<br />
      <b>Address:</b> ${info.address}<br />
      <b>City:</b> ${info.city}<br />
      <b>Postal Code:</b> ${info.postalCode}<br />
      <b>Email:</b> ${info.email}<br />
      <b>Phone:</b> ${info.phone}<br />
      <b>Mobile:</b> ${info.mobile}<br />
      <b>Age:</b> ${info.age}<br />
      <b>Division:</b> ${info.division}<br />
      <b>Preferred Position:</b> ${info.position}<br />
      <b>Highest Level Played:</b> ${info.levelPlayed}<br />
      <b>Last Year:</b> ${info.lastYear}<br />
      <b>People:</b> ${info.people}<br />
      <b>Comments:</b> ${info.comments}
    `
  }

  return router;
}