import { BoardgameState, BookState, PrismaClient } from '@/../generated/prisma';
import { getPlaiceholder } from 'plaiceholder';

const getImageData = async (imageUrl: string): Promise<string> => {
  if (!imageUrl) {
    return '';
  }

  try {
    const bufferImage = await fetch(imageUrl).then(async (r) => Buffer.from(await r.arrayBuffer()));
    const { base64 } = await getPlaiceholder(bufferImage, { size: 10 });

    return base64;
  } catch (error) {
    console.error(`getImageData error for the URL ${imageUrl}`, error);

    return '';
  }
};

const prisma = new PrismaClient();

const seedBoardgames = async () => {
  console.info('🏁 seedBoardgames started...');

  console.info('📭 Deleting all the boardgames...');
  await prisma.boardgame.deleteMany();

  console.info('➕ Creating the new boardgames...');
  await prisma.boardgame.createMany({
    data: [
      {
        name: 'Activity',
        duration: '45',
        age: '12+',
        players: '3-16',
        image:
          'https://cf.geekdo-images.com/zGLFwx-YVwoSFkKQ9hr4cw__imagepagezoom/img/jpSmHQ2qRTEKv3w_PVY_yWjsoYU=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic1882656.jpg',
        blurData: await getImageData(
          'https://cf.geekdo-images.com/zGLFwx-YVwoSFkKQ9hr4cw__imagepagezoom/img/jpSmHQ2qRTEKv3w_PVY_yWjsoYU=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic1882656.jpg'
        ),
        link: 'https://boardgamegeek.com/boardgame/8790/activity',
        state: BoardgameState.Own,
        tags: 'Action/Dexterity,Card game,Party game',
        createdAt: new Date('2023-12-13 15:33:12.886'),
        updatedAt: new Date('2023-12-13 15:33:12.886')
      },
      {
        name: 'Alias',
        duration: '60',
        age: '7+',
        players: '4-12',
        image:
          'https://cf.geekdo-images.com/MQQmnWV5XnCjYav7g42iLQ__imagepage/img/reQW8rOYM16Xk0kxumI7JE93r7M=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3214285.jpg',
        blurData: await getImageData(
          'https://cf.geekdo-images.com/MQQmnWV5XnCjYav7g42iLQ__imagepage/img/reQW8rOYM16Xk0kxumI7JE93r7M=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3214285.jpg'
        ),
        link: 'https://boardgamegeek.com/boardgame/3818/alias',
        state: BoardgameState.Own,
        tags: 'Party game,Trivia,Word game',
        createdAt: new Date('2023-12-13 15:33:12.886'),
        updatedAt: new Date('2023-12-13 15:33:12.886')
      },
      {
        name: 'Party Alias',
        duration: '30',
        age: '11+',
        players: '4-24',
        image:
          'https://cf.geekdo-images.com/4E4zyun0230LVq1XjHnazA__imagepage/img/LYTX2qNCCxcVG3HWV68yx6F8f1A=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4926067.jpg',
        blurData: await getImageData(
          'https://cf.geekdo-images.com/4E4zyun0230LVq1XjHnazA__imagepage/img/LYTX2qNCCxcVG3HWV68yx6F8f1A=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4926067.jpg'
        ),
        link: 'https://boardgamegeek.com/boardgame/43530/party-alias',
        state: BoardgameState.Own,
        tags: 'Humor,Party game,Racing,Trivia,Word game',
        createdAt: new Date('2023-12-13 15:33:12.886'),
        updatedAt: new Date('2023-12-13 15:33:12.886')
      },
      {
        name: 'Azul',
        duration: '30-45',
        age: '8+',
        players: '2-4',
        image:
          'https://cf.geekdo-images.com/aPSHJO0d0XOpQR5X-wJonw__imagepage/img/q4uWd2nXGeEkKDR8Cc3NhXG9PEU=/fit-in/900x600/filters:no_upscale():strip_icc()/pic6973671.png',
        blurData: await getImageData(
          'https://cf.geekdo-images.com/aPSHJO0d0XOpQR5X-wJonw__imagepage/img/q4uWd2nXGeEkKDR8Cc3NhXG9PEU=/fit-in/900x600/filters:no_upscale():strip_icc()/pic6973671.png'
        ),
        link: 'https://boardgamegeek.com/boardgame/230802/azul',
        state: BoardgameState.Own,
        tags: 'Abstract strategy,Puzzle,Renaissance',
        createdAt: new Date('2023-12-13 15:33:12.886'),
        updatedAt: new Date('2023-12-13 15:33:12.886')
      },
      {
        name: 'Catan Histories: Rise of the Inkas',
        duration: '90',
        age: '12+',
        players: '3-4',
        image:
          'https://cf.geekdo-images.com/eWZsv7izrULEQfbsYERmEw__imagepage/img/0NyNWhKveEO5Vw3lott_LTULve4=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4134942.png',
        blurData: await getImageData(
          'https://cf.geekdo-images.com/eWZsv7izrULEQfbsYERmEw__imagepage/img/0NyNWhKveEO5Vw3lott_LTULve4=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4134942.png'
        ),
        link: 'https://boardgamegeek.com/boardgame/244144/catan-histories-rise-inkas',
        state: BoardgameState.Own,
        tags: 'Negotiation',
        createdAt: new Date('2023-12-13 15:33:12.886'),
        updatedAt: new Date('2023-12-13 15:33:12.886')
      },
      {
        name: 'Catan: Big Box',
        duration: '75',
        age: '10+',
        players: '1-6',
        image:
          'https://cf.geekdo-images.com/bLDPA2gNUob2WyAst4yubQ__imagepage/img/61jW00nZD4gDU3UPCHJ1abaABb0=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4526596.jpg',
        blurData: await getImageData(
          'https://cf.geekdo-images.com/bLDPA2gNUob2WyAst4yubQ__imagepage/img/61jW00nZD4gDU3UPCHJ1abaABb0=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4526596.jpg'
        ),
        link: 'https://boardgamegeek.com/boardgame/269980/catan-big-box',
        state: BoardgameState.Own,
        tags: 'Civilization,Negotiation',
        createdAt: new Date('2023-12-13 15:33:12.886'),
        updatedAt: new Date('2023-12-13 15:33:12.886')
      },
      {
        name: 'Jenga',
        duration: '20',
        age: '6+',
        players: '1-8',
        image:
          'https://cf.geekdo-images.com/YH5C06snaoJtDqKjwMROPw__imagepage/img/zC1J50A0Ohr0s1UR5eJhky2XxuM=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5140451.jpg',
        blurData: await getImageData(
          'https://cf.geekdo-images.com/YH5C06snaoJtDqKjwMROPw__imagepage/img/zC1J50A0Ohr0s1UR5eJhky2XxuM=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5140451.jpg'
        ),
        link: 'https://boardgamegeek.com/boardgame/2452/jenga',
        state: BoardgameState.Own,
        tags: 'Action/Dexterity,Party game',
        createdAt: new Date('2023-12-13 15:33:12.886'),
        updatedAt: new Date('2023-12-13 15:33:12.886')
      },
      {
        name: 'Pandemic',
        duration: '45',
        age: '8+',
        players: '2-4',
        image:
          'https://cf.geekdo-images.com/S3ybV1LAp-8SnHIXLLjVqA__imagepage/img/kIBu-2Ljb_ml5n-S8uIbE6ehGFc=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1534148.jpg',
        blurData: await getImageData(
          'https://cf.geekdo-images.com/S3ybV1LAp-8SnHIXLLjVqA__imagepage/img/kIBu-2Ljb_ml5n-S8uIbE6ehGFc=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1534148.jpg'
        ),
        link: 'https://boardgamegeek.com/boardgame/30549/pandemic',
        state: BoardgameState.Own,
        tags: 'Medical',
        createdAt: new Date('2023-12-13 15:33:12.886'),
        updatedAt: new Date('2023-12-13 15:33:12.886')
      },
      {
        name: 'Saboteur: The lost mines',
        duration: '30-60',
        age: '10+',
        players: '3-9',
        image:
          'https://cf.geekdo-images.com/ri8mcs_j26dGRxA5e2xITQ__imagepage/img/YYBlFGsMP_nWjujKZJd7FXoepMo=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4496800.jpg',
        blurData: await getImageData(
          'https://cf.geekdo-images.com/ri8mcs_j26dGRxA5e2xITQ__imagepage/img/YYBlFGsMP_nWjujKZJd7FXoepMo=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4496800.jpg'
        ),
        link: 'https://boardgamegeek.com/boardgame/245214/saboteur-lost-mines',
        state: BoardgameState.Own,
        tags: 'Card game,Deduction,Fantasy,Maze',
        createdAt: new Date('2023-12-13 15:33:12.886'),
        updatedAt: new Date('2023-12-13 15:33:12.886')
      },
      {
        name: 'Ticket to Ride: Europe',
        duration: '30-60',
        age: '8+',
        players: '2-5',
        image:
          'https://cf.geekdo-images.com/0K1AOciqlMVUWFPLTJSiww__imagepage/img/pC5hC440R46jn4EpfdYV5rL4VOc=/fit-in/900x600/filters:no_upscale():strip_icc()/pic66668.jpg',
        blurData: await getImageData(
          'https://cf.geekdo-images.com/0K1AOciqlMVUWFPLTJSiww__imagepage/img/pC5hC440R46jn4EpfdYV5rL4VOc=/fit-in/900x600/filters:no_upscale():strip_icc()/pic66668.jpg'
        ),
        link: 'https://boardgamegeek.com/boardgame/14996/ticket-ride-europe',
        state: BoardgameState.Own,
        tags: 'Trains',
        createdAt: new Date('2023-12-13 15:33:12.886'),
        updatedAt: new Date('2023-12-13 15:33:12.886')
      },
      {
        name: 'The Crew: The Quest for Planet Nine',
        duration: '20',
        age: '10+',
        players: '2-5',
        image:
          'https://cf.geekdo-images.com/98LnQShydr11OBKS46xY-Q__imagepage/img/zMKI-BwvaWQiVVwg91Pb5P56uN8=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5687013.jpg',
        blurData: await getImageData(
          'https://cf.geekdo-images.com/98LnQShydr11OBKS46xY-Q__imagepage/img/zMKI-BwvaWQiVVwg91Pb5P56uN8=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5687013.jpg'
        ),
        link: 'https://boardgamegeek.com/boardgame/284083/crew-quest-planet-nine',
        state: BoardgameState.Own,
        tags: 'Card game,Science Fiction,Space Exploration',
        createdAt: new Date('2023-12-13 15:33:12.886'),
        updatedAt: new Date('2023-12-13 15:33:12.886')
      },
      {
        name: 'Shit Happens',
        duration: '20-60',
        age: '18+',
        players: '2-8',
        image:
          'https://cf.geekdo-images.com/d1RGD6HdWfX6loyZU23DDw__imagepage/img/O564mGmk2t2hQbmUHm3Xi97EVQ0=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3303204.jpg',
        blurData: await getImageData(
          'https://cf.geekdo-images.com/d1RGD6HdWfX6loyZU23DDw__imagepage/img/O564mGmk2t2hQbmUHm3Xi97EVQ0=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3303204.jpg'
        ),
        link: 'https://boardgamegeek.com/boardgame/196379/shit-happens',
        state: BoardgameState.Own,
        tags: 'Card game,Party game',
        createdAt: new Date('2023-12-13 15:33:12.886'),
        updatedAt: new Date('2023-12-13 15:33:12.886')
      },
      {
        name: 'Shit Happens: 50 Shades of Shit',
        duration: '15-60',
        age: '18+',
        players: '2-99',
        image:
          'https://cf.geekdo-images.com/NOqCGA7cwOlkkRm4b2LiQg__imagepage/img/SFjefyiP3Uj1PxXgPkVUwk6y_1o=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4207170.png',
        blurData: await getImageData(
          'https://cf.geekdo-images.com/NOqCGA7cwOlkkRm4b2LiQg__imagepage/img/SFjefyiP3Uj1PxXgPkVUwk6y_1o=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4207170.png'
        ),
        link: 'https://boardgamegeek.com/boardgame/255310/shit-happens-50-shades-shit',
        state: BoardgameState.Own,
        tags: 'Card game,Party game',
        createdAt: new Date('2023-12-13 15:33:12.886'),
        updatedAt: new Date('2023-12-13 15:33:12.886')
      },
      {
        name: 'Love Letter',
        duration: '20',
        age: '10+',
        players: '2-6',
        image:
          'https://cf.geekdo-images.com/V7WQjhAh0AatPXTYOrXtCQ__imagepage/img/aY1TC_Wu1Lp8suwWdcTx8_hU-6U=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4766499.png',
        blurData: await getImageData(
          'https://cf.geekdo-images.com/V7WQjhAh0AatPXTYOrXtCQ__imagepage/img/aY1TC_Wu1Lp8suwWdcTx8_hU-6U=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4766499.png'
        ),
        link: 'https://boardgamegeek.com/boardgame/277085/love-letter',
        state: BoardgameState.Own,
        tags: 'Card game,Deduction,Renaissance',
        createdAt: new Date('2023-12-13 15:33:12.886'),
        updatedAt: new Date('2023-12-13 15:33:12.886')
      },
      {
        name: 'Black Stories',
        duration: '20',
        age: '12+',
        players: '2-15',
        image:
          'https://cf.geekdo-images.com/NPnm8Pz2-uvMsbeptOX0fw__imagepage/img/_b94gdpszYq8uoNhvt7r3FQIvoQ=/fit-in/900x600/filters:no_upscale():strip_icc()/pic208686.jpg',
        blurData: await getImageData(
          'https://cf.geekdo-images.com/NPnm8Pz2-uvMsbeptOX0fw__imagepage/img/_b94gdpszYq8uoNhvt7r3FQIvoQ=/fit-in/900x600/filters:no_upscale():strip_icc()/pic208686.jpg'
        ),
        link: 'https://boardgamegeek.com/boardgame/18803/black-stories',
        state: BoardgameState.Own,
        tags: 'Card game,Deduction,Horror,Humor,Murder/Mystery,Party game',
        createdAt: new Date('2023-12-13 15:33:12.886'),
        updatedAt: new Date('2023-12-13 15:33:12.886')
      },
      {
        name: 'Black Stories: Sex and Crime Edition',
        duration: '20',
        age: '17+',
        players: '2-15',
        image:
          'https://cf.geekdo-images.com/5Fdjwb26r-YGW0HF-qnmKA__itemrep/img/VYP0PfWze78ne0OloeOKbbgY9xk=/fit-in/246x300/filters:strip_icc()/pic1366017.jpg',
        blurData: await getImageData(
          'https://cf.geekdo-images.com/5Fdjwb26r-YGW0HF-qnmKA__itemrep/img/VYP0PfWze78ne0OloeOKbbgY9xk=/fit-in/246x300/filters:strip_icc()/pic1366017.jpg'
        ),
        link: 'https://boardgamegeek.com/boardgame/127648/black-stories-sex-and-crime-edition',
        state: BoardgameState.Own,
        tags: 'Card game,Deduction,Horror,Humor,Murder/Mystery,Mature/Adult,Party game',
        createdAt: new Date('2023-12-13 15:33:12.886'),
        updatedAt: new Date('2023-12-13 15:33:12.886')
      },
      {
        name: 'Black Stories: 12 și 15',
        duration: '20',
        age: '12+',
        players: '2-99',
        image:
          'https://cf.geekdo-images.com/3aIWG35mFH7hzmrB7C7P7w__imagepage/img/TpdSjkpVJbmqnC1I3O_zTCU2Fmg=/fit-in/900x600/filters:no_upscale():strip_icc()/pic6639125.png',
        blurData: await getImageData(
          'https://cf.geekdo-images.com/3aIWG35mFH7hzmrB7C7P7w__imagepage/img/TpdSjkpVJbmqnC1I3O_zTCU2Fmg=/fit-in/900x600/filters:no_upscale():strip_icc()/pic6639125.png'
        ),
        link: 'https://boardgamegeek.com/boardgame/274754/black-stories-5-nach-12-edition',
        state: BoardgameState.Own,
        tags: 'Card game,Deduction,Horror,Humor,Murder/Mystery,Party game',
        createdAt: new Date('2023-12-13 15:33:12.886'),
        updatedAt: new Date('2023-12-13 15:33:12.886')
      },
      {
        name: 'Small World of Warcraft',
        duration: '40-80',
        age: '8+',
        players: '2-5',
        image:
          'https://cf.geekdo-images.com/KVLeGFlhzRVDHILRABi-Vg__imagepage/img/AQwNP0Hy9p33qpG2n_F7-ixgh-Q=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5643225.png',
        blurData: await getImageData(
          'https://cf.geekdo-images.com/KVLeGFlhzRVDHILRABi-Vg__imagepage/img/AQwNP0Hy9p33qpG2n_F7-ixgh-Q=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5643225.png'
        ),
        link: 'https://boardgamegeek.com/boardgame/309630/small-world-warcraft',
        state: BoardgameState.Wishlist,
        tags: 'Fantasy,Fighting,Territory building,Video game theme',
        createdAt: new Date('2023-12-13 15:33:12.886'),
        updatedAt: new Date('2023-12-13 15:33:12.886')
      },
      {
        name: '7 Wonders',
        duration: '30',
        age: '10+',
        players: '2-7',
        image:
          'https://cf.geekdo-images.com/RvFVTEpnbb4NM7k0IF8V7A__imagepage/img/zruHYxY2_jx-796WgsDj7hitidQ=/fit-in/900x600/filters:no_upscale():strip_icc()/pic860217.jpg',
        blurData: await getImageData(
          'https://cf.geekdo-images.com/RvFVTEpnbb4NM7k0IF8V7A__imagepage/img/zruHYxY2_jx-796WgsDj7hitidQ=/fit-in/900x600/filters:no_upscale():strip_icc()/pic860217.jpg'
        ),
        link: 'https://boardgamegeek.com/boardgame/68448/7-wonders',
        state: BoardgameState.Wishlist,
        tags: 'Ancient,Card game,City building,Civilization,Economic',
        createdAt: new Date('2023-12-13 15:33:12.886'),
        updatedAt: new Date('2023-12-13 15:33:12.886')
      },
      {
        name: 'Mind MGMT: The Psychic Espionage "Game."',
        duration: '45-75',
        age: '13+',
        players: '1-5',
        image:
          'https://cf.geekdo-images.com/hYP-VIJGRFR8yB78-UN7Rg__imagepage/img/1X9-5PelilGBlFjFaGQKtLrVcAI=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5154610.jpg',
        blurData: await getImageData(
          'https://cf.geekdo-images.com/hYP-VIJGRFR8yB78-UN7Rg__imagepage/img/1X9-5PelilGBlFjFaGQKtLrVcAI=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5154610.jpg'
        ),
        link: 'https://boardgamegeek.com/boardgame/284653/mind-mgmt-psychic-espionage-game',
        state: BoardgameState.Wishlist,
        tags: 'Comic book/strip,Deduction,Fantasy,Science fiction,Spies/Secret agents',
        createdAt: new Date('2023-12-13 15:33:12.886'),
        updatedAt: new Date('2023-12-13 15:33:12.886')
      },
      {
        name: 'Marvel United',
        duration: '40',
        age: '14+',
        players: '1-4',
        image:
          'https://cf.geekdo-images.com/-19XPXmTn9QyyvqwpcFkBw__imagepage/img/vjX_WFkkpegt2ccx5NUUX7XqYZ0=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5231006.jpg',
        blurData: await getImageData(
          'https://cf.geekdo-images.com/-19XPXmTn9QyyvqwpcFkBw__imagepage/img/vjX_WFkkpegt2ccx5NUUX7XqYZ0=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5231006.jpg'
        ),
        link: 'https://boardgamegeek.com/boardgame/298047/marvel-united',
        state: BoardgameState.Wishlist,
        tags: 'Card game,Comic book/strip,Fighting',
        createdAt: new Date('2023-12-13 15:33:12.886'),
        updatedAt: new Date('2023-12-13 15:33:12.886')
      },
      {
        name: 'ZESTREA',
        duration: '45-90',
        age: '12+',
        players: '3-6',
        image:
          'https://cf.geekdo-images.com/jEAxjrvq6dbtVJu06I_HvA__imagepage/img/1TSb-Z-W6rwWNNnvnYcVC3X4QRA=/fit-in/900x600/filters:no_upscale():strip_icc()/pic7143792.jpg',
        blurData: await getImageData(
          'https://cf.geekdo-images.com/jEAxjrvq6dbtVJu06I_HvA__imagepage/img/1TSb-Z-W6rwWNNnvnYcVC3X4QRA=/fit-in/900x600/filters:no_upscale():strip_icc()/pic7143792.jpg'
        ),
        link: 'https://boardgamegeek.com/boardgame/288933/zestrea',
        state: BoardgameState.Own,
        tags: 'Humor,Negotiation',
        createdAt: new Date('2023-12-13 15:33:12.886'),
        updatedAt: new Date('2023-12-13 15:33:12.886')
      }
    ]
  });
};

