const db = require('../config/connection');
const { User, Journal } = require('../models');
const userSeeds = require('./userSeeds.json');
const journalSeeds = require('./journalSeeds.json');

db.once('open', async () => {
  try {
    await Journal.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < journalSeeds.length; i++) {
      const { _id, journalAuthor } = await Journal.create(journalSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: journalAuthor },
        {
          $addToSet: {
            journals: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
