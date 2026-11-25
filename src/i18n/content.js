// All copy for the invitation, in English and Marathi.
// Source: the family's printed invitation cards (see /reference).
// Dress-code suggestions and the RSVP WhatsApp number are placeholders to confirm.

export const LANGS = ['en', 'mr'];

export const WEDDING_START = '2026-11-29T18:30:00+05:30';

/** Put the family's WhatsApp number here (with country code) to receive RSVPs directly. */
export const RSVP_WHATSAPP = '';

/** Drop an mp3 at public/audio/music.mp3 and a play/pause button appears automatically. */
export const MUSIC_SRC = '/audio/music.mp3';

export const VENUE = {
  mapsQuery: 'Vitthal Mangalam Lawns, Varye, Satara, Maharashtra',
  calendarLocation: 'Vitthal Mangalam Lawns, Old Satara–Pune Highway, Limbkhind, Varye, Satara',
};

export const EVENTS = [
  { id: 'engagement', icon: 'ring', start: '2026-11-28T10:00:00+05:30', hours: 2 },
  { id: 'haldi', icon: 'haldi', start: '2026-11-28T16:00:00+05:30', hours: 2 },
  { id: 'sangeet', icon: 'music', start: '2026-11-28T19:00:00+05:30', hours: 3 },
  { id: 'vidhi', icon: 'kalash', start: '2026-11-29T09:30:00+05:30', hours: 3 },
  { id: 'varmala', icon: 'garland', start: '2026-11-29T18:30:00+05:30', hours: 3, highlight: true },
];

export const DRESS_CODES = [
  { id: 'engagement', palette: ['#F2C4C4', '#CFE5D6', '#F1E3B4', '#D9C8E6'] },
  { id: 'haldi', palette: ['#F5C518', '#F28C28', '#FFF6DF', '#86A93F'] },
  { id: 'sangeet', palette: ['#0F6B4F', '#2A4594', '#B0246A', '#C9A227'] },
  { id: 'wedding', palette: ['#7E1A2B', '#136F63', '#C9962F', '#F6EEDB'] },
];

export const STORY_PHOTOS = [
  { src: '/img/couple.jpg', key: 'couple' },
  { src: '/img/card-marathi.jpg', key: 'cardMr' },
  { src: '/img/card-english.jpg', key: 'cardEn' },
];

