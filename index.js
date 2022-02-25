const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const hltb = require('howlongtobeat');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/hours', async (req, res) => {
  const game = req.query['game']?.toString();
  // gameplayMain, gameplayMainExtra, gameplayCompletionist
  const completionStyle = req.query['completionStyle']?.toString() ?? 'gameplayMain';

  if (!game) {
    res.sendStatus(500);
    return;
  }

  const hltbService = new hltb.HowLongToBeatService();
  const result = (await hltbService.search(game))[0];
  if (!result) {
    res.send("?");
    return;
  }

  res.send(`${result[completionStyle]}`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
