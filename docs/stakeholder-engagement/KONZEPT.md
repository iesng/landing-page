# Entwurf: Stakeholder-Engagement auf www.ies.swiss

Stand: 12.11.2026 · Branch `jboettge` · Status: Entwurf zur Diskussion (PO-Team NEOC)
Grundlage: CLAUDE.md «CD Bund / BABS und Stakeholder-Engagement», Teil B (Quellen FS, SM, FB, SL, PA, IA, WR).

## 1 Ausgangslage Website

- Repo enthält nur Inhalte (Sveltia CMS). Rendering und Schema liegen im privaten Repo `landing-page-deploy`.
- Abschnitt «Involvierung» (`content/settings/involvement-settings.md`) hat ein **festes Schema**:
  - Strategisch: Einleitung + Liste `strategic_partners` (4 Karten)
  - Taktisch: Einleitung + 2 Rollenkarten (`hop_*`, `expert_*`)
  - Operativ: Einleitung + 3 Kurzkarten (`pool_1..3_*`)
- Ist-Inhalt ist halb migriert und fachlich überholt:
  - DE: Mischung aus neuer Domänenlogik und altem Modell (Rolle «Expert», «Head of Pool»), Tippfehler «Präklink», Partnerliste mit Bindestrich-Aufzählung im Fliesstext.
  - EN/FR/IT: weiterhin altes Modell (Expert, Head of Pool, Pools).
  - «formelle Abnahmen» auf operativer Ebene: falsch. Es gibt eine **fachliche Abnahmeempfehlung** der Fachverantwortlichen; die kommerzielle Abnahme bleibt getrennt.
  - armasuisse als «Projektleitung»: gemäss Stakeholdermap Beschaffungsrolle.

## 2 Vorgehen in zwei Etappen

| Etappe | Inhalt | Aufwand | Abhängigkeit |
|---|---|---|---|
| 1 | Bestehendes Schema mit neuem Modell befüllen (DE umgesetzt) | nur Content | Übersetzung EN/FR/IT |
| 2 | Neue Bausteine: Ebenen × Domänen, Rollen mit AKV, Fachbereiche, Mitwirkungszyklus | Frontend + CMS-Schema | `landing-page-deploy` (Code Owner) |

### Etappe 1 – umgesetzt in `content/settings/involvement-settings.md` (nur `de`)

| Feld | Alt | Neu |
|---|---|---|
| `nav_label` | Involvierung | **Mitwirkung** |
| `subtitle` | allgemeiner Einbezug | Rollenteilung Bund/Kantone/Organisationen, Kette Delegation → Wahl → Abnahmeempfehlung, «Funktion zählt» |
| `strategic_*` | Akzeptanz, Ressourcen | + Projektausschuss, Delegation via GDK/KKPKS; Partner gemäss SM v0.1, mit «·» getrennt |
| `hop_*` | «Präklink» | **Applikationsverantwortliche** (SPOC, Super-User, Ausbildung, Prozess-Review) |
| `expert_*` | Expert (Testing) | **Fachverantwortliche** (konsolidieren, Priorisierung, Abnahmeempfehlung, vor Ort) |
| `operative_*` | «formelle Abnahmen» | Frontfunktionen, Einbezug via Fachvertreter:innen, Fachworkshops/Abnahmetests |
| `pool_1..3` | Pools RD/San/Spital | **Fachvertreter:innen** · **Super-User und Trainer:innen** · **Anwender:innen** |

Bewusste Abweichungen von der SM:
- «BI-Datennutzer» und «Kantonales Amt für Zivilschutz» aus Partnerliste entfernt (Rolle bzw. operative Stufe, kein strategischer Partner).
- SGNOR nur unter Klinik (SM), nicht doppelt.

Einschränkung: Das alte Schema ordnet Rollen fix einer Ebene zu. Fachverantwortliche stehen deshalb unter «taktisch», Fachvertreter:innen unter «operativ», obwohl beide stufenunabhängig sind («Funktion zählt»). Etappe 2 löst das.

## 3 Etappe 2 – Informationsarchitektur

Empfehlung: Kurzfassung auf der Startseite (Etappe-1-Abschnitt) mit Link «Mehr zur Mitwirkung» auf neue Unterseite `/de/mitwirkung` (FR `/fr/participation`, IT `/it/partecipazione`, EN `/en/involvement`).

