import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { PLAN_ZAOCZNE } from '../../data/schedule';
import styles from './plan-zajec.module.css';

const TYP_CONFIG = {
  wyklad:     { label: 'Wykład',       cls: styles.badgeWyklad },
  lab:        { label: 'Ćwiczenia', cls: styles.badgeLab },
  projekt:    { label: 'Projekt',      cls: styles.badgeProjekt },
};

export default function PlanZajec(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const base = siteConfig.baseUrl.replace(/\/$/, '');
  return (
    <Layout
      title="Plan zajęć"
      description="Harmonogram semestru — tematy wykładów i laboratoriów, ważne daty."
    >
      <main className={styles.page}>
        <div className="container">
          <div className={styles.header}>
            <Heading as="h1">📅 Plan zajęć</Heading>
            <p className={styles.subtitle}>
              Harmonogram semestru letniego 2025/2026 — Python w Zastosowaniach Big Data.
              <br />
              <strong>Studia zaoczne</strong> — 8 niedzielnych zjazdów. Każdy zjazd zawiera wykład i ćwiczenia.
              <br />
              Podane daty są orientacyjne i mogą ulec zmianie — sprawdzaj tę stronę regularnie!
            </p>
            <div className={styles.legend}>
              <span className={`${styles.badge} ${styles.badgeWyklad}`}>Wykład</span>
              <span className={`${styles.badge} ${styles.badgeLab}`}>Laboratorium</span>
              <span className={`${styles.badge} ${styles.badgeProjekt}`}>Projekt</span>
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Zjazd</th>
                  <th>Data</th>
                  <th>Wykład</th>
                  <th>Materiały</th>
                  <th>Ćwiczenia</th>
                  <th>Materiały</th>
                  <th>Zadanie domowe</th>
                </tr>
              </thead>
              <tbody>
                {PLAN_ZAOCZNE.map(({ zjazd, data, wyklad, wykladMaterialy, wykladHref, lab, labMaterialy, labHref, zadanieDomowe, zadanieHref }) => (
                  <tr key={zjazd} className={zjazd === 8 ? styles.rowWolne : undefined}>
                    <td className={styles.tdNum}>{zjazd}</td>
                    <td className={styles.tdData}>{data}</td>
                    <td>
                      <span className={`${styles.badge} ${zjazd === 8 ? styles.badgeProjekt : styles.badgeWyklad}`}>
                        {zjazd === 8 ? 'Projekt' : 'Wykład'}
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
                      <span className={`${styles.badge} ${zjazd === 8 ? styles.badgeProjekt : styles.badgeLab}`}>
                        {zjazd === 8 ? 'Projekt' : 'Lab'}
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
        </div>
      </main>
    </Layout>
  );
}