const seedBooks = async () => {
  console.info('🏁 seedBooks started...');

  console.info('📭 Deleting all the books...');
  await prisma.book.deleteMany();

  console.info('➕ Creating the new books...');
  await prisma.book.createMany({
    data: [
      {
        title: 'Programming TypeScript',
        author: 'Boris Cherny',
        cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1556575755l/45362865._SX318_.jpg',
        blurData: await getImageData(
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1556575755l/45362865._SX318_.jpg'
        ),
        link: 'https://www.goodreads.com/book/show/45362865-programming-typescript',
        state: BookState.Reading,
        isFavorite: false,
        createdAt: new Date('2023-12-13 15:24:39.524'),
        updatedAt: new Date('2023-12-13 15:24:39.524')
      },
      {
        title: 'Express in Action',
        author: 'Evan Hahn',
        cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1623865258l/58354955._SX318_.jpg',
        blurData: await getImageData(
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1623865258l/58354955._SX318_.jpg'
        ),
        link: 'https://www.goodreads.com/book/show/58354955-express-in-action',
        state: BookState.Completed,
        isFavorite: false,
        createdAt: new Date('2023-12-13 15:24:39.524'),
        updatedAt: new Date('2023-12-13 15:24:39.524')
      },
      {
        title: 'Așteptând o altă omenire',
        author: 'Gabriel Liiceanu',
        cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1540825838l/42527927._SY475_.jpg',
        blurData: await getImageData(
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1540825838l/42527927._SY475_.jpg'
        ),
        link: 'https://www.goodreads.com/book/show/42527927-a-tept-nd-o-alt-omenire',
        state: BookState.Wish,
        isFavorite: false,
        createdAt: new Date('2023-12-13 15:24:39.524'),
        updatedAt: new Date('2023-12-13 15:24:39.524')
      },
      {
        title: 'The Intelligent Investor',
        author: 'Benjamin Graham',
        cover:
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1538736375i/42185955.jpg',
        blurData: await getImageData(
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1538736375i/42185955.jpg'
        ),
        link: 'https://www.goodreads.com/book/show/42185955-investitorul-inteligent',
        state: BookState.Reading,
        isFavorite: false,
        createdAt: new Date('2023-12-13 15:24:39.524'),
        updatedAt: new Date('2023-12-13 15:24:39.524')
      },
      {
        title: 'The Messy Middle',
        author: 'Scott Belsky',
        cover:
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1526783935i/40179007.jpg',
        blurData: await getImageData(
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1526783935i/40179007.jpg'
        ),
        link: 'https://www.goodreads.com/book/show/40179007-the-messy-middle',
        state: BookState.Reading,
        isFavorite: false,
        createdAt: new Date('2023-12-13 15:24:39.524'),
        updatedAt: new Date('2023-12-13 15:24:39.524')
      },
      {
        title: 'Inteligențele multiple: Noi perspective',
        author: 'Howard Gardner',
        cover:
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1652268887i/61073605.jpg',
        blurData: await getImageData(
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1652268887i/61073605.jpg'
        ),
        link: 'https://www.goodreads.com/book/show/61073605-inteligen-ele-multiple',
        state: BookState.Wish,
        isFavorite: false,
        createdAt: new Date('2023-12-13 15:24:39.524'),
        updatedAt: new Date('2023-12-13 15:24:39.524')
      },
      {
        title: 'Cel mai bogat om din Babilon',
        author: 'George S. Clason',
        cover:
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1606000515i/15821539.jpg',
        blurData: await getImageData(
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1606000515i/15821539.jpg'
        ),
        link: 'https://www.goodreads.com/book/show/15821539-cel-mai-bogat-om-din-babilon',
        state: BookState.Completed,
        isFavorite: false,
        createdAt: new Date('2023-12-13 15:24:39.524'),
        updatedAt: new Date('2023-12-13 15:24:39.524')
      },
      {
        title: 'Apel către lichele',
        author: 'Gabriel Liiceanu',
        cover:
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1584275202i/52395993.jpg',
        blurData: await getImageData(
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1584275202i/52395993.jpg'
        ),
        link: 'https://www.goodreads.com/book/show/52395993-apel-c-tre-lichele',
        state: BookState.Completed,
        isFavorite: false,
        createdAt: new Date('2023-12-13 15:24:39.524'),
        updatedAt: new Date('2023-12-13 15:24:39.524')
      },
      {
        title: 'Despre somn',
        author: 'Matthew Walker',
        cover:
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1543080679i/42943954.jpg',
        blurData: await getImageData(
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1543080679i/42943954.jpg'
        ),
        link: 'https://www.goodreads.com/book/show/42943954-despre-somn',
        state: BookState.Completed,
        isFavorite: false,
        createdAt: new Date('2023-12-13 15:24:39.524'),
        updatedAt: new Date('2023-12-13 15:24:39.524')
      },
      {
        title: 'Ganduri către sine însuşi',
        author: 'Marcus Aurelius',
        cover:
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630344561i/58892241.jpg',
        blurData: await getImageData(
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630344561i/58892241.jpg'
        ),
        link: 'https://www.goodreads.com/book/show/58892241-ganduri-c-tre-sine-nsu-i',
        state: BookState.Completed,
        isFavorite: false,
        createdAt: new Date('2023-12-13 15:24:39.524'),
        updatedAt: new Date('2023-12-13 15:24:39.524')
      },
      {
        title: 'Scrisori către Luciliu',
        author: 'Seneca',
        cover:
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1605114894i/55881038.jpg',
        blurData: await getImageData(
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1605114894i/55881038.jpg'
        ),
        link: 'https://www.goodreads.com/book/show/55881038-scrisori-c-tre-luciliu',
        state: BookState.Completed,
        isFavorite: false,
        createdAt: new Date('2023-12-13 15:24:39.524'),
        updatedAt: new Date('2023-12-13 15:24:39.524')
      },
      {
        title: 'Alt timp nu am',
        author: 'Seneca',
        cover:
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1409971680i/23161695.jpg',
        blurData: await getImageData(
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1409971680i/23161695.jpg'
        ),
        link: 'https://www.goodreads.com/book/show/23161695-alt-timp-nu-am-despre-scurtimea-vie-ii-despre-via-a-fericit',
        state: BookState.Completed,
        isFavorite: true,
        createdAt: new Date('2023-12-13 15:24:39.524'),
        updatedAt: new Date('2023-12-13 15:24:39.524')
      },
      {
        title: 'A Brief History of Time',
        author: 'Stephen Hawking',
        cover:
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1333578746i/3869.jpg',
        blurData: await getImageData(
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1333578746i/3869.jpg'
        ),
        link: 'https://www.goodreads.com/book/show/3869.A_Brief_History_of_Time',
        state: BookState.Wish,
        isFavorite: false,
        createdAt: new Date('2023-12-13 15:24:39.524'),
        updatedAt: new Date('2023-12-13 15:24:39.524')
      }
    ]
  });
};