export const content = {
  en: {
    langName: 'English',
    envelope: {
      tap: 'Tap to open',
      seal: 'Open the invitation',
      langHint: 'Choose language',
    },
    hero: {
      blessing: '|| Shri Ganeshaya Namah ||',
      eyebrow: 'The wedding of',
      groom: 'Rugved',
      weds: 'weds',
      bride: 'Gayatri',
      scroll: 'Scroll down',
      mandapAlt: 'Illustrated wedding mandap with marigold garlands and a sacred fire',
    },
    story: {
      title: ['Two souls', 'one destiny'],
      sub: 'A bond blessed for seven lifetimes',
      greeting: 'Dear Friends and Family',
      body: 'With the blessings of Lord Ganesha and our elders, we invite you to share in the joy as our children begin their forever.',
      groom: {
        name: 'Dr. Rugved',
        degree: 'MBBS, MD Paediatrics',
        family: 'Grandson of Late Shri Ramesh Tatyaso Uttekar (Bapu); eldest son of Dr. Sau. Neela & Shri Ranjeet Ramesh Uttekar, Gorakhpur (Pirwadi), Satara',
      },
      bride: {
        name: 'Dr. Gayatri',
        degree: 'MBBS · Founder, Rudira Setu Global (OPC) Pvt. Ltd.',
        family: 'Daughter of Sau. Priya & Shri Pandurang Narayan Dalvi, Krishnanagar, Khed, Satara',
      },
      and: '&',
    },
    saveDate: {
      eyebrow: 'Mark your calendar',
      title: 'Save the date',
      swipe: 'Swipe to reveal',
      reveal: 'Reveal the date',
      day: '29',
      month: 'Nov',
      year: '2026',
      weekday: 'Sunday',
      time: 'Half past six in the evening',
      calendar: 'Add to calendar',
      units: ['Days', 'Hrs', 'Min', 'Sec'],
    },
    celebrations: {
      eyebrow: 'You are invited to our',
      title: 'Celebrations',
      scratch: 'Scratch to reveal',
      revealBtn: 'Reveal',
      venueLabel: 'Venue',
      venue: 'Vitthal Mangalam Lawns',
      venueSub: 'Limbkhind, Varye, Satara',
      directions: 'Get directions',
      muhurt: 'Shubh Muhurt',
      items: {
        engagement: { name: 'Engagement', when: 'Saturday, 28 Nov · 10:00 AM' },
        haldi: { name: 'Haldi Ceremony', when: 'Saturday, 28 Nov · 4:00 PM' },
        sangeet: { name: 'Sangeet Night', when: 'Saturday, 28 Nov · 7:00 PM' },
        vidhi: { name: 'Vivah Vidhi', when: 'Sunday, 29 Nov · 9:30 AM' },
        varmala: { name: 'Varmala', when: 'Sunday, 29 Nov · 6:30 PM' },
      },
    },
    dress: {
      eyebrow: 'What to wear',
      title: 'Dress code',
      swipe: 'Swipe to explore',
      women: 'Women',
      men: 'Men',
      prev: 'Previous look',
      next: 'Next look',
      items: {
        engagement: { name: 'Engagement', women: 'Soft pastels — sarees or anarkalis', men: 'Pastel kurta or bandhgala' },
        haldi: { name: 'Haldi', women: 'Sunshine yellows — light sarees or sharara sets', men: 'Yellow kurta with white pyjama' },
        sangeet: { name: 'Sangeet', women: 'Jewel tones with sparkle — lehengas or indo-western', men: 'Nehru jacket or festive sherwani' },
        wedding: { name: 'Wedding Day', women: 'Paithani or nauvari saree', men: 'Kurta with a pheta' },
      },
    },
    rsvp: {
      eyebrow: 'Kindly reply',
      title: 'RSVP',
      sub: 'Please let us know by 26 November',
      name: 'Your name',
      namePh: 'Full name',
      accept: 'Joyfully accept',
      decline: 'Regretfully decline',
      guests: 'Number of guests',
      fewer: 'Fewer guests',
      more: 'More guests',
      send: 'Send reply on WhatsApp',
      errors: { required: 'Please enter your name', tooLong: 'Please use a shorter name', attending: 'Please choose an option' },
      thanks: 'Thank you! Your reply is ready in WhatsApp.',
      again: 'Edit reply',
    },
    photos: {
      eyebrow: 'Our story',
      title: 'Moments to treasure',
      hint: 'Swipe left or right to turn the photo',
      next: 'Next photo',
      alts: {
        couple: 'Illustration of the groom in a pheta and the bride in a Paithani saree',
        cardMr: 'Marathi invitation card with Lord Ganesha and temple bells',
        cardEn: 'English invitation card with lotus flowers and a decorated elephant',
      },
    },
    venue: {
      eyebrow: 'Vivah Sthal',
      title: 'Venue',
      name: 'Vitthal Mangalam Lawns',
      address: ['Old Satara–Pune Highway', 'Limbkhind, Varye, Satara'],
      directions: 'Get Directions',
      calendar: 'Add to Calendar',
      mapTitle: 'Map showing Vitthal Mangalam Lawns, Varye, Satara',
    },
    footer: {
      presence: 'Your presence and prayers will make our celebration truly special.',
      inviter: 'With warm regards',
      family: 'The Uttekar Family',
    },
    music: { play: 'Play music', pause: 'Pause music' },
  },

  mr: {
    langName: 'मराठी',
    envelope: {
      tap: 'उघडण्यासाठी टॅप करा',
      seal: 'निमंत्रण उघडा',
      langHint: 'भाषा निवडा',
    },
    hero: {
      blessing: '|| श्री गणेशाय नमः ||',
      eyebrow: 'शुभविवाह',
      groom: 'ऋग्वेद',
      weds: 'आणि',
      bride: 'गायत्री',
      scroll: 'पुढे पहा',
      mandapAlt: 'झेंडूच्या माळा व होमकुंड असलेला विवाह मंडप',
    },
    story: {
      title: ['दोन जीव', 'एक नियती'],
      sub: 'सात जन्मांचे पवित्र बंधन',
      greeting: 'सस्नेह नमस्कार',
      body: 'श्री गणेशाच्या कृपेने व वडीलधाऱ्यांच्या आशीर्वादाने आमच्या मुलांच्या शुभ मंगल विवाहासाठी आपणांस आग्रहाचे निमंत्रण.',
      groom: {
        name: 'चि. डॉ. ऋग्वेद',
        degree: 'MBBS, MD Paediatrics',
        family: 'कै. रमेश तात्यासो उत्तेकर (बापू) यांचे नातू व डॉ. सौ. नीला व श्री. रणजित रमेश उत्तेकर, रा. गोरखपूर (पिरवाडी), सातारा यांचे ज्येष्ठ सुपुत्र',
      },
      bride: {
        name: 'चि. सौ. कां. डॉ. गायत्री',
        degree: 'MBBS, Founder, Rudira Setu Global (OPC) Pvt. Ltd.',
        family: 'सौ. प्रिया व श्री. पांडुरंग नारायण दळवी, रा. कृष्णानगर, खेड, सातारा यांची सुकन्या',
      },
      and: 'व',
    },
    saveDate: {
      eyebrow: 'दिनांक लक्षात ठेवा',
      title: 'विवाह मुहूर्त',
      swipe: 'उघडण्यासाठी सरकवा',
      reveal: 'तारीख पहा',
      day: '२९',
      month: 'नोव्हेंबर',
      year: '२०२६',
      weekday: 'रविवार',
      time: 'सायं. ०६ वा. ३० मि.',
      calendar: 'कॅलेंडरमध्ये जोडा',
      units: ['दिवस', 'तास', 'मिनिटे', 'सेकंद'],
    },
    celebrations: {
      eyebrow: 'आपणांस सस्नेह निमंत्रण',
      title: 'मंगल कार्यक्रम',
      scratch: 'घासून पहा',
      revealBtn: 'पहा',
      venueLabel: 'स्थळ',
      venue: 'विठ्ठल मंगलम् लॉन्स',
      venueSub: 'लिंबखिंड, वर्ये, सातारा',
      directions: 'मार्ग पहा',
      muhurt: 'शुभ मुहूर्त',
      items: {
        engagement: { name: 'साखरपुडा', when: 'शनिवार, २८ नोव्हें. · सकाळी १०:००' },
        haldi: { name: 'हळद', when: 'शनिवार, २८ नोव्हें. · दुपारी ४:००' },
        sangeet: { name: 'संगीत', when: 'शनिवार, २८ नोव्हें. · सायं. ७:००' },
        vidhi: { name: 'विवाह विधी', when: 'रविवार, २९ नोव्हें. · सकाळी ९:३०' },
        varmala: { name: 'वरमाला', when: 'रविवार, २९ नोव्हें. · सायं. ६:३०' },
      },
    },
    dress: {
      eyebrow: 'पेहराव',
      title: 'ड्रेस कोड',
      swipe: 'पाहण्यासाठी सरकवा',
      women: 'महिला',
      men: 'पुरुष',
      prev: 'मागील',
      next: 'पुढील',
      items: {
        engagement: { name: 'साखरपुडा', women: 'हलके पेस्टल रंग — साडी किंवा अनारकली', men: 'पेस्टल कुर्ता किंवा बंदगळा' },
        haldi: { name: 'हळद', women: 'पिवळे रंग — हलकी साडी किंवा शरारा', men: 'पिवळा कुर्ता व पांढरा पायजमा' },
        sangeet: { name: 'संगीत', women: 'गडद, झगमगते रंग — लेहेंगा किंवा इंडो-वेस्टर्न', men: 'नेहरू जॅकेट किंवा शेरवानी' },
        wedding: { name: 'विवाह दिवस', women: 'पैठणी किंवा नऊवारी साडी', men: 'कुर्ता व फेटा' },
      },
    },
    rsvp: {
      eyebrow: 'कृपया कळवा',
      title: 'उपस्थिती',
      sub: '२६ नोव्हेंबरपर्यंत कळवावे',
      name: 'आपले नाव',
      namePh: 'पूर्ण नाव',
      accept: 'आनंदाने येत आहे',
      decline: 'येऊ शकत नाही',
      guests: 'पाहुण्यांची संख्या',
      fewer: 'कमी',
      more: 'जास्त',
      send: 'WhatsApp वर कळवा',
      errors: { required: 'कृपया आपले नाव लिहा', tooLong: 'कृपया लहान नाव लिहा', attending: 'कृपया एक पर्याय निवडा' },
      thanks: 'धन्यवाद! आपला संदेश WhatsApp मध्ये तयार आहे.',
      again: 'पुन्हा बदला',
    },
    photos: {
      eyebrow: 'आमच्या आठवणी',
      title: 'अनमोल क्षण',
      hint: 'फोटो बदलण्यासाठी डावीकडे किंवा उजवीकडे सरकवा',
      next: 'पुढील फोटो',
      alts: {
        couple: 'फेटा घातलेला वर आणि पैठणी नेसलेली वधू यांचे चित्र',
        cardMr: 'श्री गणेश व घंटांसह मराठी निमंत्रण पत्रिका',
        cardEn: 'कमळ व सजवलेल्या हत्तीसह इंग्रजी निमंत्रण पत्रिका',
      },
    },
    venue: {
      eyebrow: 'विवाह स्थळ',
      title: 'स्थळ',
      name: 'विठ्ठल मंगलम् लॉन्स',
      address: ['जुना सातारा–पुणे महामार्ग', 'लिंबखिंड, वर्ये, सातारा'],
      directions: 'मार्ग पहा',
      calendar: 'कॅलेंडरमध्ये जोडा',
      mapTitle: 'विठ्ठल मंगलम् लॉन्स, वर्ये, सातारा — नकाशा',
    },
    footer: {
      presence: 'आपली उपस्थिती व शुभाशीर्वाद हेच आमच्यासाठी मोलाचे आहेत.',
      inviter: 'निमंत्रक',
      family: 'उत्तेकर परिवार',
    },
    music: { play: 'संगीत सुरू करा', pause: 'संगीत थांबवा' },
  },
};
