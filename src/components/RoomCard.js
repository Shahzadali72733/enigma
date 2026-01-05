'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './RoomCard.module.css';
import Image from 'next/image';

const cardVariants = {
  hidden: { 
    opacity: 0, 
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function RoomCard({ room, showDetails = true, index = 0 }) {
  const { t, isArabic } = useLanguage();

  const genreLabels = {
    horror: { en: 'Horror', ar: 'رعب' },
    adventure: { en: 'Adventure', ar: 'مغامرة' },
    mystery: { en: 'Mystery', ar: 'غموض' },
  };

  return (
    <motion.div
      className={styles.roomCard}
      variants={cardVariants}
      style={{ '--room-color': room.color }}
    >
      <div className={styles.roomImageWrapper}>
        <img
          src={room.image}
          alt={isArabic ? room.nameAr : room.nameEn}
          className={styles.roomImage}
        />
        <div className={styles.roomOverlay}>
          {/* Top: English title and Book Now button */}
          <div className={styles.roomHeader}>
            <div className={styles.roomTitles}>
              <h3 className={styles.roomName}>
                {room.nameEn}
              </h3>
              {room.subtitleEn && (
                <span className={styles.roomSubtitle}>{room.subtitleEn}</span>
              )}
            </div>
            <a 
              href={room.bookingUrl || 'https://bookeo.com/enigmaescapesa'} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.roomBookBtn}
            >
              {t('bookNow')}
            </a>
          </div>
          
          {/* Bottom: Arabic title */}
          <div className={styles.roomArabicSection}>
            <p className={styles.roomNameAr}>
              {room.nameAr}
            </p>
          </div>
        </div>

        {showDetails && (
          <div className={styles.roomDetails}>
            <div className={styles.roomInfo}>
              <span>
                <i className="bi bi-people-fill"></i> {room.players}{' '}
                {isArabic ? 'لاعبين' : 'Players'}
              </span>
              <span>
                <i className="bi bi-clock-fill"></i> {room.duration}{' '}
                {isArabic ? 'دقيقة' : 'Min'}
              </span>
              {room.hasLivePerformers && (
                <span>
                  <i className="bi bi-person-badge-fill"></i>{' '}
                  {isArabic ? 'ممثلين حقيقيين' : 'Live Performers'}
                </span>
              )}
              {room.genre && (
                <span>
                  <i className="bi bi-tag-fill"></i>{' '}
                  {isArabic
                    ? genreLabels[room.genre]?.ar
                    : genreLabels[room.genre]?.en}
                </span>
              )}
            </div>
            {room.difficulty && (
              <div className={styles.difficulty}>
                <span>{isArabic ? 'الصعوبة' : 'Difficulty'}</span>
                <div className={styles.difficultyStars}>
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`bi ${
                        i < room.difficulty ? 'bi-star-fill' : 'bi-star'
                      }`}
                    ></i>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