const seedLocations = async () => {
  console.info('🏁 seedLocations started...');

  console.info('📭 Deleting all the locations...');
  await prisma.location.deleteMany();

  console.info('➕ Creating the new locations...');
  await prisma.location.createMany({
    data: [
      {
        name: 'Brela, Splitsko-dalmatinska županija',
        visitCounter: 1,
        lastVisitAt: new Date('2023-07-08 16:43:07.222')
      },
      { name: 'Budapest', visitCounter: 1, lastVisitAt: new Date('2023-07-15 19:02:45.749') },
      { name: 'Cluj-Napoca, CJ, RO', visitCounter: 19, lastVisitAt: new Date('2024-03-23 13:11:41.498') },
      { name: 'Izvor, DJ, RO', visitCounter: 1, lastVisitAt: new Date('2023-12-20 19:08:51.467') },
      { name: 'Mărgău, CJ', visitCounter: 1, lastVisitAt: new Date('2023-01-13 13:33:02.439') },
      { name: 'Mătișești, AB, RO', visitCounter: 2, lastVisitAt: new Date('2024-01-12 15:17:33.285') },
      { name: 'Stoenești, OT, RO', visitCounter: 11, lastVisitAt: new Date('2024-03-16 17:04:34.091') },
      { name: 'Șura Mare, SB', visitCounter: 1, lastVisitAt: new Date('2022-12-31 14:47:07.709') },
      { name: 'Ungureni, GL, RO', visitCounter: 17, lastVisitAt: new Date('2024-02-10 15:42:29.982') },
      { name: 'Varaždin, Varaždinska županija', visitCounter: 1, lastVisitAt: new Date('2023-07-07 22:13:02.202') }
    ]
  });
};

