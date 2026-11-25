// All copy for the invitation, in English and Marathi.
// Source: the family's printed invitation cards (see /reference).

export const LANGS = ['en', 'mr'];

export const WEDDING_START = '2026-11-29T18:30:00+05:30';

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

export const content = {
  en: {
    langName: 'English',
    switchTo: 'मराठी',
    gate: {
      blessing: '|| Shri Ganeshaya Namah ||',
      invited: 'You are cordially invited',
      to: 'to the wedding of',
      names: ['Rugved', 'Gayatri'],
      open: 'Open Invitation',
      openMr: 'मराठीत उघडा',
    },
    hero: {
      blessing: '|| श्री गणेशाय नमः ||',
      eyebrow: 'With the blessings of the Almighty and our elders',
      line: 'We are delighted to invite you to the wedding ceremony of',
      groom: 'Rugved',
      bride: 'Gayatri',
      date: 'Sunday · 29 November 2026',
      place: 'Varye, Satara',
      scroll: 'Scroll',
    },
    couple: {
      eyebrow: 'Two families, one celebration',
      title: 'We joyfully announce the wedding of our children',
      artAlt: 'Illustration of the groom in a pheta and the bride in a Paithani saree',
      groom: {
        prefix: 'Chi. Dr.',
        name: 'Rugved',
        role: 'Groom',
        degree: 'MBBS, MD Paediatrics',
        family: [
          'Grandson of Late Shri Ramesh Tatyaso Uttekar (Bapu)',
          'Eldest son of Dr. Sau. Neela & Shri Ranjeet Ramesh Uttekar',
          'Gorakhpur (Pirwadi), Satara',
        ],
      },
      bride: {
        prefix: 'Chi. Sau. Kan. Dr.',
        name: 'Gayatri',
        role: 'Bride',
        degree: 'MBBS · Founder, Rudira Setu Global (OPC) Pvt. Ltd.',
        family: [
          'Beloved daughter of Sau. Priya & Shri Pandurang Narayan Dalvi',
          'Krishnanagar, Khed, Satara',
        ],
      },
    },
    countdown: {
      eyebrow: 'Shubh Muhurt',
      title: 'Counting down to forever',
      when: 'Sunday, 29 November 2026 · 6:30 PM',
      units: ['Days', 'Hours', 'Minutes', 'Seconds'],
      done: 'The auspicious moment is here — thank you for your blessings!',
    },
    events: {
      eyebrow: 'Wedding festivities',
      title: 'Celebrations',
      days: { '2026-11-28': 'Saturday, 28 November', '2026-11-29': 'Sunday, 29 November' },
      muhurt: 'Shubh Muhurt',
      items: {
        engagement: { name: 'Engagement', time: '10:00 AM', note: 'Exchange of rings and blessings' },
        haldi: { name: 'Haldi', time: '4:00 PM', note: 'Turmeric, laughter and yellow everywhere' },
        sangeet: { name: 'Sangeet', time: '7:00 PM', note: 'An evening of music and dance' },
        vidhi: { name: 'Vivah Vidhi', time: '9:30 AM', note: 'Traditional wedding rituals' },
        varmala: { name: 'Varmala', time: '6:30 PM', note: 'Exchange of garlands at the auspicious hour' },
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
    gallery: {
      eyebrow: 'Patrika',
      title: 'Our Invitation Cards',
      hint: 'Tap a card to view it larger',
      cards: [
        { src: '/img/card-marathi.jpg', alt: 'Marathi wedding invitation card with Lord Ganesha, temple bells and the couple' },
        { src: '/img/card-english.jpg', alt: 'English wedding invitation card with lotus flowers and a decorated elephant' },
      ],
      close: 'Close',
    },
    footer: {
      presence: 'Your presence and prayers will make our celebration truly special.',
      inviter: 'With warm regards',
      family: 'The Uttekar Family',
      thanks: 'Your presence would be the greatest gift we could receive!',
    },
  },

  mr: {
    langName: 'मराठी',
    switchTo: 'English',
    gate: {
      blessing: '|| श्री गणेशाय नमः ||',
      invited: 'आपणांस सस्नेह निमंत्रण',
      to: 'शुभविवाह',
      names: ['ऋग्वेद', 'गायत्री'],
      open: 'निमंत्रण उघडा',
      openEn: 'Open in English',
    },
    hero: {
      blessing: '|| श्री गणेशाय नमः ||',
      eyebrow: 'श्री कृपेने व वडीलधाऱ्यांच्या आशीर्वादाने',
      line: 'शुभ मंगल विवाहासाठी आग्रहाचे निमंत्रण',
      groom: 'ऋग्वेद',
      bride: 'गायत्री',
      date: 'रविवार · २९ नोव्हेंबर २०२६',
      place: 'वर्ये, सातारा',
      scroll: 'पुढे पहा',
    },
    couple: {
      eyebrow: 'दोन परिवार, एक आनंदसोहळा',
      title: 'आमच्या मुलांच्या शुभविवाहाचे सप्रेम निमंत्रण',
      artAlt: 'फेटा घातलेला वर आणि पैठणी नेसलेली वधू यांचे चित्र',
      groom: {
        prefix: 'चि. डॉ.',
        name: 'ऋग्वेद',
        role: 'वर',
        degree: 'MBBS, MD Paediatrics',
        family: [
          'कै. रमेश तात्यासो उत्तेकर (बापू) यांचे नातू',
          'व डॉ. सौ. नीला व श्री. रणजित रमेश उत्तेकर',
          'रा. गोरखपूर (पिरवाडी), सातारा यांचे ज्येष्ठ सुपुत्र',
        ],
      },
      bride: {
        prefix: 'चि. सौ. कां. डॉ.',
        name: 'गायत्री',
        role: 'वधू',
        degree: 'MBBS, Founder, Rudira Setu Global (OPC) Pvt. Ltd.',
        family: [
          'सौ. प्रिया व श्री. पांडुरंग नारायण दळवी',
          'रा. कृष्णानगर, खेड, सातारा',
          'यांची सुकन्या',
        ],
      },
    },
    countdown: {
      eyebrow: 'विवाह मुहूर्त',
      title: 'शुभ घटिका समीप आली',
      when: 'रविवार, दि. २९/११/२०२६ रोजी सायं. ०६ वा. ३० मि.',
      units: ['दिवस', 'तास', 'मिनिटे', 'सेकंद'],
      done: 'शुभ मुहूर्त आला — आपल्या शुभाशीर्वादांसाठी मनःपूर्वक धन्यवाद!',
    },
    events: {
      eyebrow: 'विवाह सोहळे',
      title: 'मंगल कार्यक्रम',
      days: { '2026-11-28': 'शनिवार, २८ नोव्हेंबर', '2026-11-29': 'रविवार, २९ नोव्हेंबर' },
      muhurt: 'शुभ मुहूर्त',
      items: {
        engagement: { name: 'साखरपुडा', time: 'सकाळी १०:००', note: 'अंगठी व आशीर्वादांची देवाणघेवाण' },
        haldi: { name: 'हळद', time: 'दुपारी ४:००', note: 'हळदीचा पिवळा रंग आणि हास्याची उधळण' },
        sangeet: { name: 'संगीत', time: 'सायं. ७:००', note: 'गाणी, नृत्य आणि आनंदाची संध्याकाळ' },
        vidhi: { name: 'विवाह विधी', time: 'सकाळी ९:३०', note: 'पारंपरिक वैदिक विधी' },
        varmala: { name: 'वरमाला', time: 'सायं. ६:३०', note: 'शुभ मुहूर्तावर माळा घालणे' },
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
    gallery: {
      eyebrow: 'पत्रिका',
      title: 'आमची निमंत्रण पत्रिका',
      hint: 'मोठी पाहण्यासाठी पत्रिकेवर टॅप करा',
      cards: [
        { src: '/img/card-marathi.jpg', alt: 'श्री गणेश, घंटा व वधू-वरांसह मराठी निमंत्रण पत्रिका' },
        { src: '/img/card-english.jpg', alt: 'कमळ व सजवलेल्या हत्तीसह इंग्रजी निमंत्रण पत्रिका' },
      ],
      close: 'बंद करा',
    },
    footer: {
      presence: 'आपली उपस्थिती व शुभाशीर्वाद हेच आमच्यासाठी मोलाचे आहेत.',
      inviter: 'निमंत्रक',
      family: 'उत्तेकर परिवार',
      thanks: 'आपण अवश्य उपस्थित राहावे, ही आग्रहाची विनंती.',
    },
  },
};
