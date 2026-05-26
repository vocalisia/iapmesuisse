---
title: "Sichere Verwaltung von Mobilgeräten in Schweizer KMU"
date: "2026-04-28"
excerpt: "Optimieren Sie die mobile Sicherheit in Schweizer KMU mit effektiven Cloud-Lösungen."
slug: "gestion-securisee-appareils-mobiles-pme-suisse"
author: "Laurent Duplat"
lang: "de"
category: "Cybersicherheit"
tags: ["Mobile Device Management", "KMU Schweiz", "nDSG", "Microsoft Intune", "Cybersicherheit"]
---

# Sichere Verwaltung von Mobilgeräten in Schweizer KMU

Smartphones, Tablets und Laptops ausserhalb des Büros sind für Schweizer KMU längst Arbeitsrealität. Laut einer Studie der Fachhochschule Nordwestschweiz aus dem Jahr 2025 nutzen 74 % der KMU-Mitarbeitenden mindestens ein mobiles Gerät für berufliche Zwecke — davon greifen 41 % regelmässig auf Unternehmensdaten über persönliche, nicht verwaltete Geräte zu. Genau diese unkontrollierten Zugriffspunkte sind für Cyberkriminelle die attraktivsten Angriffsflächen.

Das Bundesamt für Cybersicherheit (BACS) verzeichnete 2024 einen Anstieg von 34 % bei Cyberangriffen auf Schweizer KMU gegenüber dem Vorjahr. Für Unternehmen ohne dedizierten IT-Sicherheitsspezialisten ist Mobile Device Management (MDM) deshalb nicht mehr optional — es ist eine Compliance- und Überlebensfrage.

## Warum mobile Sicherheit für KMU besonders kritisch ist

Grosse Unternehmen verfügen über eigene IT-Abteilungen, 24/7-Sicherheitsmonitoring und dedizierte Security Operations Center. Schweizer KMU haben oft weder die Ressourcen noch das Fachwissen für solche Strukturen. Gleichzeitig verarbeiten sie täglich sensible Daten: Kundendossiers, Vertragsunterlagen, Finanzdaten, Personalakten.

Mobile Sicherheit ist dabei mehrdimensional — sie umfasst:
- Den **Schutz der Geräte** selbst (Verschlüsselung, Fernlöschung bei Verlust)
- Die **Kontrolle der Anwendungen** (welche Apps dürfen auf Unternehmensdaten zugreifen?)
- Die **Sicherung des Netzwerkzugriffs** (VPN, sichere WLAN-Verbindungen)
- Die **nDSG-konforme Datenverwaltung** (Aufbewahrung, Löschung, Zugriffsprotokolle)

Das neue **Schweizer Datenschutzgesetz (nDSG)**, in Kraft seit dem 1. September 2023, verschärft die Anforderungen erheblich. Datenpannen müssen dem EDÖB (Eidgenössischer Datenschutz- und Öffentlichkeitsbeauftragter) gemeldet werden, und Unternehmen können für ungenügende Schutzmasssnahmen haftbar gemacht werden.

## Cloud-basiertes MDM: Die richtige Antwort für KMU

Cloud-basierte Mobile Device Management-Lösungen sind für KMU der pragmatischste Weg: keine eigene Serverinfrastruktur, skalierbar je nach Teamgrösse, zentrale Verwaltung aller Geräte über eine Web-Oberfläche.

### Microsoft Intune: Der Standard für Microsoft-365-Umgebungen

**Microsoft Intune** ist die meistgenutzte MDM-Lösung in Schweizer KMU, die bereits Microsoft 365 verwenden. Die Plattform ermöglicht:

- **Geräteregistrierung und -inventar**: Vollständige Übersicht aller verwalteten Endgeräte, Betriebssystemversionen und Sicherheitsstatus in Echtzeit.
- **Richtlinienverwaltung**: Festlegung von Mindestanforderungen (PIN-Pflicht, Bildschirmsperre, Verschlüsselung) für alle Geräte — unabhängig davon, ob es sich um unternehmenseigene oder private Geräte handelt.
- **Selective Wipe**: Bei Verlust oder Diebstahl eines Geräts können ausschliesslich die Unternehmensdaten aus der Ferne gelöscht werden, während persönliche Daten erhalten bleiben — ein entscheidender Vorteil für BYOD-Szenarien (Bring Your Own Device).
- **App-Management**: Kontrolle darüber, welche Anwendungen auf Unternehmensdaten zugreifen dürfen, inklusive automatischer Verteilung autorisierter Apps auf alle verwalteten Geräte.