const seedCounters = async () => {
  console.info('🏁 seedCounters started...');

  console.info('📭 Deleting all the post counters...');
  await prisma.postCounter.deleteMany();

  console.info('➕ Creating the new post counter...');
  await prisma.postCounter.createMany({
    data: [
      { slug: 'contadocs-platforma-gestiune-documente-contabile', views: 21, likes: 0, loves: 0, awards: 0, wows: 0 },
      { slug: 'euplatesc-nodejs', views: 256, likes: 8, loves: 2, awards: 2, wows: 4 },
      { slug: 'migrare-thinkific-wordpress', views: 1, likes: 0, loves: 0, awards: 0, wows: 0 },
      {
        slug: 'migrare-thinkific-wordpress-partea-1-planificare-pregatire-date',
        views: 4,
        likes: 0,
        loves: 0,
        awards: 0,
        wows: 0
      },
      { slug: 'migrare-thinkific-wordpress-partea-1-planificarea', views: 1, likes: 0, loves: 0, awards: 0, wows: 0 },
      {
        slug: 'migrare-thinkific-wordpress-partea-2-import-utilizatori',
        views: 1,
        likes: 0,
        loves: 0,
        awards: 0,
        wows: 0
      },
      { slug: 'migrare-thinkific-wordpress-partea-3-import-progres', views: 3, likes: 0, loves: 0, awards: 0, wows: 0 },
      {
        slug: 'migrare-thinkific-wordpress-partea-4-import-recenzii',
        views: 1,
        likes: 0,
        loves: 0,
        awards: 0,
        wows: 0
      },
      {
        slug: 'migrare-thinkific-wordpress-partea-5-adaptari-concluzii',
        views: 1,
        likes: 0,
        loves: 0,
        awards: 0,
        wows: 0
      },
      { slug: 'migrare-thinkific-wordpress-partea-5-alte-adaptari', views: 1, likes: 0, loves: 0, awards: 0, wows: 0 },
      {
        slug: 'migrate-thinkific-wordpress-part-1-planning-data-preparation',
        views: 7,
        likes: 0,
        loves: 0,
        awards: 0,
        wows: 0
      },
      { slug: 'migrate-thinkific-wordpress-part-2-users-import', views: 9, likes: 0, loves: 0, awards: 0, wows: 0 },
      { slug: 'migrate-thinkific-wordpress-part-3-progress-import', views: 5, likes: 0, loves: 0, awards: 0, wows: 0 },
      { slug: 'migrate-thinkific-wordpress-part-4-reviews-import', views: 5, likes: 0, loves: 0, awards: 0, wows: 0 },
      {
        slug: 'migrate-thinkific-wordpress-part-5-adaptations-conclusions',
        views: 6,
        likes: 0,
        loves: 0,
        awards: 0,
        wows: 0
      },
      { slug: 'site-prezentare-strangere-fonduri-booktruck', views: 18, likes: 0, loves: 0, awards: 0, wows: 0 },
      { slug: 'wordpress-plugin-woocommerce-custom-paintings', views: 103, likes: 2, loves: 0, awards: 0, wows: 0 }
    ]
  });
};