| Nr. | Baustein | Inhalt | Darstellung | Quelle |
|---|---|---|---|---|
| M1 | Grundsätze | Bund stellt System, Kantone führen, Organisationen arbeiten damit · Funktion zählt · Kantone = 26 + FL | 3 Kacheln mit Icon | FS, Kap. 14 |
| M2 | Ebenen × Domänen | Matrix S/T/O × Präklinik/Klinik/Polizei-Stab-Dritte/Armee | Tabelle Desktop, Tabs je Domäne mobil | SM, Kap. 15 |
| M3 | Rollen (AKV) | Aufgaben, Kompetenzen, Verantwortung je Rolle + Zuordnung zu Ebenen | Karten mit 3 Rubriken, Matrix Rolle × Ebene | Kap. 17 |
| M4 | Fachbereiche | 5 Gruppen, 12 Fachbereiche, Teilaufgaben | Akkordeon | FB/IA, Kap. 16 |
| M5 | Mitwirkung im Entwicklungszyklus | Zyklus Anforderung → PI → Sprint → Fachtesting → Backlog · Gefässe · 4 Schritte Fachtesting · Kernsatz «Passt nicht zum Einsatz» | Prozesskette (Chevrons), Tabelle | Kap. 19 |
| M6 | Termine | Infoanlässe, Fachworkshops, Abnahmetest, Go-Live | Zeitleiste | Kap. 20 |
| M7 | Kontakt | ies.ng@babs.admin.ch · Feedback-Formular · kantonale Applikationsverantwortliche (Link auf Abschnitt Einführung) | CTA-Leiste | – |

Vollständiger Inhaltsentwurf (DE, YAML im CMS-Stil): [`involvement-page.entwurf.yml`](involvement-page.entwurf.yml).

### Rollen nach AKV (Kern von M3)

| Rolle | Aufgaben | Kompetenzen | Verantwortung | Ebene |
|---|---|---|---|---|
| Kantone (via GDK/KKPKS) | Fachvertreter:innen delegieren | Delegation je Fachbereich | föderale Verankerung | S |
| Projektausschuss (Verbände) | strategische Begleitung | Empfehlungen an das Projekt | Akzeptanz in den Verbänden | S |
| Fachvertreter:innen | Praxis und Sicht des Kantons einbringen, Informationen in den Kanton zurücktragen | wählen Gruppierungsmodell und Fachverantwortliche (1 Stimme je Kanton und Fachbereich), Selbstnomination | abgestimmte Position des Kantons | T/O |
| Fachverantwortliche | Meinungen abholen, konsolidieren, Entscheid vertreten, Priorisierung bestätigen | **Stimmrecht** fachliche Abnahmeempfehlung | Empfehlung je Fachbereich, kein Alleingang | T/O |
| Applikationsverantwortliche | SPOC BABS–Kanton, Super-User, Ausbildung, Prozess-Review | Berechtigungen in der Organisation (u. a. Schulungsumgebung) | Einführung in der eigenen Organisation | T |
| Product Owner (BABS NEOC) | Epics, Akzeptanzkriterien, Backlog, Moderation, Rückmeldungen erfassen | Planung im PI, Priorisierung Backlog | Produkt IES | – |
| Epic Owner (BABS NEOC) | Konsensfindung bei widersprüchlicher Empfehlung moderieren | Eskalation an Projektleitung | Abschluss Epic | – |
| Projektleitung (BABS) | Gesamtsteuerung | Stichentscheid Wahl, Entscheid bei Eskalation | Projekt IES NG | – |

### Schema-Vorschlag für `landing-page-deploy`

Neue Datei `content/settings/involvement-page-settings.md` (Singleton) mit:

```yaml
principles[]:  { icon, title, text }
levels[]:      { key: s|t|o, label, description }
domains[]:     { key, label, stakeholders: { s[], t[], o[] } }   # Einträge: { name, note? }
roles[]:       { key, title, appointment, tasks[], competences[], responsibility, levels[], participation }
groups[]:      { title, fachbereiche[]: { name, tasks[] } }
cycle[]:       { step, actor, text }
formats[]:     { name, form, participants, purpose }
testing_steps[]: { title, text }
key_message:   string
contact:       { email, feedback_url, label }
```

Termine (M6) als eigene Collection `content/involvement-events/*.md` (Felder `date`, `title`, `form`, `state`), analog `roadmap/`, damit Redaktion Termine ohne Code pflegt.

## 4 Kurzfristig: News und FAQ (ohne Schemaänderung)

**News** `content/news/2026-11-xx-wahl-fachverantwortliche.md` (nach Freigabe):
> **Fachvertreter:innen wählen ihre Fachverantwortlichen.** Bis 27.11.2026 wählen die Fachvertreter:innen je Fachbereich das Gruppierungsmodell, bis 30.11.2026 läuft die Selbstnomination, bis 04.12.2026 die Wahl. Das Ergebnis wird am 07.12.2026 per Mail bekannt gegeben. Infoanlässe: 17.11.2026 und 26.11.2026 (MS Teams, DE mit Simultandolmetschen FR/IT).

