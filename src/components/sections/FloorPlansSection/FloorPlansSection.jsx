/* ============================================
   CoursesSection Component - Narayana IIT-JEE
   Showcases IIT-JEE programmes with cards grid
   and comparison table
   ============================================ */

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Container,
  Typography,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { coursesData } from "../../../data/coursesData";
import { useModal } from "../../../context/ModalContext";
import styles from "./FloorPlansSection.module.css";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

// Comparison data
const comparisonData = {
  headers: ["Feature", "2-Year (TYICP)", "Apex/Spark", "1-Year (OYICP)", "Repeater"],
  rows: [
    {
      label: "Duration",
      values: ["2 Years", "2 Years", "1 Year", "1 Year"],
    },
    {
      label: "Target",
      values: ["Class 11", "Class 11", "Class 11→12", "XII Passed"],
    },
    {
      label: "Board Coverage",
      values: ["Yes", "Yes", "Yes", "No"],
    },
    {
      label: "Frequency",
      values: ["3-4 days/week", "3-4 days/week", "3-4 days/week", "4-5 days/week"],
    },
  ],
};

const FloorPlansSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { openLeadDrawer } = useModal();

  const handleGetCourseDetails = (courseName) => {
    openLeadDrawer("get-course-details", {
      subtitle: `Get details for ${courseName}`,
    });
  };

  const renderCourseCard = (course, index) => (
    <motion.div
      key={course.id}
      className={styles.courseCard}
      custom={index}
      variants={isMobile ? undefined : cardVariants}
      initial={isMobile ? undefined : "hidden"}
      animate={isMobile ? undefined : isInView ? "visible" : "hidden"}
      whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(26, 35, 126, 0.15)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Badge */}
      {course.badge && (
        <div
          className={`${styles.courseBadge} ${
            course.badge === "Premium" ? styles.premiumBadge : ""
          }`}
        >
          <Icon
            icon={
              course.badge === "Most Popular"
                ? "mdi:star"
                : "mdi:diamond-stone"
            }
          />
          <span>{course.badge}</span>
        </div>
      )}

      {/* Icon */}
      <div className={styles.courseIconWrapper}>
        <Icon icon={course.icon} className={styles.courseIcon} />
      </div>

      {/* Course Name */}
      <Typography className={styles.courseName}>{course.name}</Typography>

      {/* Target & Duration */}
      <div className={styles.courseMeta}>
        <div className={styles.metaItem}>
          <Icon icon="mdi:account-school" />
          <span>{course.target}</span>
        </div>
        <div className={styles.metaItem}>
          <Icon icon="mdi:clock-outline" />
          <span>{course.duration}</span>
        </div>
      </div>

      {/* Description */}
      <Typography className={styles.courseDescription}>
        {course.description}
      </Typography>

      {/* Features */}
      <div className={styles.courseFeatures}>
        {course.features.map((feature, idx) => (
          <div key={idx} className={styles.courseFeatureItem}>
            <Icon icon="mdi:check-circle" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      {/* Frequency */}
      <div className={styles.courseFrequency}>
        <Icon icon="mdi:calendar-week" />
        <span>{course.frequency}</span>
      </div>

      {/* CTA Button */}
      <motion.button
        className={styles.courseCtaBtn}
        onClick={() => handleGetCourseDetails(course.name)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>Get Course Details</span>
        <Icon icon="mdi:arrow-right" />
      </motion.button>
    </motion.div>
  );

  return (
    <section className={styles.coursesSection} id="courses" ref={ref}>
      {/* Background */}
      <div className={styles.bgOverlay} />
      <div className={styles.bgPattern} />

      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className={styles.sectionHeader}>
            <Chip
              label="PROGRAMMES"
              sx={{
                backgroundColor: "rgba(255, 109, 0, 0.12)",
                color: "#FF6D00",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                height: "28px",
                borderRadius: "20px",
                border: "1px solid rgba(255, 109, 0, 0.3)",
              }}
            />
            <Typography
              variant="h2"
              className={styles.sectionTitle}
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.25rem" },
                color: "#1A237E",
                marginTop: "0.75rem",
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              Our IIT-JEE{" "}
              <span className={styles.accentText}>Programmes</span>
            </Typography>
            <Typography
              className={styles.sectionSubtitle}
              sx={{
                fontSize: { xs: "0.875rem", md: "1rem" },
                color: "#6B7280",
                textAlign: "center",
                marginTop: "0.5rem",
                maxWidth: "480px",
              }}
            >
              Choose the right programme for your IIT-JEE preparation
            </Typography>
          </motion.div>

          {/* Course Cards */}
          <motion.div variants={itemVariants}>
            {isMobile ? (
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={16}
                slidesPerView={1.15}
                centeredSlides
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: true }}
                className={styles.swiperContainer}
              >
                {coursesData.map((course, index) => (
                  <SwiperSlide key={course.id}>
                    {renderCourseCard(course, index)}
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className={styles.coursesGrid}>
                {coursesData.map((course, index) =>
                  renderCourseCard(course, index)
                )}
              </div>
            )}
          </motion.div>

          {/* Comparison Table */}
          <motion.div variants={itemVariants} className={styles.comparisonSection}>
            <Typography className={styles.comparisonTitle}>
              <Icon icon="mdi:compare-horizontal" />
              Quick Comparison
            </Typography>
            <div className={styles.comparisonTableWrapper}>
              <table className={styles.comparisonTable}>
                <thead>
                  <tr>
                    {comparisonData.headers.map((header, idx) => (
                      <th key={idx}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.rows.map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      <td className={styles.comparisonLabel}>{row.label}</td>
                      {row.values.map((value, valIdx) => (
                        <td key={valIdx}>
                          {value === "Yes" ? (
                            <span className={styles.comparisonYes}>
                              <Icon icon="mdi:check-circle" />
                              Yes
                            </span>
                          ) : value === "No" ? (
                            <span className={styles.comparisonNo}>
                              <Icon icon="mdi:close-circle" />
                              No
                            </span>
                          ) : (
                            value
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div variants={itemVariants} className={styles.bottomCta}>
            <div className={styles.ctaContent}>
              <Icon icon="mdi:headset" className={styles.ctaIcon} />
              <div className={styles.ctaText}>
                <span className={styles.ctaTitle}>
                  Not sure which programme to choose?
                </span>
                <span className={styles.ctaSubtitle}>
                  Our academic counsellors will help you pick the right programme
                </span>
              </div>
            </div>
            <motion.button
              className={styles.ctaBtn}
              onClick={() => openLeadDrawer("request-callback")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Talk to Academic Counsellor</span>
              <Icon icon="mdi:arrow-right" />
            </motion.button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default FloorPlansSection;