const seedSessions = async () => {
  console.info('🏁 seedSessions started...');

  console.info('📭 Deleting all the sessions...');
  await prisma.session.deleteMany();

  console.info('➕ Creating the new sessions...');
  await prisma.session.createMany({
    data: [
      {
        id: 'euplatesc-nodejs_0c93c2fc3a457e32cc935eeb8422536c',
        createdAt: new Date('2024-02-04 16:44:29.644'),
        updatedAt: new Date('2024-02-04 16:44:29.644'),
        awards: false,
        likes: true,
        loves: false,
        wows: false
      },
      {
        id: 'euplatesc-nodejs_2727d8a0901ee77c4418bc783db38562',
        createdAt: new Date('2023-05-30 10:34:58.113'),
        updatedAt: new Date('2023-05-30 10:34:58.113'),
        awards: false,
        likes: true,
        loves: false,
        wows: false
      },
      {
        id: 'euplatesc-nodejs_5183b8561987450969d319ae3b702719',
        createdAt: new Date('2022-10-21 13:13:32.290'),
        updatedAt: new Date('2022-10-21 13:15:27.844'),
        awards: false,
        likes: true,
        loves: false,
        wows: true
      },
      {
        id: 'euplatesc-nodejs_66af2cc81f8afb177b560c1f458641fe',
        createdAt: new Date('2023-07-21 14:40:18.516'),
        updatedAt: new Date('2023-07-21 14:40:42.794'),
        awards: true,
        likes: true,
        loves: true,
        wows: true
      },
      {
        id: 'euplatesc-nodejs_8f6df8df80ee4038213a17caa570ce73',
        createdAt: new Date('2022-10-18 07:43:53.476'),
        updatedAt: new Date('2022-10-18 07:43:53.476'),
        awards: false,
        likes: true,
        loves: false,
        wows: false
      },
      {
        id: 'euplatesc-nodejs_9836362a28f855901210f765eac8a287',
        createdAt: new Date('2023-11-12 17:48:45.881'),
        updatedAt: new Date('2023-11-12 17:48:45.881'),
        awards: false,
        likes: false,
        loves: false,
        wows: true
      },
      {
        id: 'euplatesc-nodejs_a96cd10602ec7c64d96b63368e17ec4f',
        createdAt: new Date('2023-03-17 10:09:48.428'),
        updatedAt: new Date('2023-03-17 10:09:48.428'),
        awards: false,
        likes: true,
        loves: false,
        wows: false
      },
      {
        id: 'euplatesc-nodejs_c24108bd869dc9049f632c0d47a04742',
        createdAt: new Date('2022-10-27 13:49:24.724'),
        updatedAt: new Date('2022-10-27 13:58:15.513'),
        awards: true,
        likes: true,
        loves: true,
        wows: true
      },
      {
        id: 'euplatesc-nodejs_ce90a4e41d109bc8a9a024080266d516',
        createdAt: new Date('2023-08-31 17:33:33.730'),
        updatedAt: new Date('2023-08-31 17:33:33.730'),
        awards: false,
        likes: true,
        loves: false,
        wows: false
      },
      {
        id: 'euplatesc-nodejs_d5bb4fc0b4d0cf797ac35bc57ef6b317',
        createdAt: new Date('2023-09-26 05:37:25.384'),
        updatedAt: new Date('2023-09-26 05:37:25.384'),
        awards: false,
        likes: true,
        loves: false,
        wows: false
      },
      {
        id: 'euplatesc-nodejs_fad57bc9db868d2c326c2955f79a7149',
        createdAt: new Date('2022-10-17 14:45:02.640'),
        updatedAt: new Date('2022-10-17 14:45:02.640'),
        awards: false,
        likes: true,
        loves: false,
        wows: false
      },
      {
        id: 'wordpress-plugin-woocommerce-custom-paintings_8c28ef5f7baaa986751511fd4a23f1df',
        createdAt: new Date('2022-09-09 18:41:29.958'),
        updatedAt: new Date('2022-09-09 18:41:29.958'),
        awards: false,
        likes: true,
        loves: false,
        wows: false
      },
      {
        id: 'wordpress-plugin-woocommerce-custom-paintings_c24108bd869dc9049f632c0d47a04742',
        createdAt: new Date('2022-10-27 13:58:40.603'),
        updatedAt: new Date('2022-10-27 13:58:40.603'),
        awards: false,
        likes: true,
        loves: false,
        wows: false
      }
    ]
  });
};

async function main() {
  await seedBoardgames();
  await seedBooks();
  await seedLocations();
  await seedCounters();
  await seedSessions();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();
    process.exit(1);
  });