### Alternativen für nicht-Microsoft-Umgebungen

Für KMU, die nicht primär auf Microsoft setzen, bieten sich folgende Alternativen an:

**Jamf** ist die führende Lösung für Apple-Geräte (Mac, iPhone, iPad) und besonders in Kreativagenturen und Arztpraxen verbreitet. **VMware Workspace ONE** eignet sich für heterogene Umgebungen mit iOS, Android und Windows. **Google Workspace** mit den integrierten MDM-Funktionen ist der natürliche Einstiegspunkt für KMU in der Google-Cloud-Welt.

## Drei Schweizer KMU-Beispiele aus der Praxis

### Beispiel 1: Immobilienverwaltung, Genf (28 Mitarbeitende)

Eine Immobilienverwaltung mit Standorten in Genf und Lausanne verwaltete bislang die Geräte ihrer Aussendienstmitarbeitenden manuell: jede Sicherheitsaktualisierung musste einzeln eingespielt werden, und verlorene Geräte bedeuteten in der Vergangenheit echte Datenschutzrisiken. Nach der Einführung von Microsoft Intune (im Rahmen des bestehenden Microsoft 365 Business Premium-Abonnements ohne Mehrkosten für das MDM-Grundpaket) wurden alle 35 Mobilgeräte innerhalb von drei Tagen zentral registriert. Seitdem werden Sicherheits-Updates automatisch innerhalb von 24 Stunden nach Verfügbarkeit ausgerollt. Als ein Aussendienstmitarbeitender sein Telefon verlor, konnte der IT-Verantwortliche innerhalb von fünf Minuten die Unternehmensdaten aus der Ferne löschen — ohne dass persönliche Fotos oder Apps des Mitarbeitenden betroffen wurden.

### Beispiel 2: Arztpraxis, Zürich (6 Mitarbeitende)

Eine Gruppenpraxis in Zürich mit drei Ärzten und drei Assistentinnen hatte Patientendaten auf persönlichen iPhones der Ärzte gespeichert — eine klare Verletzung des nDSG und des Ärztegeheimnisses. Nach einer Beratung und der Einführung von Jamf Pro wurden alle dienstlich genutzten Apple-Geräte in einer Managed-Apple-ID-Umgebung registriert. Patientendaten sind seitdem ausschliesslich in einer verschlüsselten, DSGVO- und nDSG-konformen Praxis-App zugänglich. Der Setup dauerte zwei Arbeitstage — inklusive Schulung aller Mitarbeitenden.

### Beispiel 3: Bauunternehmen, St. Gallen (45 Mitarbeitende)

Ein mittelgrosses Bauunternehmen in der Ostschweiz setzt auf einem Mix aus Android-Tablets auf den Baustellen und Windows-Laptops im Büro. Google Workspace MDM verwaltet die Tablets, Microsoft Intune die Laptops. Über eine zentrale Richtlinie ist sichergestellt, dass alle Geräte automatisch gesperrt werden, sobald sie sich 30 Minuten in einem nicht autorisierten WLAN-Netzwerk befinden. Subunternehmer, die temporär auf bestimmte Projektpläne zugreifen müssen, erhalten zeitlich begrenzte Gastzugänge — ohne direkten Zugriff auf das Unternehmensnetz.

## Vier Schritte zu einer erfolgreichen MDM-Implementierung

**1. Bedarfsermittlung und Geräte-Inventar**: Starten Sie mit einer vollständigen Liste aller Geräte, die beruflich genutzt werden — inklusive privater Geräte mit Firmenzugang. Trennen Sie zwischen unternehmenseigenen Geräten (vollständige Verwaltung möglich) und BYOD-Geräten (teilweise Verwaltung über Container-Lösung).

**2. Richtlinien definieren vor der Implementierung**: Legen Sie schriftlich fest, welche Mindestanforderungen für alle Geräte gelten (Verschlüsselung, Bildschirmsperre, Update-Pflicht) und welche Anwendungen für berufliche Zwecke erlaubt oder verboten sind. Diese Richtlinien müssen kommuniziert und von den Mitarbeitenden akzeptiert werden, bevor das MDM-System eingeführt wird.

