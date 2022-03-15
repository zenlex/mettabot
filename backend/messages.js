// the attention getter/greeting
const p1 = [
  'Champ',
  'Fact:',
  'Everybody says',
  'Dang...',
  'Check it:',
  'Just saying...',
  'Superstar,',
  'Tiger,',
  'Self,',
  'Know this:',
  'News Alert:',
  'Girl,',
  'Ace,',
  'Excuse me but',
  'Experts agree:',
  'In my opinion,',
  'Hear ye, hear ye:',
  'Okay, listen up:',
];

// the identifier
const p2 = [
  'the mere idea of you',
  'your soul',
  'your hair today',
  'everything you do',
  'your personal style',
  'every thought you have',
  'that sparkle in your eye',
  'your presence here',
  'what you got going on',
  'the essential you',
  "your life's journey",
  'that saucy personality',
  'your DNA',
  'that brain of yours',
  'your choice of attire',
  'the way you roll',
  'whatever your secret is',
  "all of y'all",
];

// the compliment
const p3 = [
  'has serious game,',
  'rains magic,',
  'deserves the Nobel Prize,',
  'raises the roof,',
  'breeds miracles,',
  'is paying off big time,',
  'shows mad skills,',
  'just shimmers,',
  'is a national treasure,',
  'gets the party hopping,',
  'is the next big thing,',
  'roars like a lion,',
  'is a rainbow factory,',
  'is made of diamonds,',
  'makes birds sing,',
  'should be taught in school,',
  "makes my world go 'round,",
  'is 100% legit,',
];

// the closer
const p4 = [
  '24/7.',
  'can I get an amen?',
  "and that's a fact.",
  'so treat yourself.',
  'you feel me?',
  "that's just science.",
  'would I lie?',
  'for reals.',
  'mic drop.',
  'you hidden gem.',
  'snuggle bear.',
  'period.',
  "now let's dance.",
  'high five.',
  'say it again!',
  'according to the news.',
  'so get used to it.',
];

//insert random message - replace/build this out into proper back end

const msgContainer = document.getElementById('message');
const msgBg = document.getElementById('messagebg');
const newmsg = `${p1[Math.floor(Math.random() * p1.length)]} ${
  p2[Math.floor(Math.random() * p2.length)]
} ${p3[Math.floor(Math.random() * p3.length)]} ${
  p4[Math.floor(Math.random() * p4.length)]
}`;

msgContainer.textContent = newmsg;
msgBg.textContent = newmsg;
//add random animation
const animationClasses = ['gradientmask', 'waterwave'];
const animindex = Math.floor(Math.random() * animationClasses.length);
msgContainer.classList.add(animationClasses[animindex]);
msgBg.classList.add(animationClasses[animindex]);
