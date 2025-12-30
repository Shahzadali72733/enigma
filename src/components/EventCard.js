'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './EventCard.module.css';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function EventCard({ event }) {
  const { t, isArabic } = useLanguage();

  return (
    <motion.div
      className={styles.eventCard}
      variants={cardVariants}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className={styles.eventImageWrapper}>
        <img
          src={event.image}
          alt={isArabic ? event.titleAr : event.titleEn}
          className={styles.eventImage}
        />
        <div className={styles.eventOverlay}>
          <h3 className={styles.eventTitle}>
            {isArabic ? event.titleAr : event.titleEn}
          </h3>
        </div>
      </div>
      <div className={styles.eventContent}>
        <p className={styles.eventDescription}>
          {isArabic ? event.descriptionAr : event.descriptionEn}
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/contact" className="btn btn-outline-gold">
            {t('bookNow')}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

