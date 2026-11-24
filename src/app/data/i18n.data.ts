export type Language = 'de' | 'en' | 'tr';

export const CONTENT = {
  de: {
    nav: {
      work: 'Branchen',
      services: 'Leistungen',
      process: 'Ablauf',
      about: 'Über mich',
      cta: 'Projekt anfragen',
      menu: 'Menü öffnen oder schließen',
      skip: 'Zum Inhalt springen',
    },
    hero: {
      eyebrow: 'Webdesign aus Weißenburg in Bayern',
      // `|` starts a new line, `*…*` is the accent (italic, brand blue, never split).
      headline: 'So kann Ihre|neue Website *aussehen.*',
      sub: 'Ich baue hochwertige Websites mit Animationen für Restaurants, Makler, Friseure, Werkstätten und andere Betriebe. Jede Seite entsteht einzeln und zuerst fürs Handy, und den Preis kennen Sie, bevor es losgeht.',
      primary: 'Kostenloses Erstgespräch',
      secondary: 'Branchen-Demos ansehen',
      contactLabel: 'Ihr direkter Ansprechpartner',
      whatsapp: 'WhatsApp',
      facts: [
        { value: 'ab 1.000 €', label: 'Festpreis-Angebot' },
        { value: '2–4 Wochen', label: 'bis zum Start' },
        { value: '< 24 h', label: 'Antwortzeit' },
      ],
    },
    showcase: {
      label: 'Branchen-Demos',
      heading: 'Jede Branche sieht bei mir anders aus.',
      sub: 'Ein Döner-Imbiss braucht eine andere Website als ein Immobilienmakler, deshalb fange ich bei jedem Betrieb neu an. Die vier Beispiele unten laufen live, Sie können sie auf dem Handy durchklicken.',
      index: 'Zur Branche springen',
      live: 'Live-Demo öffnen',
      request: 'So eine Website anfragen',
      videoLabel: 'Bildschirmaufnahme der Demo-Website auf dem Smartphone',
      demos: {
        gastronomie: {
          industry: 'Gastronomie',
          name: 'Altstadt-Imbiss Bosporus',
          place: 'Döner & Pizza · Weißenburg',
          text: 'Wer die Seite öffnet, sieht zuerst ein großes Döner-Foto und direkt darunter die Telefonnummer zum Bestellen.',
          features: [
            'Speisekarte mit Fotos und Preisen',
            'Feste Leiste zum Anrufen und für die Route',
            'Instagram-Feed auf der Seite',
          ],
        },
        immobilien: {
          industry: 'Immobilien',
          name: 'Weber & Stein Immobilien',
          place: 'Maklerbüro · München (fiktives Beispiel)',
          text: 'Die Seite beginnt mit einem Video, das durch ein Haus führt, und lässt den Objektfotos viel Platz. Gedeckte Farben und eine feine Serifenschrift passen zu einem Büro, das teure Wohnungen und Häuser vermittelt.',
          features: [
            'Objekte mit Lage, Zimmern, Fläche und Preis',
            'Kundenstimmen und ein Kontaktformular',
          ],
        },
        barbershop: {
          industry: 'Barbershop',
          name: 'Barbier Jefferson',
          place: 'Barbershop · Weißenburg',
          text: 'Schwarze Blockschrift auf Weiß, dazu Türkis wie die Lichtleisten im Laden. Einen Termin buchen Kunden über den Button oben rechts.',
          features: [
            'Terminbuchung über Planity',
            'Preisliste für Haar, Bart und Rasur',
            'Eigene Abschnitte für Team und Auszeichnungen',
            'Route über Google Maps',
          ],
        },
        kfz: {
          industry: 'Kfz-Service',
          name: 'Reifenservice F.Tas',
          place: 'Reifen & Räder · Weißenburg',
          text: 'Schwarz und Gelb wie in der Werkstatt, und die Preise stehen schon auf dem ersten Bildschirm. Wer neue Reifen braucht, weiß nach ein paar Sekunden, was der Wechsel kostet.',
          features: [
            'Anfrage in drei Schritten, der Preis rechnet sich beim Tippen mit',
            'Die fertige Anfrage geht per WhatsApp oder E-Mail raus',
          ],
        },
      },
      moreTitle: 'Ihre Branche ist nicht dabei?',
      moreText:
        'Die vier sind nur Beispiele. Eine Website für einen Handwerksbetrieb, eine Praxis oder ein Hotel entwerfe ich genauso von vorn.',
      moreCta: 'Über Ihr Projekt sprechen',
    },
    statement: {
      label: 'Warum Design zählt',
      text: 'Viele Kunden sehen Ihre Website, bevor sie Ihren Laden sehen. Wirkt die Seite alt oder lieblos, rufen sie eher bei der Konkurrenz an.',
    },
    services: {
      label: 'Leistungen',
      heading: 'Was Sie bei mir bekommen.',
      sub: 'Ich mache alles selbst, vom ersten Entwurf bis zu den Updates nach dem Start. Für jede Frage haben Sie also dieselbe Telefonnummer.',
      items: [
        {
          title: 'Eigenes Design',
          text: 'Ich arbeite ohne Vorlagen. Farben und Schriften leite ich aus Ihrem Logo und Ihren Räumen ab, damit die Website zu dem passt, was Kunden bei Ihnen vor Ort sehen.',
        },
        {
          title: 'Animationen',
          text: 'Bilder bauen sich beim Scrollen auf, Überschriften gleiten ins Bild. Ich setze das nur dort ein, wo der Blick hinsoll, zum Beispiel auf Ihr Angebot oder den Anruf-Button.',
        },
        {
          title: 'Zuerst fürs Handy',
          text: 'Die meisten Besucher kommen übers Smartphone. Deshalb entwerfe ich jede Seite zuerst für den kleinen Bildschirm und lege Anruf und WhatsApp dorthin, wo der Daumen ohnehin ist.',
        },
        {
          title: 'Schnell und bei Google sichtbar',
          text: 'Die Seiten laden auch mit Animationen schnell, das prüfe ich vor dem Start mit Google PageSpeed. Damit man Sie bei Suchen wie „Friseur Weißenburg“ findet, stehen Ort und Leistungen im Seitentitel und in den Überschriften.',
        },
        {
          title: 'Formulare und Buchungen',
          text: 'Eine Speisekarte, eine Terminbuchung oder ein Anfrageformular, das den Preis gleich ausrechnet: Solche Funktionen beantworten Fragen, die sonst bei Ihnen am Telefon landen.',
        },
        {
          title: 'Betreuung nach dem Start',
          text: 'Auf Wunsch halte ich die Seite technisch aktuell und sicher und baue Änderungen ein. Neue Öffnungszeiten oder ein neues Foto schicken Sie mir einfach per WhatsApp.',
        },
      ],
    },
    process: {
      label: 'Ablauf',
      heading: 'In vier Schritten zur neuen Website.',
      items: [
        {
          title: 'Kennenlernen',
          description:
            'Im kostenlosen Erstgespräch erzählen Sie mir von Ihrem Betrieb und Ihren Kunden. Das Gespräch verpflichtet Sie zu nichts.',
        },
        {
          title: 'Konzept und Festpreis',
          description:
            'Danach bekommen Sie ein Angebot mit Festpreis und Zeitplan. Dazu skizziere ich, welche Seiten und Abschnitte es geben wird.',
        },
        {
          title: 'Design und Umsetzung',
          description:
            'Ich gestalte und programmiere die Website und zeige Ihnen unterwegs Zwischenstände, damit Sie früh mitreden können.',
        },
        {
          title: 'Start und Betreuung',
          description:
            'Ich stelle die Seite online. Wenn Sie möchten, kümmere ich mich auch danach um sie.',
        },
      ],
      ctaLead: 'Erzählen Sie mir von Ihrem Betrieb.',
      cta: 'Kostenloses Erstgespräch vereinbaren',
      ctaNote: 'Unverbindlich · Antwort in unter 24 Stunden',
    },
    about: {
      label: 'Über mich',
      heading: 'Ich baue jede Website selbst.',
      lead: 'Wenn Sie anrufen, sprechen Sie mit dem Menschen, der Ihre Website baut.',
      p1: 'Ich bin Mehmet Deliaci, Webdesigner und Entwickler aus Weißenburg in Bayern. Weil ich die Seiten von Grund auf programmiere, kann ich auch Sonderwünsche umsetzen, etwa den Preisrechner beim Reifenservice.',
      portraitAlt: 'Mehmet Deliaci, Webdesigner aus Weißenburg in Bayern',
      facts: [
        { label: 'Standort', value: 'Weißenburg in Bayern' },
        { label: 'Zusammenarbeit', value: 'Vor Ort in der Region und remote' },
        { label: 'Sprachen', value: 'Deutsch, Englisch, Türkisch' },
        { label: 'Antwortzeit', value: 'Unter 24 Stunden' },
      ],
    },
    faq: {
      label: 'FAQ',
      heading: 'Häufige Fragen',
      items: [
        {
          q: 'Was kostet eine Website?',
          a: 'Eine kompakte Unternehmensseite kostet ab 1.000 €. Mehr Unterseiten, aufwendigere Animationen oder eine Terminbuchung machen sie teurer. Nach dem Erstgespräch bekommen Sie ein Angebot mit Festpreis, und dabei bleibt es auch.',
        },
        {
          q: 'Wie lange dauert die Umsetzung?',
          a: 'Eine kompakte Website ist meist nach zwei bis vier Wochen online, größere Projekte dauern länger. Den verbindlichen Zeitplan bekommen Sie mit dem Angebot, Zwischenstände während der Arbeit sowieso.',
        },
        {
          q: 'Machen Animationen meine Website langsam?',
          a: 'Nicht spürbar. Ich bewege fast nur Position und Transparenz von Elementen, das schaffen auch ältere Handys ohne Ruckeln. Wer am Handy Animationen abgeschaltet hat (beim iPhone „Bewegung reduzieren“), sieht die Seite ohne sie.',
        },
        {
          q: 'Kann ich eine der Demos für meinen Betrieb bekommen?',
          a: 'Eine Kopie bekommen Sie nicht, Ihre Seite soll ja nach Ihrem Betrieb aussehen. Gefällt Ihnen eine Demo, nehmen wir sie aber gern als Ausgangspunkt und bauen sie mit Ihren Fotos und Farben um.',
        },
        {
          q: 'Was muss ich selbst beisteuern?',
          a: 'Am besten Ihr Logo, ein paar Stichpunkte zu Ihrem Angebot und gute Fotos. Die Fotos machen den größten Unterschied. Was fehlt, klären wir zusammen: Bei den Texten helfe ich, und ich sage Ihnen genau, welche Bilder noch gebraucht werden.',
        },
        {
          q: 'Wer kümmert sich danach um die Website?',
          a: 'Das entscheiden Sie. Ich kann die Seite weiter pflegen, oder ich richte sie so ein, dass Sie Texte und Bilder selbst ändern können. Das klären wir vor dem Start.',
        },
        {
          q: 'Ich habe schon eine Website. Lohnt sich ein Relaunch?',
          a: 'Meistens ja, wenn die Seite langsam lädt, auf dem Handy schlecht aussieht oder kaum Anfragen bringt. Im Erstgespräch schaue ich sie mir an und sage Ihnen, ob sich ein Neustart lohnt oder ob ein paar Änderungen reichen.',
        },
      ],
    },
    contact: {
      label: 'Kontakt',
      heading: 'Lassen Sie uns über Ihre neue Website sprechen.',
      sub: 'Schildern Sie mir kurz Ihr Vorhaben. Sie erhalten in der Regel innerhalb von 24 Stunden eine Antwort.',
      direct: 'Direkter Kontakt',
      name: 'Name',
      namePlaceholder: 'Ihr Name',
      emailPlaceholder: 'sie@unternehmen.de',
      company: 'Unternehmen (optional)',
      companyPlaceholder: 'Ihr Unternehmen',
      phone: 'Telefon (optional)',
      phonePlaceholder: 'Für einen Rückruf',
      project: 'Ihr Projekt',
      projectPlaceholder: 'Worum geht es? Ein paar Sätze genügen.',
      prefill:
        'Mir gefällt die Demo „{demo}“. Ich hätte gern eine ähnliche Website für meinen Betrieb.',
      send: 'Kostenloses Erstgespräch anfordern',
      sending: 'Wird gesendet …',
      success:
        'Danke, Ihre Anfrage ist angekommen. Ich melde mich in der Regel innerhalb von 24 Stunden.',
      error:
        'Das Senden ist fehlgeschlagen. Bitte versuchen Sie es erneut oder schreiben Sie mir direkt.',
      note: '100 % unverbindlich · Antwort innerhalb von 24 Stunden',
      proofLabel: 'Meine Arbeitsproben',
      proofText:
        'Diese Website und die vier Branchen-Demos oben habe ich selbst gestaltet und programmiert.',
      subject: 'Projektanfrage von',
    },
    stickyBar: {
      call: 'Anrufen',
      whatsapp: 'WhatsApp',
    },
    consent: {
      text: 'Diese Website nutzt Google Ads Conversion-Tracking, um zu messen, ob Werbeanzeigen zu Anfragen führen. Cookies werden erst nach Ihrer Zustimmung gesetzt.',
      privacy: 'Mehr in der Datenschutzerklärung.',
      accept: 'Akzeptieren',
      decline: 'Ablehnen',
      label: 'Cookie-Hinweis',
    },
    footer: {
      role: 'Webdesign & Entwicklung',
      imprint: 'Impressum',
      privacy: 'Datenschutz',
    },
  },
  en: {
    nav: {
      work: 'Industries',
      services: 'Services',
      process: 'Process',
      about: 'About',
      cta: 'Start a project',
      menu: 'Open or close menu',
      skip: 'Skip to content',
    },
    hero: {
      eyebrow: 'Web design from Weißenburg, Bavaria',
      headline: 'Your website|could look *like this.*',
      sub: 'I build high-end websites with animation for restaurants, estate agents, barbers, workshops and other businesses. Each site is designed on its own and for phones first, and you know the price before work starts.',
      primary: 'Free intro call',
      secondary: 'See industry demos',
      contactLabel: 'Your direct contact',
      whatsapp: 'WhatsApp',
      facts: [
        { value: 'from €1,000', label: 'fixed-price quote' },
        { value: '2–4 weeks', label: 'until launch' },
        { value: '< 24 h', label: 'response time' },
      ],
    },
    showcase: {
      label: 'Industry demos',
      heading: 'Each industry gets a different design.',
      sub: 'A kebab shop needs a different website than an estate agent, so I start from scratch for every business. The four examples below are live, and you can click through them on your phone.',
      index: 'Jump to industry',
      live: 'Open live demo',
      request: 'Request a site like this',
      videoLabel: 'screen recording of the demo website on a smartphone',
      demos: {
        gastronomie: {
          industry: 'Restaurants',
          name: 'Altstadt-Imbiss Bosporus',
          place: 'Kebab & pizza · Weißenburg',
          text: 'The first thing visitors see is a big photo of a döner, with the phone number for orders right below it.',
          features: [
            'Menu with photos and prices',
            'Fixed bar for calling and directions',
            'Instagram feed on the page',
          ],
        },
        immobilien: {
          industry: 'Real estate',
          name: 'Weber & Stein Immobilien',
          place: 'Estate agency · Munich (fictional example)',
          text: 'The site opens with a video walking through a house and gives the property photos plenty of room. Muted colours and a fine serif typeface suit an agency that sells expensive homes.',
          features: [
            'Listings with location, rooms, size and price',
            'Client reviews and a contact form',
          ],
        },
        barbershop: {
          industry: 'Barbershop',
          name: 'Barbier Jefferson',
          place: 'Barbershop · Weißenburg',
          text: 'Black block letters on white, with the same turquoise as the light strips in the shop. Customers book an appointment with the button in the top right corner.',
          features: [
            'Booking through Planity',
            'Price list for hair, beard and shave',
            'Sections for the team and its awards',
            'Directions via Google Maps',
          ],
        },
        kfz: {
          industry: 'Car service',
          name: 'Reifenservice F.Tas',
          place: 'Tyres & wheels · Weißenburg',
          text: 'Black and yellow like the workshop itself, with prices on the very first screen. Anyone who needs new tyres knows within seconds what the change will cost.',
          features: [
            'Three-step enquiry that works out the price as you type',
            'The finished enquiry goes out by WhatsApp or email',
          ],
        },
      },
      moreTitle: 'Your industry is not here?',
      moreText:
        'These four are only examples. A site for a tradesman, a practice or a hotel gets designed from the ground up in the same way.',
      moreCta: 'Talk about your project',
    },
    statement: {
      label: 'Why design matters',
      text: 'Many customers see your website before they see your shop. If the site looks dated or careless, they are more likely to call a competitor.',
    },
    services: {
      label: 'Services',
      heading: 'What you get.',
      sub: 'I do everything myself, from the first draft to the updates after launch, so every question goes to the same phone number.',
      items: [
        {
          title: 'Your own design',
          text: 'I work without templates. I take colours and fonts from your logo and your premises, so the website matches what customers see when they visit you.',
        },
        {
          title: 'Animation',
          text: 'Images build up as you scroll and headings slide into view. I only use this where the eye should go, such as your offer or the call button.',
        },
        {
          title: 'Phone first',
          text: 'Most visitors arrive on a smartphone. So I design every page for the small screen first and put call and WhatsApp where the thumb already is.',
        },
        {
          title: 'Fast and visible on Google',
          text: 'The pages load quickly even with animation, and I check that with Google PageSpeed before launch. To show up for searches like "barber Weissenburg", your town and services go into the page title and headings.',
        },
        {
          title: 'Forms and booking',
          text: 'A menu, online booking or an enquiry form that works out the price: features like these answer questions that would otherwise reach you by phone.',
        },
        {
          title: 'Care after launch',
          text: 'If you like, I keep the site up to date and secure and make changes. Send me new opening hours or a new photo on WhatsApp and I put them in.',
        },
      ],
    },
    process: {
      label: 'Process',
      heading: 'Your new website in four steps.',
      items: [
        {
          title: 'Getting to know you',
          description:
            'In a free intro call you tell me about your business and your customers. The call does not commit you to anything.',
        },
        {
          title: 'Concept and fixed price',
          description:
            'You then get a quote with a fixed price and timeline, plus a sketch of the pages and sections the site will have.',
        },
        {
          title: 'Design and build',
          description:
            'I design and build the website and show you progress along the way, so you can weigh in early.',
        },
        {
          title: 'Launch and care',
          description: 'I put the site online. If you want, I keep looking after it afterwards.',
        },
      ],
      ctaLead: 'Tell me about your business.',
      cta: 'Book your free intro call',
      ctaNote: 'No obligation · Reply within 24 hours',
    },
    about: {
      label: 'About',
      heading: 'I build every website myself.',
      lead: 'When you call, you speak to the person who builds your website.',
      p1: 'I am Mehmet Deliaci, a web designer and developer from Weißenburg in Bavaria. Because I code the sites from scratch, I can build unusual requests too, such as the price calculator on the tyre service demo.',
      portraitAlt: 'Mehmet Deliaci, web designer from Weißenburg, Bavaria',
      facts: [
        { label: 'Location', value: 'Weißenburg, Bavaria' },
        { label: 'Collaboration', value: 'On-site regionally and remote' },
        { label: 'Languages', value: 'German, English, Turkish' },
        { label: 'Response time', value: 'Under 24 hours' },
      ],
    },
    faq: {
      label: 'FAQ',
      heading: 'Common questions',
      items: [
        {
          q: 'What does a website cost?',
          a: 'A compact company website costs from €1,000. More pages, more elaborate animation or online booking add to that. After the intro call you get a quote with a fixed price, and that is the price you pay.',
        },
        {
          q: 'How long does it take?',
          a: 'A compact website is usually online after two to four weeks; larger projects take longer. You get a binding timeline with the quote, and progress updates while I work.',
        },
        {
          q: 'Will animations slow my website down?',
          a: 'Not noticeably. I mostly animate position and transparency, which even older phones handle without stutter. Visitors who switched off animation on their phone (on iPhone: "Reduce Motion") see the site without it.',
        },
        {
          q: 'Can I get one of the demos for my business?',
          a: 'Not as a copy, because your site should look like your business. If you like one of the demos, we can use it as a starting point and rework it with your photos and colours.',
        },
        {
          q: 'What do I need to provide?',
          a: 'Ideally your logo, a few notes about what you offer and good photos. The photos make the biggest difference. Anything missing we sort out together: I help with the copy and tell you exactly which pictures are still needed.',
        },
        {
          q: 'Who takes care of the website afterwards?',
          a: 'That is up to you. I can keep maintaining the site, or set it up so you can change text and images yourself. We decide before the project starts.',
        },
        {
          q: 'I already have a website. Is a relaunch worth it?',
          a: 'Usually yes, if your site loads slowly, looks poor on phones or brings few enquiries. In the intro call I look at it and tell you whether a full relaunch makes sense or a few changes will do.',
        },
      ],
    },
    contact: {
      label: 'Contact',
      heading: "Let's talk about your new website.",
      sub: 'Tell me briefly about your plan. You will usually get a reply within 24 hours.',
      direct: 'Direct contact',
      name: 'Name',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'you@company.com',
      company: 'Company (optional)',
      companyPlaceholder: 'Your company',
      phone: 'Phone (optional)',
      phonePlaceholder: 'If you prefer a call back',
      project: 'Your project',
      projectPlaceholder: 'What is it about? A few sentences are enough.',
      prefill: 'I like the "{demo}" demo and would like a similar website for my business.',
      send: 'Request your free intro call',
      sending: 'Sending …',
      success: 'Thank you, your request has arrived. I usually reply within 24 hours.',
      error: 'Sending failed. Please try again or email me directly.',
      note: '100% no obligation · Reply within 24 hours',
      proofLabel: 'My work samples',
      proofText: 'I designed and built this website and the four industry demos above myself.',
      subject: 'Project inquiry from',
    },
    stickyBar: {
      call: 'Call',
      whatsapp: 'WhatsApp',
    },
    consent: {
      text: 'This site uses Google Ads conversion tracking to measure whether ads lead to enquiries. Cookies are only set after you agree.',
      privacy: 'More in the privacy policy.',
      accept: 'Accept',
      decline: 'Decline',
      label: 'Cookie notice',
    },
    footer: {
      role: 'Web design & development',
      imprint: 'Imprint',
      privacy: 'Privacy',
    },
  },
  tr: {
    nav: {
      work: 'Sektörler',
      services: 'Hizmetler',
      process: 'Süreç',
      about: 'Hakkımda',
      cta: 'Proje başlat',
      menu: 'Menüyü aç veya kapat',
      skip: 'İçeriğe atla',
    },
    hero: {
      eyebrow: 'Weißenburg, Bavyera’dan web tasarım',
      headline: 'Yeni web siteniz|böyle *görünebilir.*',
      sub: 'Restoranlar, emlakçılar, berberler, atölyeler ve diğer işletmeler için animasyonlu, kaliteli web siteleri yapıyorum. Her siteyi ayrı ayrı ve önce telefon için tasarlıyorum; fiyatı iş başlamadan önce bilirsiniz.',
      primary: 'Ücretsiz ön görüşme',
      secondary: 'Sektör demolarını gör',
      contactLabel: 'Doğrudan muhatabınız',
      whatsapp: 'WhatsApp',
      facts: [
        { value: '1.000 €’dan', label: 'sabit fiyat teklifi' },
        { value: '2–4 hafta', label: 'yayına kadar' },
        { value: '< 24 sa', label: 'yanıt süresi' },
      ],
    },
    showcase: {
      label: 'Sektör demoları',
      heading: 'Her sektör bende farklı görünür.',
      sub: 'Bir döner salonunun sitesi bir emlak ofisininkine benzememeli, bu yüzden her işletmede sıfırdan başlıyorum. Aşağıdaki dört örnek canlı, telefonunuzda gezinebilirsiniz.',
      index: 'Sektöre git',
      live: 'Canlı demoyu aç',
      request: 'Böyle bir site talep et',
      videoLabel: 'demo web sitesinin akıllı telefondaki ekran kaydı',
      demos: {
        gastronomie: {
          industry: 'Yeme-içme',
          name: 'Altstadt-Imbiss Bosporus',
          place: 'Döner & pizza · Weißenburg',
          text: 'Siteyi açan ilk olarak büyük bir döner fotoğrafı görür, hemen altında da sipariş için telefon numarasını.',
          features: [
            'Fotoğraflı ve fiyatlı menü',
            'Arama ve yol tarifi için sabit çubuk',
            'Sayfada Instagram akışı',
          ],
        },
        immobilien: {
          industry: 'Emlak',
          name: 'Weber & Stein Immobilien',
          place: 'Emlak ofisi · Münih (kurgusal örnek)',
          text: 'Site, bir evin içinde dolaşan bir videoyla açılır ve mülk fotoğraflarına bolca yer bırakır. Sade renkler ve ince bir serif yazı tipi, pahalı evler satan bir ofise yakışır.',
          features: [
            'Konum, oda sayısı, alan ve fiyatıyla mülkler',
            'Müşteri yorumları ve iletişim formu',
          ],
        },
        barbershop: {
          industry: 'Berber',
          name: 'Barbier Jefferson',
          place: 'Berber · Weißenburg',
          text: 'Beyaz üzerine siyah blok harfler ve dükkândaki ışık şeritleriyle aynı turkuaz. Müşteriler randevuyu sağ üstteki butondan alır.',
          features: [
            'Planity üzerinden randevu',
            'Saç, sakal ve tıraş fiyat listesi',
            'Ekip ve ödüller için ayrı bölümler',
            'Google Haritalar ile yol tarifi',
          ],
        },
        kfz: {
          industry: 'Oto servis',
          name: 'Reifenservice F.Tas',
          place: 'Lastik & jant · Weißenburg',
          text: 'Atölye gibi siyah ve sarı, fiyatlar daha ilk ekranda. Lastik değiştirmek isteyen, birkaç saniyede ne ödeyeceğini görür.',
          features: [
            'Yazarken fiyatı hesaplayan üç adımlı talep formu',
            'Hazır talep WhatsApp veya e-posta ile gider',
          ],
        },
      },
      moreTitle: 'Sektörünüz listede yok mu?',
      moreText:
        'Bu dördü sadece örnek. Bir zanaat işletmesi, muayenehane veya otel için de siteyi aynı şekilde sıfırdan tasarlarım.',
      moreCta: 'Projenizi konuşalım',
    },
    statement: {
      label: 'Tasarım neden önemli',
      text: 'Birçok müşteri dükkânınızı görmeden önce web sitenizi görür. Site eski ya da özensiz görünüyorsa, rakibinizi arama ihtimalleri artar.',
    },
    services: {
      label: 'Hizmetler',
      heading: 'Benimle çalışınca neler alırsınız.',
      sub: 'İlk taslaktan yayın sonrası güncellemelere kadar her şeyi kendim yapıyorum. Her soru için aynı telefon numarasını ararsınız.',
      items: [
        {
          title: 'Size ait tasarım',
          text: 'Şablon kullanmıyorum. Renkleri ve yazı tiplerini logonuzdan ve mekânınızdan alırım, böylece site müşterilerin sizde gördüğüyle uyumlu olur.',
        },
        {
          title: 'Animasyonlar',
          text: 'Görseller kaydırdıkça belirir, başlıklar kayarak gelir. Bunu yalnızca bakışın gitmesi gereken yerlerde kullanırım, örneğin teklifinizde veya arama butonunda.',
        },
        {
          title: 'Önce mobil',
          text: 'Ziyaretçilerin çoğu akıllı telefondan gelir. Bu yüzden her sayfayı önce küçük ekran için tasarlar, arama ve WhatsApp butonlarını başparmağın zaten olduğu yere koyarım.',
        },
        {
          title: 'Hızlı ve Google’da görünür',
          text: 'Sayfalar animasyonla bile hızlı yüklenir, bunu yayından önce Google PageSpeed ile kontrol ederim. "Berber Weißenburg" gibi aramalarda bulunmanız için şehriniz ve hizmetleriniz sayfa başlığında ve başlıklarda yer alır.',
        },
        {
          title: 'Formlar ve randevular',
          text: 'Menü, online randevu ya da fiyatı kendisi hesaplayan bir talep formu: Bu tür işlevler, normalde telefonla gelecek soruları yanıtlar.',
        },
        {
          title: 'Yayından sonra destek',
          text: 'İsterseniz siteyi güncel ve güvenli tutar, değişiklikleri yaparım. Yeni çalışma saatlerini veya yeni bir fotoğrafı bana WhatsApp’tan göndermeniz yeterli.',
        },
      ],
    },
    process: {
      label: 'Süreç',
      heading: 'Dört adımda yeni web sitenize.',
      items: [
        {
          title: 'Tanışma',
          description:
            'Ücretsiz ön görüşmede bana işletmenizi ve müşterilerinizi anlatırsınız. Görüşme sizi hiçbir şeye bağlamaz.',
        },
        {
          title: 'Konsept ve sabit fiyat',
          description:
            'Ardından sabit fiyatlı ve zaman planlı bir teklif alırsınız. Sitenin hangi sayfa ve bölümlerden oluşacağını da kabaca çizerim.',
        },
        {
          title: 'Tasarım ve geliştirme',
          description:
            'Web sitesini tasarlar ve kodlarım, ara sonuçları size gösteririm. Böylece erkenden fikrinizi söyleyebilirsiniz.',
        },
        {
          title: 'Yayın ve destek',
          description: 'Siteyi yayına alırım. İsterseniz sonrasında da ilgilenmeye devam ederim.',
        },
      ],
      ctaLead: 'Bana işletmenizi anlatın.',
      cta: 'Ücretsiz ön görüşme ayarlayın',
      ctaNote: 'Bağlayıcı değil · 24 saatten kısa sürede yanıt',
    },
    about: {
      label: 'Hakkımda',
      heading: 'Her web sitesini kendim yapıyorum.',
      lead: 'Aradığınızda, web sitenizi yapan kişiyle konuşursunuz.',
      p1: 'Ben Mehmet Deliaci, Bavyera Weißenburg’dan bir web tasarımcısı ve geliştiricisiyim. Siteleri sıfırdan kodladığım için özel istekleri de yapabilirim, örneğin lastik servisi demosundaki fiyat hesaplayıcı gibi.',
      portraitAlt: 'Weißenburg’lu web tasarımcısı Mehmet Deliaci',
      facts: [
        { label: 'Konum', value: 'Weißenburg, Bavyera' },
        { label: 'Çalışma', value: 'Bölgede yerinde ve uzaktan' },
        { label: 'Diller', value: 'Almanca, İngilizce, Türkçe' },
        { label: 'Yanıt süresi', value: '24 saatten kısa' },
      ],
    },
    faq: {
      label: 'SSS',
      heading: 'Sık sorulan sorular',
      items: [
        {
          q: 'Bir web sitesi ne kadara mal olur?',
          a: 'Kompakt bir kurumsal site 1.000 €’dan başlar. Daha fazla sayfa, daha kapsamlı animasyonlar veya online randevu fiyatı artırır. Ön görüşmeden sonra sabit fiyatlı bir teklif alırsınız ve ödediğiniz fiyat o olur.',
        },
        {
          q: 'Ne kadar sürer?',
          a: 'Kompakt bir site genellikle iki ila dört hafta içinde yayında olur, büyük projeler daha uzun sürer. Bağlayıcı zaman planını teklifle birlikte alırsınız, çalışma sırasında da ara sonuçları görürsünüz.',
        },
        {
          q: 'Animasyonlar sitemi yavaşlatır mı?',
          a: 'Fark edilecek kadar değil. Çoğunlukla öğelerin konumunu ve saydamlığını hareket ettiririm, bunu eski telefonlar bile takılmadan kaldırır. Telefonunda animasyonları kapatmış olanlar (iPhone’da "Hareketi Azalt") siteyi animasyonsuz görür.',
        },
        {
          q: 'Demolardan birini işletmem için alabilir miyim?',
          a: 'Birebir kopya olmaz, çünkü siteniz kendi işletmenize benzemeli. Bir demoyu beğendiyseniz onu başlangıç noktası yapar, kendi fotoğraflarınız ve renklerinizle yeniden düzenleriz.',
        },
        {
          q: 'Benim ne sağlamam gerekiyor?',
          a: 'İdeal olarak logonuz, sunduklarınız hakkında birkaç not ve iyi fotoğraflar. En büyük farkı fotoğraflar yaratır. Eksik kalanları birlikte hallederiz: Metinlerde yardım eder, hangi görsellerin gerektiğini açıkça söylerim.',
        },
        {
          q: 'Sonrasında siteyle kim ilgilenir?',
          a: 'Buna siz karar verirsiniz. Siteyle ilgilenmeye devam edebilirim ya da metinleri ve görselleri kendiniz değiştirebileceğiniz şekilde kurarım. Bunu başlamadan önce konuşuruz.',
        },
        {
          q: 'Zaten bir sitem var. Yenilemeye değer mi?',
          a: 'Siteniz yavaş yükleniyor, telefonda kötü görünüyor veya az talep getiriyorsa çoğu zaman evet. Ön görüşmede sitenize bakar, baştan yapmanın mı yoksa birkaç değişikliğin mi yeteceğini söylerim.',
        },
      ],
    },
    contact: {
      label: 'İletişim',
      heading: 'Yeni web siteniz hakkında konuşalım.',
      sub: 'Planınızı kısaca anlatın. Genellikle 24 saat içinde yanıt alırsınız.',
      direct: 'Doğrudan iletişim',
      name: 'Ad',
      namePlaceholder: 'Adınız',
      emailPlaceholder: 'siz@sirket.com',
      company: 'Şirket (opsiyonel)',
      companyPlaceholder: 'Şirketiniz',
      phone: 'Telefon (opsiyonel)',
      phonePlaceholder: 'Aranmayı tercih ederseniz',
      project: 'Projeniz',
      projectPlaceholder: 'Proje ne hakkında? Birkaç cümle yeterli.',
      prefill: '"{demo}" demosunu beğendim, işletmem için benzer bir web sitesi istiyorum.',
      send: 'Ücretsiz ön görüşme talep et',
      sending: 'Gönderiliyor …',
      success: 'Teşekkürler, talebiniz ulaştı. Genellikle 24 saat içinde yanıt veririm.',
      error: 'Gönderilemedi. Lütfen tekrar deneyin veya doğrudan e-posta gönderin.',
      note: '%100 bağlayıcı değil · 24 saat içinde yanıt',
      proofLabel: 'Çalışma örneklerim',
      proofText: 'Bu web sitesini ve yukarıdaki dört sektör demosunu kendim tasarlayıp kodladım.',
      subject: 'Proje talebi',
    },
    stickyBar: {
      call: 'Ara',
      whatsapp: 'WhatsApp',
    },
    consent: {
      text: 'Bu site, reklamların talebe dönüşüp dönüşmediğini ölçmek için Google Ads dönüşüm izleme kullanır. Çerezler yalnızca onayınızdan sonra ayarlanır.',
      privacy: 'Ayrıntılar gizlilik politikasında.',
      accept: 'Kabul et',
      decline: 'Reddet',
      label: 'Çerez bildirimi',
    },
    footer: {
      role: 'Web tasarım & geliştirme',
      imprint: 'Künye',
      privacy: 'Gizlilik',
    },
  },
} as const;
