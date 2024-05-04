const express = require('express');
const app = express();

app.use(express.urlencoded());

app.post("/auth", function (req, res) {
  /* This server is only available to nginx */
  const streamkey = req.body.key;

  /* You can make a database of users instead :) */
  if (streamkey === "supersecret") {
    res.status(200).send();
    return;
  }

  /* Reject the stream */
  res.status(403).send();
});

app.listen(8000, function () {
  console.log("Listening on port 8000!");
});

const users = [
  { username: 'admin', password: 'playerjim919' }
];

app.use(bodyParser.urlencoded({ extended: true }));

// Ana sayfa
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Kullanıcı giriş formu post isteği
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Kullanıcı doğrulama
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
      // Başarılı giriş, livestream.html dosyasını gönder
      res.sendFile(path.join(__dirname, '/livestream.html'));
  } else {
      res.send('Kullanıcı adı veya şifre yanlış!');
  }
});

// livestream.html dosyasına erişimi kontrol et
app.get('/livestream.html', (req, res, next) => {
  // Kullanıcı girişi yapılmış mı kontrol et
  const isUserAuthenticated = /* Burada giriş yapılmış olup olmadığını kontrol et */;

  if (isUserAuthenticated) {
      // Kullanıcı girişi yapılmışsa, dosyayı gönder
      res.sendFile(path.join(__dirname, '/livestream.html'));
  } else {
      // Kullanıcı girişi yapılmamışsa, giriş sayfasına yönlendir
      res.redirect('/');
  }
});

app.listen(port, () => {
  console.log(`Uygulama http://localhost:${port} adresinde çalışıyor.`);
});