
import { Track, Playlist } from './types';

export const COLORS = {
  accent: '#E879F9', // Fuchsia
  secondary: '#22D3EE', // Cyan
  bg: '#050505',
  surface: '#0A0A0B',
  text: '#F4F4F5'
};

export interface ArtistProfile {
  name: string;
  bio: string;
  image: string;
  profileUrl: string;
}

export const MOCK_ARTISTS: ArtistProfile[] = [
  {
    name: 'SZA',
    bio: 'Solána Imani Rowe, known professionally as SZA, is an American R&B singer-songwriter known for her genre-blurring sound and introspective lyrics.',
    image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1200',
    profileUrl: 'https://www.szasolana.com/'
  },
  {
    name: 'Taylor Swift',
    bio: 'One of the most influential singer-songwriters of her generation, Taylor Swift is known for her narrative songwriting and record-breaking global tours.',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80&w=1200',
    profileUrl: 'https://www.taylorswift.com/'
  },
  {
    name: 'Coldplay',
    bio: 'The iconic British rock band formed in London, recognized worldwide for their anthemic sound and spectacular live stadium performances.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200',
    profileUrl: 'https://www.coldplay.com/'
  },
  {
    name: 'Ed Sheeran',
    bio: 'An English singer-songwriter and musician who has sold more than 150 million records worldwide, making him one of the world\'s best-selling music artists.',
    image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&q=80&w=1200',
    profileUrl: 'https://www.edsheeran.com/'
  },
  {
    name: 'The Weeknd',
    bio: 'Abel Makkonen Tesfaye, known as The Weeknd, is a Canadian singer-songwriter and actor known for his sonic versatility and dark lyricism.',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=80&w=1200',
    profileUrl: 'https://www.theweeknd.com/'
  },
  {
    name: 'Dua Lipa',
    bio: 'A British-Albanian singer and songwriter known for her signature mezzo-soprano vocal range and disco-influenced pop sound.',
    image: 'https://images.unsplash.com/photo-1514525253361-bee8718a7439?auto=format&fit=crop&q=80&w=1200',
    profileUrl: 'https://www.dualipa.com/'
  }
];

export const MOCK_TRACKS: Track[] = [
  { 
    id: 'sza-sos', 
    title: 'SOS Tour Global', 
    artist: 'SZA', 
    album: 'SOS', 
    cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1200', 
    duration: '1:45:00', 
    genre: 'R&B / Soul',
    location: 'Rod Laver Arena, Melbourne',
    dateTime: 'Jan 10, 2025 • 8:00 PM',
    fullDescription: 'Experience the raw vulnerability and genre-defying sound of SZA. The SOS Tour is a cinematic journey through the stages of a relationship, featuring nautical themes and incredible vocal performances.',
    organizer: {
      name: 'TDE Promotions',
      avatar: 'https://picsum.photos/seed/tde/100/100',
      bio: 'Top Dawg Entertainment - Home of the most authentic voices.'
    }
  },
  { 
    id: 'taylor-eras', 
    title: 'The Eras Tour', 
    artist: 'Taylor Swift', 
    album: 'Eras', 
    cover: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80&w=1200', 
    duration: '3:30:00', 
    genre: 'Pop / Country',
    location: 'Wembley Stadium, London',
    dateTime: 'Aug 15, 2024 • 7:00 PM',
    fullDescription: 'The biggest tour in history. A 3-hour journey through every musical era of Taylor Swift\'s career, featuring state-of-the-art stage design, dozens of dancers, and surprise acoustic songs.',
    organizer: {
      name: 'Taylor Swift Productions',
      avatar: 'https://picsum.photos/seed/swift/100/100',
      bio: 'Official production for the Eras Tour.'
    }
  },
  { 
    id: 'coldplay-spheres', 
    title: 'Music of the Spheres World Tour', 
    artist: 'Coldplay', 
    album: 'Music of the Spheres', 
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200', 
    duration: '2:45:00', 
    genre: 'Alt Rock / Pop',
    location: 'Estádio do Morumbi, São Paulo',
    dateTime: 'Oct 12, 2024 • 8:00 PM',
    fullDescription: 'Coldplay\'s legendary eco-friendly tour continues. Expect LED wristbands, pyrotechnics, and a setlist that bridges the gap between their indie roots and pop stardom.',
    organizer: {
      name: 'Live Nation Brazil',
      avatar: 'https://picsum.photos/seed/lvn/100/100',
      bio: 'Bringing the world\'s biggest acts to Latin America.'
    }
  },
  { 
    id: 'ed-math', 
    title: 'Mathematics Tour (+-=÷x)', 
    artist: 'Ed Sheeran', 
    album: '=', 
    cover: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&q=80&w=1200', 
    duration: '2:30:00', 
    genre: 'Pop / Acoustic',
    location: 'Suncorp Stadium, Brisbane',
    dateTime: 'Nov 04, 2024 • 7:00 PM',
    fullDescription: 'The singer-songwriter returns with his signature loop pedal and a massive 360-degree rotating stage. An intimate experience in a stadium setting.',
    organizer: {
      name: 'Frontier Touring',
      avatar: 'https://picsum.photos/seed/front/100/100',
      bio: 'Leading Australasian concert promoter.'
    }
  },
  { 
    id: 'weeknd-dawn', 
    title: 'After Hours Til Dawn Tour', 
    artist: 'The Weeknd', 
    album: 'Dawn FM', 
    cover: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=80&w=1200', 
    duration: '2:15:00', 
    genre: 'R&B / Synthpop',
    location: 'Stade de France, Paris',
    dateTime: 'Dec 02, 2024 • 9:00 PM',
    fullDescription: 'A cinematic odyssey through the dark and neon-soaked world of Abel Tesfaye. Featuring a giant moon and dystopian cityscapes.',
    organizer: {
      name: 'Universal Music France',
      avatar: 'https://picsum.photos/seed/univ/100/100',
      bio: 'Global leaders in music-based entertainment.'
    }
  },
  { 
    id: 'dua-optimism', 
    title: 'Radical Optimism Tour', 
    artist: 'Dua Lipa', 
    album: 'Radical Optimism', 
    cover: 'https://images.unsplash.com/photo-1514525253361-bee8718a7439?auto=format&fit=crop&q=80&w=1200', 
    duration: '1:55:00', 
    genre: 'Dance-Pop',
    location: 'The O2 Arena, London',
    dateTime: 'Dec 18, 2024 • 8:30 PM',
    fullDescription: 'Dua Lipa brings her infectious energy and disco-pop hits to London for a residency celebrating her latest era of radical optimism.',
    organizer: {
      name: 'Warner Records',
      avatar: 'https://picsum.photos/seed/warner/100/100',
      bio: 'Cultivating the future of global pop.'
    }
  },
];

export const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: 'p1',
    name: 'SZA: The SOS Experience',
    description: 'The definitive collection for the SOS Tour. From "Kill Bill" to "Snooze".',
    cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800',
    tracks: MOCK_TRACKS.filter(t => t.artist === 'SZA'),
    isFeatured: true
  },
  {
    id: 'p2',
    name: 'Taylor Swift: Eras Live',
    description: 'Relive the magic of the tour of the century. Every era, every hit.',
    cover: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80&w=800',
    tracks: MOCK_TRACKS.filter(t => t.artist === 'Taylor Swift'),
    isFeatured: true
  }
];
