import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { PLAN_STACJONARNE } from '../../data/schedule';
import styles from '../zaoczne/plan-zajec.module.css';

export default function StacjonarnePlanZajec(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const base = siteConfig.baseUrl.replace(/\/$/, '');
  const last = PLAN_STACJONARNE.length;
  const testZjazd = last - 1;
  return (
    <Layout
      title="Plan zajęć — Studia stacjonarne"
      description="Harmonogram semestru zimowego 2026/2027 — tematy wykładów i ćwiczeń, ważne daty (Studia stacjonarne)."
    >
      <main className={styles.page}>
        <div className="container">
          <div className={styles.header}>
            <Heading as="h1">📅 Plan zajęć — Studia stacjonarne</Heading>
            <p className={styles.subtitle}>
              Harmonogram semestru zimowego 2026/2027 — Python w Zastosowaniach Big Data.
              <br />
              <strong>Studia stacjonarne</strong> — 10 cotygodniowych zajęć we <strong>wtorki</strong> (10 wykładów i 10 ćwiczeń), każde obejmujące wykład i ćwiczenia.
              Zajęcia nr 11 to <strong>test teoretyczny</strong> (70% oceny, 30 pytań zamkniętych ABCD), a zajęcia nr 12 to <strong>obrona projektu</strong> (30% oceny) —
              aktywność na zajęciach daje dodatkowe +10% ponad 100%. Semestr kończy się w całości przed przerwą świąteczno-noworoczną.
              <br />
              Podane daty są orientacyjne i mogą ulec zmianie — sprawdzaj tę stronę regularnie!
            </p>
            <div className={styles.legend}>
              <span className={`${styles.badge} ${styles.badgeWyklad}`}>Wykład</span>
              <span className={`${styles.badge} ${styles.badgeLab}`}>Ćwiczenia</span>
              <span className={`${styles.badge} ${styles.badgeEgzamin}`}>Test</span>
              <span className={`${styles.badge} ${styles.badgeProjekt}`}>Projekt</span>
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nr</th>
                  <th>Data</th>
                  <th>Wykład</th>
                  <th>Materiały</th>
                  <th>Ćwiczenia</th>
                  <th>Materiały</th>
                  <th>Zadanie domowe</th>
                </tr>
              </thead>
              <tbody>
                {PLAN_STACJONARNE.map(({ zjazd, data, wyklad, wykladMaterialy, wykladHref, lab, labMaterialy, labHref, zadanieDomowe, zadanieHref }) => (
                  <tr key={zjazd} className={zjazd === last || zjazd === testZjazd ? styles.rowWolne : undefined}>
                    <td className={styles.tdNum}>{zjazd}</td>
                    <td className={styles.tdData}>{data}</td>
                    <td>
                      <span className={`${styles.badge} ${zjazd === testZjazd ? styles.badgeEgzamin : styles.badgeWyklad}`}>
                        {zjazd === testZjazd ? 'Test' : zjazd === last ? 'Podsumowanie' : 'Wykład'}
                      </span>{' '}
                      {wyklad}
                    </td>
                    <td>
                      {wykladMaterialy && wykladHref ? (
                        <Link to={wykladHref}>{wykladMaterialy}</Link>
                      ) : (
                        <span className={styles.soon}>—</span>
                      )}
                    </td>
                    <td>
                      <span className={`${styles.badge} ${zjazd === last ? styles.badgeProjekt : styles.badgeLab}`}>
                        {zjazd === last ? 'Projekt' : 'Ćwiczenia'}
                      </span>{' '}
                      {lab}
                    </td>
                    <td>
                      {labMaterialy && labHref ? (
                        <Link to={labHref}>{labMaterialy}</Link>
                      ) : (
                        <span className={styles.soon}>—</span>
                      )}
                    </td>
                    <td>
                      {zadanieDomowe && zadanieHref ? (
                        <a href={`${base}${zadanieHref}`} download>
                          📝 {zadanieDomowe}
                        </a>
                      ) : (
                        <span className={styles.soon}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className={styles.subtitle} style={{ marginTop: '1.5rem' }}>
            🎄 <strong>Koniec semestru przed przerwą świąteczno-noworoczną:</strong> test teoretyczny odbywa się 15.12.2026, a obrona projektu
            22.12.2026 — żadne zajęcia nie wypadają już w okresie przerwy świątecznej.
            Szczegóły projektu zaliczeniowego znajdziesz na stronie{' '}
            <Link to="/stacjonarne/materialy/projekt-zaliczeniowy">Projekt zaliczeniowy</Link>, a przewodnik do testu teoretycznego na stronie{' '}
            <Link to="/stacjonarne/materialy/egzamin">Egzamin teoretyczny</Link>.
          </p>
        </div>
      </main>
    </Layout>
  );
}

