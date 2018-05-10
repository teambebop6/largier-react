import i18next from 'i18next';
import { reactI18nextModule } from 'react-i18next';


i18next
  .use(reactI18nextModule)
  .init(
    {
      interpolation: {
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
            'show-all-concerts': 'Show all concerts',
            'upcoming-concerts': 'Upcoming concerts',
            'past-concerts': 'Past concerts',
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
            'show-all-concerts': 'Alle Konzerte anzeigen',
            'upcoming-concerts': 'Kommende Konzerte',
            'past-concerts': 'Vergangene Konzerte',
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