**FAQ** (Präfix «Mitwirkung -», analog «Ereignisbewältigung -»):

| Frage | Antwort (Entwurf) |
|---|---|
| Wie kann ich bei der Entwicklung von IES mitwirken? | Die Kantone delegieren über die GDK (Gesundheit) bzw. die KKPKS (Sicherheit) Fachvertreter:innen in die Fachbereiche. Wenden Sie sich an Ihre kantonale Stelle oder an ies.ng@babs.admin.ch. Rückmeldungen zum System nimmt das Feedback-Formular entgegen. |
| Wer entscheidet über die fachliche Abnahme? | Die gewählten Fachverantwortlichen eines Fachbereichs geben die fachliche Abnahmeempfehlung ab, soweit möglich nach Rücksprache mit den Fachvertreter:innen. Geprüft wird die fachliche Anwendbarkeit, nicht die technische Umsetzung. |
| Was ist der Unterschied zwischen Fachvertreter:innen und Fachverantwortlichen? | Fachvertreter:innen werden vom Kanton delegiert und bringen die Praxis ein. Fachverantwortliche werden von ihnen gewählt (bis zu fünf je Fachbereich), konsolidieren die Meinungen und haben Stimmrecht bei der Abnahmeempfehlung. |
| Warum fehlen im Test noch Funktionen? | Gebaut wird nach Priorität und Abhängigkeiten, nicht in der Reihenfolge des Einsatzablaufs. «Fehlt noch» ist kein Befund. «Passt nicht zum Einsatz» ist der wichtige Befund. |

FAQ-Dateien erst anlegen, wenn EN/FR/IT vorliegen (bestehende FAQ-Einträge sind immer viersprachig).

## 5 Publikationsfilter (öffentliche Website)

Nicht publizieren:
- Personennamen (PO, Auftraggeber) → nur Funktionsadresse ies.ng@babs.admin.ch.
- Jira-Referenzen, Filter, Staging-Umgebung, Risikoliste, Wahlreglement-Details (Sitzvergabe, Stichentscheid).
- Nicht validierte (A)-Zuordnungen der SM v0.1 ohne Freigabe (betrifft u. a. GDK/Gesundheitsämter, SGNOR, BABS NEOC, armasuisse, LBA, KATAMED-Rollen).

Publizieren mit Hinweis «Stand»:
- Termine (ändern sich; Quelle IA).

## 6 Offene Punkte

| Nr. | Punkt | Zuständig |
|---|---|---|
| 1 | Freigabe Etappe 1 (DE) und (A)-Zuordnungen der Partnerliste | PO-Team / Lead PO |
| 2 | Übersetzung EN/FR/IT (Skill `ies-ng-translation`, Glossar). FR/IT: Produkt IES = **SII**, Projekt IES NG = **SII NG**, Altsystem IES-KSD = **SII-SSC** (Glossar am 12.11.2026 angeglichen) | PO-Team |
| 3 | Rolle armasuisse auf Website: «Beschaffung» oder ohne Zusatz? | Projektleitung |
| 4 | Termine: Roadmap nennt R0.8 02.12.2026 / R1.0 12.05.2027, Projektplanung R0.8 25.11.2026 / R1.0 31.03.2027 / Go-Live 18.05.2027 → angleichen | PO-Team |
| 5 | Etappe 2: Schema und Unterseite im Deploy-Repo umsetzen | Code Owner `landing-page-deploy` |
| 6 | URL Feedback-Formular «IES NG – User Feedback» (öffentlich?) | PO-Team |
| 7 | Logos `strategic_partners` (aktuell Platzhalter-Bild); Nutzungsrechte Verbandslogos klären oder Icons je Domäne verwenden | Redaktion |
| 8 | Teilnahme 10.12.2026 (vor Ort alle vs. hybrid) und Bergregionen (GL) – vor Publikation von M6 klären | PO-Team |
| 9 | Fachbereich «Business Engineer» vs. «Businessanalyst» vor Publikation M4 klären | PO-Team |

## 7 Gestaltung (CD Bund, Web)

- Schrift Noto Sans, BABS-Blau `#0095D6` als Akzent, Text `#324357`, Kacheln `#F0F4F7`/`#DCEFF9`, Rot nur Fristen/Go-Live.
- Icons linear, einfarbig, ohne Schatten (Oblique-Bibliothek).
- Matrix M2 mobil als Tabs, nicht als horizontal scrollende Tabelle.
- Barrierefreiheit: Tabellen mit `<th scope>`, Akkordeons mit `aria-expanded`, Kontrast AA.
