import { ProcessStep } from '../models/portfolio.models';

/** The four collaboration steps, rendered with their 1-based index. */
export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: 'Kennenlernen & Analyse',
    description:
      'In einem kostenlosen Erstgespräch klären wir Ihre Ziele, Anforderungen und den ' +
      'Rahmen Ihres Projekts – unverbindlich und auf Augenhöhe.',
  },
  {
    title: 'Konzept & Angebot',
    description:
      'Sie erhalten ein klares Konzept mit Festpreis-Angebot und realistischem Zeitplan. ' +
      'Keine versteckten Kosten, keine Überraschungen.',
  },
  {
    title: 'Design & Entwicklung',
    description:
      'Ich setze Ihr Projekt in klar definierten Etappen um. Sie sehen regelmäßig ' +
      'Zwischenstände und können jederzeit Feedback geben.',
  },
  {
    title: 'Launch & Support',
    description:
      'Nach dem Go-live lasse ich Sie nicht allein: Auf Wunsch übernehme ich Wartung, ' +
      'Updates und die Weiterentwicklung Ihrer Website.',
  },
];
