const lecturerData = [
  {
    editionNumber: 1,
    dateTime: {
      date: "2020-04-29",
      time: "22:00:00+02:00"
    },
    name: "Marco Land",
    slug: "marco-land",
    meetingRoomLink: "",
    imageSrc: "",
    // Image source not provided
    captionText: {
      en: "",
      // English caption not provided
      de: "Marco Land spricht über das Projekt: clubquarantaene.stream"
    },
    shortBio: {
      en: {
        text: "",
        // English bio not provided
        link: "http://www.marco.land"
      },
      de: {
        text: "",
        // German bio not provided
        link: "http://www.marco.land"
      }
    }
  },
  {
    editionNumber: 2,
    dateTime: {
      date: "2020-05-13",
      time: "22:00:00+02:00"
    },
    name: "Jutta Bauer",
    slug: "jutta-bauer",
    meetingRoomLink: "https://meet.jit.si/Jitsi-Bitsi-Spider",
    imageSrc: "img/jutta-bauer/jutta-bauer-01.png",
    captionText: {
      en: "talks about her books and her project „corona diary“",
      de: "spricht über ihre Bücher und ihr Projekt „corona diary“"
    },
    shortBio: {
      en: {
        text: "Ich bin Jutta Bauer und werde meine Arbeit als Illustratorin und Autorin vorstellen. Ich kann etwas zu meiner Entwicklung sagen und was mir wichtig ist, sowie einige Bücher zeigen und erzählen, wie die Geschichten und die Bilder entstanden sind. Mit was ich mich im Moment beschäftige könnte vielleicht auch interessant sein. Am Ende würde ich gern Raum lassen für Gespräch und Fragen.",
        link: ""
        // Link not provided
      },
      de: {
        text: "Ich bin Jutta Bauer und werde meine Arbeit als Illustratorin und Autorin vorstellen. Ich kann etwas zu meiner Entwicklung sagen und was mir wichtig ist, sowie einige Bücher zeigen und erzählen, wie die Geschichten und die Bilder entstanden sind. Mit was ich mich im Moment beschäftige könnte vielleicht auch interessant sein. Am Ende würde ich gern Raum lassen für Gespräch und Fragen.",
        link: ""
        // Link not provided
      }
    }
  },
  {
    editionNumber: 3,
    dateTime: {
      date: "2020-06-03",
      time: "22:00:00+02:00"
    },
    name: "Nontsikelelo Mutiti",
    slug: "nontsikelelo-mutiti",
    meetingRoomLink: "https://meet.jit.si/Jitsi-Bitsi-Spider",
    imageSrc: "img/nontsikelelo-mutiti/NM_Headshot2-1.jpg",
    captionText: {
      en: "Graphic designer and educator Nontsikelelo Mutiti will talk about her work and how to interrogate the euro-centric design canon.",
      de: "Grafikdesignerin und Pädagogin Nontsikelelo Mutiti spricht über ihre Arbeit und wie man den eurozentrischen Designkanon hinterfragt."
    },
    shortBio: {
      en: {
        text: "Nontsikelelo Mutiti is a graphic designer and educator...",
        link: "https://eyeondesign.aiga.org/nontsikelelo-mutiti-on-the-specificity-of-locality-in-graphic-design/amp/"
      },
      de: {
        text: "",
        // German bio not provided
        link: "https://eyeondesign.aiga.org/nontsikelelo-mutiti-on-the-specificity-of-locality-in-graphic-design/amp/"
      }
    }
  },
  {
    editionNumber: 4,
    dateTime: {
      date: "2020-06-17",
      time: "22:00:00+02:00"
    },
    name: "Studio Moniker",
    slug: "studio-moniker",
    meetingRoomLink: "https://meet.jit.si/Jitsi-Bitsi-Spider",
    imageSrc: "img/moniker/moniker-02.png",
    captionText: {
      en: "Design collective Moniker will talk about their practise in general, and participatory film-making in particular.",
      de: "Das Design-Kollektiv Moniker wird über seine Arbeitsweise im Allgemeinen und kollaboratives Filmemachen im Speziellen sprechen."
    },
    shortBio: {
      en: {
        text: "With Moniker, which means nickname or pseudonym, we work on commissioned design projects while also investing in projects of an autonomous and experimental nature...",
        link: "https://studiomoniker.com/"
      },
      de: {
        text: "",
        // German bio not provided
        link: "https://studiomoniker.com/"
      }
    }
  },
  {
    editionNumber: 5,
    dateTime: {
      date: "2020-07-01",
      time: "22:00:00+02:00"
    },
    name: "Stefan Marx",
    slug: "stefan-marx",
    meetingRoomLink: "https://meet.jit.si/Jitsi-Bitsi-Spider",
    imageSrc: "",
    // Image source not provided
    captionText: {
      en: "... talks about his drawing work, his publications and cooperations.",
      de: "... spricht über seine zeichnerische Arbeit, seine Publikationen und Kooperationen."
    },
    shortBio: {
      en: {
        text: "",
        // Bio text not provided
        link: "https://www.s-marx.de/"
      },
      de: {
        text: "",
        // German bio not provided
        link: "https://www.s-marx.de/"
      }
    }
  },
  {
    editionNumber: 6,
    dateTime: {
      date: "2020-10-28",
      time: "22:00:00+02:00"
    },
    name: "Prem Krishnamurthy",
    slug: "prem-krishnamurthy",
    meetingRoomLink: "https://www.crowdcast.io/e/lecture-06--prem",
    imageSrc: "",
    // Image source not provided
    captionText: {
      en: "... talks about his work, publications and cooperations.",
      de: "... spricht über seine Arbeit, Publikationen und Kooperationen."
    },
    shortBio: {
      en: {
        text: "Partner and Director, Wkshps\nArtistic Director, FRONT International 2022\nOrganizer, Commune",
        link: [
          "http://wkshps.com/",
          "http://2022.frontart.org/",
          "https://docs.google.com/document/d/1Ri6_qgc7PfdeomBSOS1ElIHe09V8RoF9Cv7hMZZh_oM/edit"
        ]
      },
      de: {
        text: "Partner and Director, Wkshps\nArtistic Director, FRONT International 2022\nOrganizer, Commune",
        link: [
          "http://wkshps.com/",
          "http://2022.frontart.org/",
          "https://docs.google.com/document/d/1Ri6_qgc7PfdeomBSOS1ElIHe09V8RoF9Cv7hMZZh_oM/edit"
        ]
      }
    }
  },
  {
    editionNumber: 7,
    dateTime: {
      date: "2020-11-11",
      time: "20:00:00+02:00"
    },
    name: "Lukas Feireiss",
    slug: "lukas-feireiss",
    meetingRoomLink: "https://www.crowdcast.io/e/lecture-07--lukas",
    imageSrc: "",
    // Image source not provided
    captionText: {
      en: "Lukas Feireiss (editor, curator, artist, author) talks about curation & design, as well as cut-up as principle of design and life.",
      de: "Lukas Feireiss (Herausgeber, Kurator, Künstler, Autor) spricht über Kuration & Gestaltung, sowie cut-up als Gestaltungs- und Lebensprinzip."
    },
    shortBio: {
      en: {
        text: "",
        // English bio not provided
        link: "https://www.studiolukasfeireiss.com/"
      },
      de: {
        text: "",
        // German bio not provided
        link: "https://www.studiolukasfeireiss.com/"
      }
    }
  },
  {
    editionNumber: 8,
    dateTime: {
      date: "",
      time: ""
    },
    name: "Jan Middendorp",
    slug: "jan-middendorp",
    meetingRoomLink: "",
    imageSrc: "",
    captionText: {
      en: "",
      de: ""
    },
    shortBio: {
      en: {
        text: "",
        link: ""
      },
      de: {
        text: "",
        link: ""
      }
    }
  },
  {
    editionNumber: 9,
    dateTime: {
      date: "2020-12-09",
      time: "20:00:00+02:00"
    },
    name: "Stephanie Wunderlich",
    slug: "stephanie-wunderlich",
    meetingRoomLink: "https://www.crowdcast.io/e/lecture-09--stefanie",
    imageSrc: "",
    // Image source not provided
    captionText: {
      en: "Stephanie Wunderlich, draftswoman, illustrator and lecturer will introduce her work and her working processes in more detail.  She tells us briefly about her career and reports on her work as part of the Spring collective. (The lecture will be held in german)",
      de: "Stephanie Wunderlich, Zeichnerin, Illustratorin und Dozentin stellt ihre Arbeit und ihre Arbeitsprozesse näher vor.  Erzählt uns kurz von ihrem  Werdegang und berichtet von ihrer Arbeit als Teil des Kollektivs Spring."
    },
    shortBio: {
      en: {
        text: "",
        // English bio not provided
        link: "https://www.wunderlich-illustration.de/"
      },
      de: {
        text: "",
        // German bio not provided
        link: "https://www.wunderlich-illustration.de/"
      }
    }
  },
  {
    editionNumber: 10,
    dateTime: {
      date: "",
      time: ""
    },
    name: "Franziska Morlok",
    slug: "franziska-morlok",
    meetingRoomLink: "",
    imageSrc: "",
    captionText: {
      en: "",
      de: ""
    },
    shortBio: {
      en: {
        text: "",
        link: ""
      },
      de: {
        text: "",
        link: ""
      }
    }
  },
  {
    editionNumber: 11,
    dateTime: {
      date: "2021-04-21",
      time: "20:00:00+02:00"
    },
    name: "Emily Smith",
    slug: "emily-smith",
    meetingRoomLink: "https://www.crowdcast.io/e/jitsi-bitsi-spider-11",
    imageSrc: "",
    // Image source not provided
    captionText: {
      en: "Berlin-based designer and educator Emily Smith will speak about expanded possibilities for contemporary design practice. Drawing from her own work and the work of others, she will present possible methods and processes from ethnographic, choreographic, and participatory creative fields. How can design push outside of its comfort zone? What can the designer learn from adjacent disciplines? What are the practical, political, and poetic insights these questions might offer?",
      de: ""
      // German caption not provided
    },
    shortBio: {
      en: {
        text: "",
        // English bio not provided
        link: "https://vimeo.com/422377009"
      },
      de: {
        text: "",
        // German bio not provided
        link: ""
        // German link not provided
      }
    }
  },
  {
    editionNumber: 12,
    dateTime: {
      date: "",
      time: ""
    },
    name: "Michael Spranger",
    slug: "michael-spranger",
    meetingRoomLink: "",
    imageSrc: "",
    captionText: {
      en: "",
      de: ""
    },
    shortBio: {
      en: {
        text: "",
        link: ""
      },
      de: {
        text: "",
        link: ""
      }
    }
  },
  {
    editionNumber: 13,
    dateTime: {
      date: "2021-06-02",
      time: "20:00:00+02:00"
    },
    name: "J. Wenzel & W. Schwärzler",
    slug: "jan-wenzel-and-wolfgang-schwaerzler",
    meetingRoomLink: "https://www.crowdcast.io/e/jitsi-bitsi-spider-13",
    imageSrc: "",
    // Image source not provided
    captionText: {
      en: 'Jan Wenzel and Wolfgang Schwärzler present their extensive publication "Das Jahr 1990 freilegen“, published in 2020, which outlines and documents the last days of the GDR, a declining state.',
      de: 'Jan Wenzel und Wolfgang Schwärzler stellen ihr umfangreiches, 2020 erschienenes Werk "Das Jahr 1990 freilegen“ vor, in dem die letzten Tage der DDR, eines untergehenden Staates, skizziert und dokumentiert werden.'
    },
    shortBio: {
      en: {
        text: "Jan Wenzel is a publisher, author and artist living in Leipzig. Together with Markus Dreßen and Anne König he founded the publishing house Spector Books in 2001, which received the Saxon Publishing Prize in 2018 and the Deutsche Verlagspreis in 2019. Wolfgang Schwärzler is a graphic and type designer based in Leipzig, Germany. He received his master at the Burg Giebichenstein University of Arts and Design in 2011. He held lectures and has been teaching at various design schools. In 2016, he cofounded Camelot Typefaces with Maurice Göldner and Katharina Köhler.",
        link: ""
      },
      de: {
        text: "Jan Wenzel lebt als Verleger, Autor und Künstler in Leipzig. Zusammen mit Markus Dreßen und Anne König hat er 2001 den Verlag Spector Books gegründet, der 2018 den Sächsischen Verlagspreis und 2019 den Deutschen Verlagspreis erhielt. Wolfgang Schwärzler ist ein Grafik- und Schriftdesigner aus Leipzig, Deutschland. Er erhielt seinen Master an der Burg Giebichenstein Hochschule für Kunst und Design im Jahr 2011, seit dem war er an verschieden Design Hochschulen in der Lehre tätig. 2016 gründete er zusammen mit Maurice Göldner und Katharina Köhler Camelot Typefaces.",
        link: ""
        // German link not provided
      }
    }
  }
];
export {
  lecturerData as l
};
