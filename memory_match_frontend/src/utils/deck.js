const EMOJIS = [
  // Default "Fish" set; Fruits/Flower are applied in GamePage by overriding faces post-shuffle.
  '🐚','🐬','🐳','🐟','🦀','🐠','🪸','🐙','🦈','🪼','🌊','⚓️','🧜‍♀️','🦑','🐡','🌅',
  '🧭','🪙','🪼','🫧','🐢','🦐','🪼','🪞'
];

/**
 * PUBLIC_INTERFACE
 * createDeck builds an array of cards with pairs and initial state.
 * @param {number} pairCount number of pairs to include
 * @returns {Array<{id:string,pairId:string,face:string,isFlipped:boolean,isMatched:boolean}>}
 */
export function createDeck(pairCount = 8) {
  const faces = EMOJIS.slice(0, Math.max(2, Math.min(pairCount, EMOJIS.length)));
  const cards = [];
  let idCounter = 0;
  faces.forEach((face, idx) => {
    const pairId = `p-${idx}`;
    const cardA = {
      id: `c-${idCounter++}`,
      pairId,
      face,
      isFlipped: false,
      isMatched: false,
    };
    const cardB = {
      id: `c-${idCounter++}`,
      pairId,
      face,
      isFlipped: false,
      isMatched: false,
    };
    cards.push(cardA, cardB);
  });
  return cards;
}
