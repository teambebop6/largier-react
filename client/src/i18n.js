import i18next from 'i18next';
import { reactI18nextModule } from 'react-i18next';

import moment from 'moment';

i18next
  .use(reactI18nextModule)
  .init(
    {
      interpolation: {
        formatSeparator: ',',
        format: (value, formatting) => {
          if (value instanceof Date) return moment(value).format(formatting);
          return value.toString();
        },
        // React already does escaping
        escapeValue: false,
      },
      lng: 'en',
      resources: {
        en: {
          translation: {
            swisspianist: 'Swiss Pianist Chantal Largier',
            intro: ' is a talented, versatile and admired artist, who knows how to impress and fascinate the audience through her interpretation and a real passion for music. Her goal is to find the true spirit of music and to share it with her audience.',
            bio1: 'Chantal grew up in Switzerland and in Japan. She got her first lesson and started to build up her career at the age of six. She won the \'14th Youth Music Harmony Competition\' in Tokyo. In 2014 she moved to China and taught piano classes for piano students at the Zhaoqing University. Until 2017 she gave 100 concerts throughout China.',
            bio2: 'She performed in prestigious Concert Halls such as the <i>Great Hall of People</i> in China, <i>Oriental Art Center</i> in Shanghai, the <i>Shanghai Symphony Hall</i> and the <i>Guotai Arts Center</i> in Chongqing.',
            bio3: 'Chantal Largier was born in Zurich and took at the age of 6 her first piano lesson. At the age of 11 she moved with her family to Tokyo, where she was taught by the concert  pianist Tomoko Uchida. Chantal was prize-winner at the “14th Youth Music Harmony Competition” in Tokyo. In the year 2002 she returned to Switzerland and gained the pianoforte Teaching Diploma at the Music Academy in Basel under László Gymesi and the Master of Arts in Music Performance (specialisation concert) at the Zurich University of the Arts under Eckart Heiligers.',
            bio4: 'From 2014 Chantal had been teaching for 3 years students in piano for the Bachelor degree at the University in Zhaoqing in China. Chantal became an acclaimed pianist in China and performed in 100 concerts as a solo pianist and chamber musician in more than 20 cities in China. Her concert tours brought her to world-famous concert halls such as the Great Hall of the People in Beijing, the Oriental Center in Shanghai and the Shanghai Symphonie Hall. She played several times at the Swiss-Chinese Friendship Day at the invitation of the Swiss ambassador in Beijing.',
            bio5: 'Chantal is the first foreign pianist, who performed in China the “Drama concert”, which combines classical music with a theatrical performance. ',
            bio6: 'From August 2018 Chantal is teaching at the youth music school Pfannenstiel in Meilen in Zurich. ',
            'show-all-concerts': 'Show all concerts',
            'upcoming-concerts': 'Upcoming',
            'past-concerts': 'Past',
            concerts: 'Concerts',
            media: 'Media',
            about: 'About',
            back: 'Back',
          },
        },
        de: {
          translation: {
            swisspianist: 'Die Schweizer Pianistin Chantal Largier',
            intro: ' ist eine ausdrucksstarke, vielseitige und hoch geschätzte Künstlerin, die durch ihre Interpretation und Leidenschaft zur Musik berühren und faszinieren kann. Ihr Ziel ist es, Musik auf verschiedenster Art und Weise zum Ausdruck zu bringen.',
            bio1: 'Chantal, aufgewachsen in der Schweiz und in Japan, erhielt ihren ersten Klavierunterricht mit zarten sechs Jahren und beginnt somit ihre Laufbahn als Pianistin. Sie gewann den in Tokio angesehen Klavierwettbewerb „14th Youth Music Harmony Competition“. Im 2014 zog sie nach China, unterrichtete Klavier-Studierende an der Zhaoqing Universität und konzertierte bis 2017, 100 Konzerte in ganz China.',
            bio2: 'Sie spielte in berühmten und hoch anerkannten Konzerthallen, wie die <i>Grosse Halle des Volkes in Peking</i>, das <i>Oriental Art Center</i> in Shanghai und die <i>Shanghai Symphony Hall</i>, sowie das <i>Guotai Arts Center</i> in Chongqing.',
            bio3: 'Chantal wurde in Zürich geboren und erhielt mit 6 Jahren ihren ersten Klavierunterricht. Mit 11 Jahren zog sie mit ihrer Familie nach Tokio, wo sie von der Konzertpianistin Tomoko Uchida unterrichtet wurde. Sie war Preistägerin der „14. Youth Music Harmony Competition.“',
            bio4: 'Im 2002 zog sie nach Basel und absolvierte an der Musik-Akademie bei László Gyimesi das Lehrdiplom, und an der Zürcher Hochschule der Künste (ZHdK) bei Eckart Heiligers, den Master of Arts in Performance.',
            bio5: 'Ab 2014 unterrichtete sie an der Zhaoqing Universität in China das Fach Klavier für den Bachelor-Lehrgang. Chantal wurde eine gefragte Künstlerin und konzertierte als Solopianistin und Kammermusikerin bis fast zu 100 Male in über 20 Städten Chinas. Ihre Tourneen brachten sie in bekannte Konzerthallen wie die grosse Halle des Volkes, das Oriental Center in Shanghai und die Shanghai Symphonie Hall. Sie spielte auch mehrmals am „Chinese Friendship Day“ für die Schweizer Botschaft.',
            bio6: 'Chantal ist die erste ausländische Pianistin, die ein „Drama-Konzert“, welches klassische Musik mit Schauspiel verbindet, in China auf der Bühne präsentierte.',
            bio7: 'Ab August 2018 übernimmt sie eine Stelle als Lehrkraft für das Fach Klavier an der Jugendmusikschule Pfannenstiel in Meilen in Zürich.',
            'show-all-concerts': 'Alle Konzerte anzeigen',
            'upcoming-concerts': 'Kommende',
            'past-concerts': 'Vergangene',
            concerts: 'Konzerte',
            media: 'Medien',
            about: 'Über mich',
            back: 'Zurück',
          },
        },
      },
    },
    (err) => {
      if (err) {
        return console.error(err);
      }
      return null;
    },
  );

export default i18next;