**3. Die richtige Lösung wählen**: Orientieren Sie sich an Ihrer bestehenden Infrastruktur. Microsoft 365 Business Premium enthält Intune bereits — für viele KMU der günstigste Einstieg. Prüfen Sie, ob Ihre bestehenden Abonnements MDM-Funktionen bereits beinhalten, bevor Sie neue Tools beschaffen.

**4. Schulen und überwachen**: Eine MDM-Einführung ohne Mitarbeiterschulung scheitert an mangelnder Akzeptanz. Investieren Sie in eine kurze, praxisorientierte Einführung (45 bis 90 Minuten) und richten Sie automatisierte Alerts ein, die Sie bei Sicherheitsabweichungen informieren — z. B. wenn ein Gerät seit 30 Tagen kein Update erhalten hat.

## KI und MDM: Die nächste Entwicklungsstufe

Moderne MDM-Plattformen integrieren zunehmend KI-Funktionen. Microsoft Intune nutzt Machine Learning, um ungewöhnliche Zugriffsmuster zu erkennen und potenzielle Bedrohungen automatisch zu isolieren. Ein Gerät, das plötzlich auf ungewohnte Server zugreift oder aussergewöhnlich grosse Datenmengen überträgt, wird automatisch in Quarantäne gesetzt — ohne manuellen Eingriff.

Diese Integration von KI und Sicherheit ist ein direktes Ergebnis der milliardenschweren Investitionen der Tech-Konzerne — und ein weiterer Grund, warum Schweizer KMU heute Zugang zu Sicherheitsniveau haben, das vor fünf Jahren grossen Unternehmen vorbehalten war. Für die strategische Perspektive empfehlen wir unseren Artikel zu [KI-Investitionen und Chancen für Schweizer KMU](/de/blog/investissements-ia-opportunites-pme-suisses).

---

## FAQ: Sichere Mobilgeräte-Verwaltung für Schweizer KMU

**Müssen wir für MDM ein neues Abonnement kaufen, oder ist es in bestehenden Paketen enthalten?**

Microsoft 365 Business Premium (das beliebteste Paket für KMU) enthält Microsoft Intune bereits ohne Aufpreis. Wenn Ihr KMU dieses Abonnement bereits nutzt, haben Sie das Recht, sofort mit MDM zu beginnen — ohne zusätzliche Lizenzkosten. Prüfen Sie Ihre bestehenden Microsoft-Lizenzen, bevor Sie ein neues Tool evaluieren. Gleiches gilt für Google Workspace Business Plus und höhere Pläne, die grundlegende MDM-Funktionen einschliessen.

**Dürfen wir als Arbeitgeber private Smartphones von Mitarbeitenden verwalten?**

Ja, aber nur mit ausdrücklicher Einwilligung der Mitarbeitenden. In einem BYOD-Szenario muss die MDM-Richtlinie klar zwischen privaten und beruflichen Daten trennen. Moderne MDM-Lösungen ermöglichen dies über sogenannte Container: Das Unternehmen verwaltet ausschliesslich den beruflichen Container (E-Mails, Firmendaten, Apps), während private Inhalte vollständig unangetastet bleiben. Diese Trennung muss schriftlich dokumentiert und von den Mitarbeitenden akzeptiert werden.

**Was ist zu tun, wenn ein Mitarbeitender das Unternehmen verlässt?**

Mit einem aktiven MDM-System ist der Offboarding-Prozess für Mobilgeräte auf wenige Klicks reduziert: Der Administrator löscht den beruflichen Container (oder bei unternehmenseigenen Geräten das gesamte Gerät) aus der Ferne, widerruft alle Zugriffsberechtigungen und entfernt das Gerät aus dem Inventar. Ohne MDM bedeutet ein Mitarbeiteraustritt oft, dass Unternehmensdaten auf privaten Geräten dauerhaft zugänglich bleiben — ein erhebliches Datenschutz- und Sicherheitsrisiko.

---

**Ist Ihre mobile Infrastruktur wirklich sicher?** Buchen Sie ein [kostenloses 30-Minuten-Beratungsgespräch](/contact) — wir führen einen schnellen Sicherheits-Check durch und zeigen Ihnen, welche Massnahmen für Ihr KMU am dringendsten sind.
